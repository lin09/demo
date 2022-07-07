/**
 * Ported to TypeScript by Lin09 2022
 * www.linzhenhui.cn
 */

/**
 * Ported to JavaScript by Lazar Laszlo 2011
 * lazarsoft@gmail.com, www.lazarsoft.info
 */

/*
 *
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { PerspectiveTransform, quadrilateralToQuadrilateral } from './detector'
import { BitMatrix } from './bitmat'

export function checkAndNudgePoints(qrcode: { width: number, height: number }, points: number[]) {
  const { width, height } = qrcode
  // Check and nudge points from start until we see some that are OK:
  let nudged = true
  for (let offset = 0; offset < points.length && nudged; offset += 2) {
    const x = Math.floor (points[offset])
    const y = Math.floor( points[offset + 1])
    if (x < - 1 || x > width || y < - 1 || y > height) {
      throw "Error.checkAndNudgePoints "
    }

    nudged = false
    if (x == - 1) {
      points[offset] = 0.0
      nudged = true
    } else if (x == width) {
      points[offset] = width - 1
      nudged = true
    }

    if (y == - 1) {
      points[offset + 1] = 0.0
      nudged = true
    } else if (y == height) {
      points[offset + 1] = height - 1
      nudged = true
    }
  }

  // Check and nudge points from end:
  nudged = true
  for (let offset = points.length - 2; offset >= 0 && nudged; offset -= 2) {
    const x = Math.floor( points[offset])
    const y = Math.floor( points[offset + 1])
    if (x < - 1 || x > width || y < - 1 || y > height) {
      throw "Error.checkAndNudgePoints "
    }

    nudged = false
    if (x == - 1) {
      points[offset] = 0.0
      nudged = true
    } else if (x == width) {
      points[offset] = width - 1
      nudged = true
    }

    if (y == - 1) {
      points[offset + 1] = 0.0
      nudged = true
    } else if (y == height) {
      points[offset + 1] = height - 1
      nudged = true
    }
  }
}

export function sampleGrid3(qrcode: { width: number, height: number }, image: Uint8Array, dimension: number, transform: PerspectiveTransform) {
  const bits = new BitMatrix(dimension)
  const points = new Array(dimension << 1)
  for (let y = 0; y < dimension; y++) {
    const max = points.length
    const iValue =  y + 0.5
    for (let x = 0; x < max; x += 2) {
      points[x] =  (x >> 1) + 0.5
      points[x + 1] = iValue
    }
    transform.transformPoints1(points)
    // Quick check to see if points transformed to something inside the image
    // sufficient to check the endpoints
    checkAndNudgePoints(qrcode, points)
    try {
      for (let x = 0; x < max; x += 2) {
        const bit = image[Math.floor(points[x]) + qrcode.width * Math.floor(points[x + 1])]
        if (bit) {
          bits.set_Renamed(x >> 1, y)
        }
      }
    } catch (err) {
      // This feels wrong, but, sometimes if the finder patterns are misidentified, the resulting
      // transform gets "twisted" such that it maps a straight line of points to a set of points
      // whose endpoints are in bounds, but others are not. There is probably some mathematical
      // way to detect this about the transformation that I don't know yet.
      // This results in an ugly runtime exception despite our clever checks above -- can't have
      // that. We could check each point's coordinates but that feels duplicative. We settle for
      // catching and wrapping ArrayIndexOutOfBoundsException.
      throw "Error.checkAndNudgePoints"
    }
  }
  return bits
}

export function sampleGridx(
  qrcode: { width: number, height: number },
   image: Uint8Array,
   dimension: number,
   p1ToX: number,
   p1ToY: number,
   p2ToX: number,
   p2ToY: number,
   p3ToX: number,
   p3ToY: number,
   p4ToX: number,
   p4ToY: number,
   p1FromX: number,
   p1FromY: number,
   p2FromX: number,
   p2FromY: number,
   p3FromX: number,
   p3FromY: number,
   p4FromX: number,
   p4FromY: number
) {
  const transform = quadrilateralToQuadrilateral(
    p1ToX,
    p1ToY,
    p2ToX,
    p2ToY,
    p3ToX,
    p3ToY,
    p4ToX,
    p4ToY,
    p1FromX,
    p1FromY,
    p2FromX,
    p2FromY,
    p3FromX,
    p3FromY,
    p4FromX,
    p4FromY
  )

  return sampleGrid3(qrcode, image, dimension, transform)
}


const GridSampler = { checkAndNudgePoints, sampleGrid3, sampleGridx }

export default GridSampler
