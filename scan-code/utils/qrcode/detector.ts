/**
 * Ported to TypeScript by Lin09 2022
 * www.linzhenhui.cn
 */

/**
 * Ported to JavaScript by Lazar Laszlo 2011
 * lazarsoft@gmail.com, www.lazarsoft.info
 */

/*
 *Copyright 2007 ZXing authors
 *
 *Licensed under the Apache License, Version 2.0 (the "License")
 *you may not use this file except in compliance with the License.
 *You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *Unless required by applicable law or agreed to in writing, software
 *distributed under the License is distributed on an "AS IS" BASIS,
 *WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *See the License for the specific language governing permissions and
 *limitations under the License.
 */

import { FinderPatternFinder, FinderPatternInfo, FinderPattern } from './findpat'
import { AlignmentPatternFinder } from './alignpat'
import { sampleGrid3 } from './grid'

export function quadrilateralToQuadrilateral(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x0p: number, y0p: number, x1p: number, y1p: number, x2p: number, y2p: number, x3p: number, y3p: number) {
  const qToS = quadrilateralToSquare(x0, y0, x1, y1, x2, y2, x3, y3)
  const sToQ = squareToQuadrilateral(x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p)
  return sToQ.times(qToS)
}

function squareToQuadrilateral(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
  const dy2 = y3 - y2
  const dy3 = y0 - y1 + y2 - y3
  if (dy2 == 0.0 && dy3 == 0.0) {
    return new PerspectiveTransform(x1 - x0, x2 - x1, x0, y1 - y0, y2 - y1, y0, 0.0, 0.0, 1.0)
  } else {
    const dx1 = x1 - x2
    const dx2 = x3 - x2
    const dx3 = x0 - x1 + x2 - x3
    const dy1 = y1 - y2
    const denominator = dx1 * dy2 - dx2 * dy1
    const a13 = (dx3 * dy2 - dx2 * dy3) / denominator
    const a23 = (dx1 * dy3 - dx3 * dy1) / denominator
    return new PerspectiveTransform(x1 - x0 + a13 * x1, x3 - x0 + a23 * x3, x0, y1 - y0 + a13 * y1, y3 - y0 + a23 * y3, y0, a13, a23, 1.0)
  }
}

function quadrilateralToSquare(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
  // Here, the adjoint serves as the inverse:
  return squareToQuadrilateral(x0, y0, x1, y1, x2, y2, x3, y3).buildAdjoint()
}

export class PerspectiveTransform {
  a11
  a12
  a13
  a21
  a22
  a23
  a31
  a32
  a33

  quadrilateralToQuadrilateral = quadrilateralToQuadrilateral
  squareToQuadrilateral = squareToQuadrilateral
  quadrilateralToSquare = quadrilateralToSquare

  constructor(a11: number, a21: number, a31: number, a12: number, a22: number, a32: number, a13: number, a23: number, a33: number) {
    this.a11 = a11
    this.a12 = a12
    this.a13 = a13
    this.a21 = a21
    this.a22 = a22
    this.a23 = a23
    this.a31 = a31
    this.a32 = a32
    this.a33 = a33
  }

  transformPoints1(points: number[]) {
    const max = points.length
    const a11 = this.a11
    const a12 = this.a12
    const a13 = this.a13
    const a21 = this.a21
    const a22 = this.a22
    const a23 = this.a23
    const a31 = this.a31
    const a32 = this.a32
    const a33 = this.a33

    for (let i = 0; i < max; i += 2) {
      const x = points[i]
      const y = points[i + 1]
      const denominator = a13 * x + a23 * y + a33
      points[i] = (a11 * x + a21 * y + a31) / denominator
      points[i + 1] = (a12 * x + a22 * y + a32) / denominator
    }
  }

  transformPoints2(xValues: number[], yValues: number[]) {
    const n = xValues.length
    for (var i = 0; i < n; i++)
    {
      const x = xValues[i]
      const y = yValues[i]
      const denominator = this.a13 * x + this.a23 * y + this.a33
      xValues[i] = (this.a11 * x + this.a21 * y + this.a31) / denominator
      yValues[i] = (this.a12 * x + this.a22 * y + this.a32) / denominator
    }
  }

  buildAdjoint() {
    // Adjoint is the transpose of the cofactor matrix:
    return new PerspectiveTransform(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21)
  }

  times(other: PerspectiveTransform) {
    return new PerspectiveTransform(this.a11 * other.a11 + this.a21 * other.a12 + this.a31 * other.a13, this.a11 * other.a21 + this.a21 * other.a22 + this.a31 * other.a23, this.a11 * other.a31 + this.a21 * other.a32 + this.a31 * other.a33, this.a12 * other.a11 + this.a22 * other.a12 + this.a32 * other.a13, this.a12 * other.a21 + this.a22 * other.a22 + this.a32 * other.a23, this.a12 * other.a31 + this.a22 * other.a32 + this.a32 * other.a33, this.a13 * other.a11 + this.a23 * other.a12 +this.a33 * other.a13, this.a13 * other.a21 + this.a23 * other.a22 + this.a33 * other.a23, this.a13 * other.a31 + this.a23 * other.a32 + this.a33 * other.a33)
  }
}

class Detector {
  qrcode: { width: number, height: number }
  image: Uint8Array
  resultPointCallback?: null | { foundPossibleResultPoint: Function }

  constructor(qrcode: { width: number, height: number }, image: Uint8Array) {
    this.qrcode = qrcode
    this.image = image
    this.resultPointCallback = null
  }

  sizeOfBlackWhiteBlackRun(fromX: number, fromY: number, toX: number, toY: number) {
    // Mild variant of Bresenham's algorithm
    // see http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
    const steep = Math.abs(toY - fromY) > Math.abs(toX - fromX)
    if (steep) {
      let temp = fromX
      fromX = fromY
      fromY = temp
      temp = toX
      toX = toY
      toY = temp
    }

    const dx = Math.abs(toX - fromX)
    const dy = Math.abs(toY - fromY)
    let error = - dx >> 1
    const yStep = fromY < toY ? 1 : - 1
    const xStep = fromX < toX ? 1 : - 1
    let state = 0 // In black pixels, looking for white, first or second time

    for (var x = fromX, y = fromY; x != toX; x += xStep) {
      const realX = steep ? y : x
      const realY = steep ? x : y

      if (state === 1) {
        // In white pixels, looking for black
        if (this.image[realX + realY * this.qrcode.width]) {
          state++
        }
      } else {
        if (!this.image[realX + realY * this.qrcode.width]) {
          state++
        }
      }

      if (state === 3) {
        // Found black, white, black, and stumbled back onto white; done
        const diffX = x - fromX
        const diffY = y - fromY
        return  Math.sqrt( (diffX * diffX + diffY * diffY))
      }

      error += dy
      if (error > 0) {
        if (y == toY) {
          break
        }
        y += yStep
        error -= dx
      }
    }
    const diffX2 = toX - fromX
    const diffY2 = toY - fromY
    return  Math.sqrt( (diffX2 * diffX2 + diffY2 * diffY2))
  }

  sizeOfBlackWhiteBlackRunBothWays(fromX: number, fromY: number, toX: number, toY: number) {
    let result = this.sizeOfBlackWhiteBlackRun(fromX, fromY, toX, toY)

    // Now count other way -- don't run off image though of course
    let scale = 1.0
    let otherToX = fromX - (toX - fromX)

    if (otherToX < 0) {
      scale =  fromX /  (fromX - otherToX)
      otherToX = 0
    } else if (otherToX >= this.qrcode.width) {
      scale =  (this.qrcode.width - 1 - fromX) /  (otherToX - fromX)
      otherToX = this.qrcode.width - 1
    }

    let otherToY = Math.floor (fromY - (toY - fromY) * scale)

    scale = 1.0
    if (otherToY < 0) {
      scale =  fromY /  (fromY - otherToY)
      otherToY = 0
    } else if (otherToY >= this.qrcode.height) {
      scale =  (this.qrcode.height - 1 - fromY) /  (otherToY - fromY)
      otherToY = this.qrcode.height - 1
    }

    otherToX = Math.floor (fromX + (otherToX - fromX) * scale)

    result += this.sizeOfBlackWhiteBlackRun(fromX, fromY, otherToX, otherToY)
    return result - 1.0 // -1 because we counted the middle pixel twice
  }

  calculateModuleSizeOneWay(pattern: FinderPattern, otherPattern: FinderPattern){
    const moduleSizeEst1 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor( pattern.X), Math.floor( pattern.Y), Math.floor( otherPattern.X), Math.floor(otherPattern.Y))
    const moduleSizeEst2 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(otherPattern.X), Math.floor(otherPattern.Y), Math.floor( pattern.X), Math.floor(pattern.Y))

    return isNaN(moduleSizeEst1)
      ? moduleSizeEst2 / 7.0
      : isNaN(moduleSizeEst2)
      ? moduleSizeEst1 / 7.0
      // Average them, and divide by 7 since we've counted the width of 3 black modules,
      // and 1 white and 1 black module on either side. Ergo, divide sum by 14.
      : (moduleSizeEst1 + moduleSizeEst2) / 14.0
  }

  calculateModuleSize(topLeft: FinderPattern, topRight: FinderPattern, bottomLeft: FinderPattern) {
    // Take the average
    return (this.calculateModuleSizeOneWay(topLeft, topRight) + this.calculateModuleSizeOneWay(topLeft, bottomLeft)) / 2.0
  }

  distance(pattern1: FinderPattern, pattern2: FinderPattern) {
    const xDiff = pattern1.X - pattern2.X
    const yDiff = pattern1.Y - pattern2.Y
    return  Math.sqrt( (xDiff * xDiff + yDiff * yDiff))
  }

  computeDimension(topLeft: FinderPattern, topRight: FinderPattern, bottomLeft: FinderPattern, moduleSize: number) {
    const tltrCentersDimension = Math.round(this.distance(topLeft, topRight) / moduleSize)
    const tlblCentersDimension = Math.round(this.distance(topLeft, bottomLeft) / moduleSize)
    let dimension = ((tltrCentersDimension + tlblCentersDimension) >> 1) + 7

    switch (dimension & 0x03) {
      // mod 4
      case 0:
        dimension++
        break
        // 1? do nothing

      case 2:
        dimension--
        break

      case 3:
        throw "Error"
    }
    return dimension
  }

  findAlignmentInRegion(overallEstModuleSize: number, estAlignmentX: number, estAlignmentY: number, allowanceFactor: number) {
    // Look for an alignment pattern (3 modules in size) around where it
    // should be
    const allowance = Math.floor (allowanceFactor * overallEstModuleSize)
    const alignmentAreaLeftX = Math.max(0, estAlignmentX - allowance)
    const alignmentAreaRightX = Math.min(this.qrcode.width - 1, estAlignmentX + allowance)

    if (alignmentAreaRightX - alignmentAreaLeftX < overallEstModuleSize * 3) {
      throw "Error"
    }

    const alignmentAreaTopY = Math.max(0, estAlignmentY - allowance)
    const alignmentAreaBottomY = Math.min(this.qrcode.height - 1, estAlignmentY + allowance)

    const alignmentFinder = new AlignmentPatternFinder(this.qrcode, this.image, alignmentAreaLeftX, alignmentAreaTopY, alignmentAreaRightX - alignmentAreaLeftX, alignmentAreaBottomY - alignmentAreaTopY, overallEstModuleSize, this.resultPointCallback)
    return alignmentFinder.find()
  }

  createTransform(topLeft: FinderPattern, topRight: FinderPattern, bottomLeft: FinderPattern, alignmentPattern: null | FinderPattern, dimension: number) {
    const dimMinusThree =  dimension - 3.5
    let bottomRightX
    let bottomRightY
    let sourceBottomRightX
    let sourceBottomRightY

    if (alignmentPattern != null) {
      bottomRightX = alignmentPattern.X
      bottomRightY = alignmentPattern.Y
      sourceBottomRightX = sourceBottomRightY = dimMinusThree - 3.0
    } else {
      // Don't have an alignment pattern, just make up the bottom-right point
      bottomRightX = (topRight.X - topLeft.X) + bottomLeft.X
      bottomRightY = (topRight.Y - topLeft.Y) + bottomLeft.Y
      sourceBottomRightX = sourceBottomRightY = dimMinusThree
    }

    const transform = quadrilateralToQuadrilateral(3.5, 3.5, dimMinusThree, 3.5, sourceBottomRightX, sourceBottomRightY, 3.5, dimMinusThree, topLeft.X, topLeft.Y, topRight.X, topRight.Y, bottomRightX, bottomRightY, bottomLeft.X, bottomLeft.Y)

    return transform
  }

  sampleGrid(transform: PerspectiveTransform, dimension: number) {
    return sampleGrid3(this.qrcode, this.image, dimension, transform)
  }

  processFinderPatternInfo(info: FinderPatternInfo) {
    const topLeft = info.TopLeft
    const topRight = info.TopRight
    const bottomLeft = info.BottomLeft

    const moduleSize = this.calculateModuleSize(topLeft, topRight, bottomLeft)
    if (moduleSize < 1.0) {
      throw "Error"
    }
    const dimension = this.computeDimension(topLeft, topRight, bottomLeft, moduleSize)
    const provisionalVersion = Version.getProvisionalVersionForDimension(dimension)
    const modulesBetweenFPCenters = provisionalVersion.DimensionForVersion - 7

    const alignmentPattern = null
    // Anything above version 1 has an alignment pattern
    if (provisionalVersion.AlignmentPatternCenters.length > 0)
    {

      // Guess where a "bottom right" finder pattern would have been
      const bottomRightX = topRight.X - topLeft.X + bottomLeft.X
      const bottomRightY = topRight.Y - topLeft.Y + bottomLeft.Y

      // Estimate that alignment pattern is closer by 3 modules
      // from "bottom right" to known top left location
      const correctionToTopLeft = 1.0 - 3.0 /  modulesBetweenFPCenters
      const estAlignmentX = Math.floor (topLeft.X + correctionToTopLeft * (bottomRightX - topLeft.X))
      const estAlignmentY = Math.floor (topLeft.Y + correctionToTopLeft * (bottomRightY - topLeft.Y))

      // Kind of arbitrary -- expand search radius before giving up
      for (var i = 4; i <= 16; i <<= 1)
      {
        //try
        //{
          alignmentPattern = this.findAlignmentInRegion(moduleSize, estAlignmentX, estAlignmentY, i)
          break
        //}
        //catch (re)
        //{
          // try next round
        //}
      }
      // If we didn't find alignment pattern... well try anyway without it
    }

    const transform = this.createTransform(topLeft, topRight, bottomLeft, alignmentPattern, dimension)

    const bits = this.sampleGrid(this.image, transform, dimension)

    const points
    if (alignmentPattern == null)
    {
      points = new Array(bottomLeft, topLeft, topRight)
    }
    else
    {
      points = new Array(bottomLeft, topLeft, topRight, alignmentPattern)
    }
    return { bits, points }
  }



  detect() {
    const info =  new FinderPatternFinder(this.qrcode.width, this.qrcode.height, this.image).findFinderPattern()

    return this.processFinderPatternInfo(info)
  }
}