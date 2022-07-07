/**
 * 根据颜色为其匹配黑白色
 * @param   {String} color  - rgb色值，格式为：/^#[0-9a-f]{6}$/
 * @param   {String} back   - 黑色，默认值为'#333333'，格式为：/^#[0-9a-f]{6}$/
 * @param   {String} white  - 白色，默认值为'#ffffff'，格式为：/^#[0-9a-f]{6}$/
 * @returns {String}        - 返回黑色或白色
 * @example
 * import { adaptBW } from 'digi-ui/color'
 *
 * console.log(adaptBW('#ff00ff'))
 * // => #ffffff
 *
 * console.log(adaptBW('#ffff00'))
 * // => #333333
 */
export const adaptBW = (color, { back, white } = {}) => {
  if (!/^#[0-9a-f]{6}$/.test(color)) {
    throw new TypeError(color)
  }

  if ((parseInt(color.replace('#', ''), 16) >> 8 & 0x00ff) > 204) {
    return back || '#333333'
  } else {
    return white || '#ffffff'
  }
}
