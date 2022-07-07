/**
 * 加亮颜色
 * @param   {String} color  - rgb色值，rgb色值，格式为：/^#[0-9a-f]{6}$/
 * @param   {Number} amount - 变亮数
 * @returns {String}        - 返回新的rgb颜色
 */
export const lightenColor = (color, amount) => {
  if (!/^#[0-9a-f]{6}$/.test(color)) {
    throw new TypeError(color)
  }
  color = color.slice(1)

  let num = parseInt(color,16)

  let r = (num >> 16) + amount

  if ( r > 255 ) r = 255
  else if (r < 0) r = 0

  let g = ((num >> 8) & 0x00FF) + amount

  if ( g > 255 ) g = 255
  else if (g < 0) g = 0

  let b = (num & 0x0000FF) + amount

  if ( b > 255 ) b = 255
  else if ( b < 0 ) b = 0

  return (((r << 16) | (g << 8) | b) + 0x1000000).toString(16).replace(/1/, '#')
}
