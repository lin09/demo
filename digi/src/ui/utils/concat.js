import { arrayTag } from '../toStringTag'

/**
 * 创建一个新数组，将数组与任何其他数组和/或值连接起来，注意：会丢弃!value
 * @param   {Array}  array  - 要连接的数组
 * @param   {...any} values - 要连接的值，注意：会丢弃!value
 * @returns {Array}         - 返回新数组
 */
export const concat = (array, ...values) => {
  if (toString.call(array) !== arrayTag) {
    array = array ? [ array ] : []
  }

  values.forEach(val => {
    if (toString.call(val) === arrayTag) {
      array.concat(array)
    } else {
      val && array.push(val)
    }
  })

  return array
}
