type StateCount = [number, number, number, number, number]

const MIN_SKIP = 3
const MAX_MODULES = 57
const INTEGER_MATH_SHIFT = 8
const CENTER_QUORUM = 2

const orderBestPatterns = (patterns: FinderPattern[]) => {
  function distance(pattern1: FinderPattern,  pattern2: FinderPattern) {
    const xDiff = pattern1.X - pattern2.X
    const yDiff = pattern1.Y - pattern2.Y
    return  Math.sqrt( (xDiff * xDiff + yDiff * yDiff))
  }

  /// <summary> Returns the z component of the cross product between vectors BC and BA.</summary>
  function crossProductZ(pointA: FinderPattern, pointB: FinderPattern, pointC: FinderPattern) {
    const bX = pointB.x
    const bY = pointB.y
    return ((pointC.x - bX) * (pointA.y - bY)) - ((pointC.y - bY) * (pointA.x - bX))
  }


  // Find distances between pattern centers
  const zeroOneDistance = distance(patterns[0], patterns[1])
  const oneTwoDistance = distance(patterns[1], patterns[2])
  const zeroTwoDistance = distance(patterns[0], patterns[2])

  let pointA, pointB, pointC
  // Assume one closest to other two is B; A and C will just be guesses at first
  if (oneTwoDistance >= zeroOneDistance && oneTwoDistance >= zeroTwoDistance) {
    pointB = patterns[0]
    pointA = patterns[1]
    pointC = patterns[2]
  } else if (zeroTwoDistance >= oneTwoDistance && zeroTwoDistance >= zeroOneDistance) {
    pointB = patterns[1]
    pointA = patterns[0]
    pointC = patterns[2]
  } else {
    pointB = patterns[2]
    pointA = patterns[0]
    pointC = patterns[1]
  }

  // Use cross product to figure out whether A and C are correct or flipped.
  // This asks whether BC x BA has a positive z component, which is the arrangement
  // we want for A, B, C. If it's negative, then we've got it flipped around and
  // should swap A and C.
  if (crossProductZ(pointA, pointB, pointC) < 0.0) {
    const temp = pointA
    pointA = pointC
    pointC = temp
  }

  patterns[0] = pointA
  patterns[1] = pointB
  patterns[2] = pointC
}

export class FinderPattern {
  x: number
  y: number
  count: number
  estimatedModuleSize: number

  constructor(posX: number, posY: number, estimatedModuleSize: number) {
    this.x=posX
    this.y=posY
    this.count = 1
    this.estimatedModuleSize = estimatedModuleSize;
  }

  get EstimatedModuleSize() {
    return this.estimatedModuleSize
  }

  get Count() {
    return this.count
  }

  get X() {
    return this.x
  }

  get Y() {
    return this.y
  }

  incrementCount() {
    this.count++
  }

  aboutEquals(moduleSize: number, i: number, j: number) {
    if (Math.abs(i - this.y) <= moduleSize && Math.abs(j - this.x) <= moduleSize) {
      const moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize)
      return moduleSizeDiff <= 1.0 || moduleSizeDiff / this.estimatedModuleSize <= 1.0
    }
    return false
  }
}

export class FinderPatternInfo {
  bottomLeft: FinderPattern
  topLeft: FinderPattern
  topRight: FinderPattern

  constructor(patternCenters: FinderPattern[]) {
    this.bottomLeft = patternCenters[0]
    this.topLeft = patternCenters[1]
    this.topRight = patternCenters[2]
  }

  get BottomLeft() {
    return this.bottomLeft
  }

  get TopLeft() {
    return this.topLeft
  }

  get TopRight() {
    return this.topRight
  }
}

export class FinderPatternFinder {
  image: Uint8Array
  width: number
  height: number
  possibleCenters: FinderPattern[] = []
  hasSkipped = false
  crossCheckStateCount: StateCount = [0, 0, 0, 0, 0]
  resultPointCallback?: null | { foundPossibleResultPoint: Function }

  constructor(width: number, height: number, image: Uint8Array) {
    this.width = width
    this.height = height
    this.image = image
  }

  get CrossCheckStateCount() {
    this.crossCheckStateCount[0] = 0
    this.crossCheckStateCount[1] = 0
    this.crossCheckStateCount[2] = 0
    this.crossCheckStateCount[3] = 0
    this.crossCheckStateCount[4] = 0
    return this.crossCheckStateCount
  }

  foundPatternCross(stateCount: StateCount) {
    let totalModuleSize = 0
    for (let i = 0; i < 5; i++) {
      const count = stateCount[i]
      if (count == 0) {
        return false
      }
      totalModuleSize += count
    }

    if (totalModuleSize < 7) {
      return false
    }

    const moduleSize = Math.floor((totalModuleSize << INTEGER_MATH_SHIFT) / 7)
    const maxVariance = Math.floor(moduleSize / 2)

    return Math.abs(moduleSize - (stateCount[0] << INTEGER_MATH_SHIFT)) < maxVariance &&
      Math.abs(moduleSize - (stateCount[1] << INTEGER_MATH_SHIFT)) < maxVariance &&
      Math.abs(3 * moduleSize - (stateCount[2] << INTEGER_MATH_SHIFT)) < 3 * maxVariance &&
      Math.abs(moduleSize - (stateCount[3] << INTEGER_MATH_SHIFT)) < maxVariance &&
      Math.abs(moduleSize - (stateCount[4] << INTEGER_MATH_SHIFT)) < maxVariance
  }

  centerFromEnd(stateCount: StateCount, end: number) {
    return (end - stateCount[4] - stateCount[3]) - stateCount[2] / 2.0
  }

  crossCheckVertical(startI: number, centerJ: number, maxCount: number, originalStateCountTotal: number) {
    const maxI = this.height
    const stateCount = this.CrossCheckStateCount;

    // Start counting up from center
    let i = startI
    while (i >= 0 && this.image[centerJ + i * this.width]) {
      stateCount[2]++
      i--
    }

    if (i < 0) {
      return NaN
    }

    while (i >= 0 && !this.image[centerJ + i * this.width] && stateCount[1] <= maxCount) {
      stateCount[1]++
      i--
    }

    // If already too many modules in this state or ran off the edge:
    if (i < 0 || stateCount[1] > maxCount) {
      return NaN
    }

    while (i >= 0 && this.image[centerJ + i * this.width] && stateCount[0] <= maxCount) {
      stateCount[0]++
      i--
    }

    if (stateCount[0] > maxCount) {
      return NaN
    }

    // Now also count down from center
    i = startI + 1
    while (i < maxI && this.image[centerJ + i * this.width]) {
      stateCount[2]++
      i++
    }

    if (i == maxI) {
      return NaN
    }

    while (i < maxI && !this.image[centerJ + i * this.width] && stateCount[3] < maxCount) {
      stateCount[3]++
      i++
    }

    if (i == maxI || stateCount[3] >= maxCount) {
      return NaN
    }

    while (i < maxI && this.image[centerJ + i * this.width] && stateCount[4] < maxCount) {
      stateCount[4]++
      i++
    }

    if (stateCount[4] >= maxCount) {
      return NaN
    }

    // If we found a finder-pattern-like section, but its size is more than 40% different than
    // the original, assume it's a false positive
    const stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4]
    if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
      return NaN
    }

    return this.foundPatternCross(stateCount) ? this.centerFromEnd(stateCount, i) : NaN
  }

  crossCheckHorizontal(startJ: number,  centerI: number, maxCount: number, originalStateCountTotal: number) {
    const maxJ = this.width
    const stateCount = this.CrossCheckStateCount

    let j = startJ
    while (j >= 0 && this.image[j + centerI * this.width]) {
      stateCount[2]++
      j--
    }

    if (j < 0) {
      return NaN
    }

    while(j >= 0 && !this.image[j + centerI * this.width] && stateCount[1] <= maxCount) {
      stateCount[1]++
      j--
    }

    if (j < 0 || stateCount[1] > maxCount) {
      return NaN
    }

    while (j >= 0 && this.image[j + centerI * this.width] && stateCount[0] <= maxCount) {
      stateCount[0]++
      j--
    }

    if (stateCount[0] > maxCount) {
      return NaN
    }

    j = startJ + 1
    while (j < maxJ && this.image[j + centerI * this.width]) {
      stateCount[2]++
      j++
    }

    if (j == maxJ) {
      return NaN
    }

    while (j < maxJ && !this.image[j + centerI * this.width] && stateCount[3] < maxCount) {
      stateCount[3]++
      j++
    }

    if (j == maxJ || stateCount[3] >= maxCount) {
      return NaN
    }

    while (j < maxJ && this.image[j+ centerI*this.width] && stateCount[4] < maxCount) {
      stateCount[4]++
      j++
    }

    if (stateCount[4] >= maxCount) {
      return NaN
    }

    // If we found a finder-pattern-like section, but its size is significantly different than
    // the original, assume it's a false positive
    const stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4]
    if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= originalStateCountTotal) {
      return NaN
    }

    return this.foundPatternCross(stateCount) ? this.centerFromEnd(stateCount, j) : NaN
  }

  handlePossibleCenter(stateCount: StateCount, i: number, j: number) {
    const stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4]
    let centerJ = this.centerFromEnd(stateCount, j) //float
    const centerI = this.crossCheckVertical(i, Math.floor( centerJ), stateCount[2], stateCountTotal) //float

    if (!isNaN(centerI)) {
      // Re-cross check
      centerJ = this.crossCheckHorizontal(Math.floor( centerJ), Math.floor( centerI), stateCount[2], stateCountTotal)
      if (!isNaN(centerJ)) {
        const estimatedModuleSize =   stateCountTotal / 7.0
        let found = false
        const max = this.possibleCenters.length

        for (let index = 0; index < max; index++) {
          const center = this.possibleCenters[index]
          // Look for about the same center and module size:
          if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
            center.incrementCount()
            found = true
            break
          }
        }

        if (!found) {
          const point = new FinderPattern(centerJ, centerI, estimatedModuleSize)
          this.possibleCenters.push(point)
          this.resultPointCallback && this.resultPointCallback.foundPossibleResultPoint && this.resultPointCallback.foundPossibleResultPoint(point)
        }
        return true
      }
    }

    return false
  }

  selectBestPatterns() {
    const startSize = this.possibleCenters.length
    if (startSize < 3) {
      // Couldn't find enough finder patterns
      throw "Couldn't find enough finder patterns (found " + startSize + ")"
    }

    // Filter outlier possibilities whose module size is too different
    if (startSize > 3) {
      // But we can only afford to do so if we have at least 4 possibilities to choose from
      let totalModuleSize = 0.0
      let square = 0.0

      for (let i = 0; i < startSize; i++) {
        const centerValue = this.possibleCenters[i].EstimatedModuleSize
        totalModuleSize += centerValue
        square += (centerValue * centerValue)
      }

      const average = totalModuleSize /  startSize
      this.possibleCenters.sort((center1,center2) => {
        const dA = Math.abs(center2.EstimatedModuleSize - average)
        const dB = Math.abs(center1.EstimatedModuleSize - average)
        return dA < dB ? -1 : (dA == dB ? 0 : 1)
      })

      const stdDev = Math.sqrt(square / startSize - average * average)
      const limit = Math.max(0.2 * average, stdDev)
      for (let i = this.possibleCenters.length - 1; i >= 0; i--) {
        const pattern = this.possibleCenters[i]
        if (Math.abs(pattern.EstimatedModuleSize - average) > limit) {
          this.possibleCenters.splice(i,1)
        }
      }
    }

    // Throw away all but those first size candidate points we found.
    this.possibleCenters.length > 3 && this.possibleCenters.sort((a, b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0)

    return [this.possibleCenters[0], this.possibleCenters[1], this.possibleCenters[2]]
  }

  findRowSkip() {
    const max = this.possibleCenters.length
    if (max <= 1) {
      return 0
    }

    let firstConfirmedCenter = null
    for (let i = 0; i < max; i++) {
      const center =  this.possibleCenters[i]
      if (center.Count >= CENTER_QUORUM) {
        if (firstConfirmedCenter == null) {
          firstConfirmedCenter = center
        } else {
          // We have two confirmed centers
          // How far down can we skip before resuming looking for the next
          // pattern? In the worst case, only the difference between the
          // difference in the x / y coordinates of the two centers.
          // This is the case where you find top left last.
          this.hasSkipped = true
          return Math.floor ((Math.abs(firstConfirmedCenter.X - center.X) - Math.abs(firstConfirmedCenter.Y - center.Y)) / 2)
        }
      }
    }
    return 0
  }

  haveMultiplyConfirmedCenters() {
    let confirmedCount = 0
    let totalModuleSize = 0.0
    const max = this.possibleCenters.length

    for (let i = 0; i < max; i++) {
      const pattern =  this.possibleCenters[i]
      if (pattern.Count >= CENTER_QUORUM) {
        confirmedCount++
        totalModuleSize += pattern.EstimatedModuleSize
      }
    }

    if (confirmedCount < 3) {
      return false
    }

    // OK, we have at least 3 confirmed centers, but, it's possible that one is a "false positive"
    // and that we need to keep looking. We detect this by asking if the estimated module sizes
    // consty too much. We arbitrarily say that when the total deviation from average exceeds
    // 5% of the total module size estimates, it's too much.
    const average = totalModuleSize / max
    let totalDeviation = 0.0
    for (let i = 0; i < max; i++) {
      const pattern = this.possibleCenters[i]
      totalDeviation += Math.abs(pattern.EstimatedModuleSize - average)
    }

    return totalDeviation <= 0.05 * totalModuleSize
  }

  findFinderPattern() {
    const tryHarder = false
    const maxI = this.height
    const maxJ = this.width
    let iSkip = Math.floor((3 * maxI) / (4 * MAX_MODULES))

    if (iSkip < MIN_SKIP || tryHarder) {
        iSkip = MIN_SKIP
    }

    let done = false
    const stateCount: StateCount = [0, 0, 0, 0, 0]
    for (let i = iSkip - 1; i < maxI && !done; i += iSkip) {
      // Get a row of black/white values
      stateCount[0] = 0
      stateCount[1] = 0
      stateCount[2] = 0
      stateCount[3] = 0
      stateCount[4] = 0
      let currentState = 0
      for (let j = 0; j < maxJ; j++) {
        if (this.image[j + i * this.width]) {
          // Black pixel
          if ((currentState & 1) == 1) {
            // Counting white pixels
            currentState++
          }
          stateCount[currentState]++
        } else {
          // White pixel
          if ((currentState & 1) == 0) {
            // Counting black pixels
            if (currentState == 4) {
              // A winner?
              if (this.foundPatternCross(stateCount)) {
                // Yes
                const confirmed = this.handlePossibleCenter(stateCount, i, j)
                if (confirmed) {
                  // Start examining every other line. Checking each line turned out to be too
                  // expensive and didn't improve performance.
                  iSkip = 2
                  if (this.hasSkipped) {
                    done = this.haveMultiplyConfirmedCenters();
                  } else {
                    const rowSkip = this.findRowSkip()
                  if (rowSkip > stateCount[2]) {
                      // Skip rows between row of lower confirmed center
                      // and top of presumed third confirmed center
                      // but back up a bit to get a full chance of detecting
                      // it, entire width of center of finder pattern

                      // Skip by rowSkip, but back off by stateCount[2] (size of last center
                      // of pattern we saw) to be conservative, and also back off by iSkip which
                      // is about to be re-added
                      i += rowSkip - stateCount[2] - iSkip
                      j = maxJ - 1
                    }
                  }
                } else {
                  // Advance to next black pixel
                  do {
                    j++
                  } while (j < maxJ && !this.image[j + i * this.width])

                  j-- // back up to that last white pixel
                }
                // Clear state to start looking again
                currentState = 0
                stateCount[0] = 0
                stateCount[1] = 0
                stateCount[2] = 0
                stateCount[3] = 0
                stateCount[4] = 0
              } else {
                // No, shift counts back by two
                stateCount[0] = stateCount[2]
                stateCount[1] = stateCount[3]
                stateCount[2] = stateCount[4]
                stateCount[3] = 1
                stateCount[4] = 0
                currentState = 3
              }
            } else {
              stateCount[++currentState]++
            }
          } else {
            // Counting white pixels
            stateCount[currentState]++
          }
        }
      }
      if (this.foundPatternCross(stateCount)) {
        const confirmed = this.handlePossibleCenter(stateCount, i, maxJ)
        if (confirmed) {
          iSkip = stateCount[0]
          if (this.hasSkipped) {
            // Found a third one
            done = this.haveMultiplyConfirmedCenters()
          }
        }
      }
    }

    const patternInfo = this.selectBestPatterns()
    orderBestPatterns(patternInfo)

    return new FinderPatternInfo(patternInfo)
  }
}