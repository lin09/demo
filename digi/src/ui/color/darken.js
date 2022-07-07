import { lightenColor } from './lighten'

/**
 * 变暗颜色
 * @param   {String} color  - rgb色值，rgb色值，格式为：/^#[0-9a-f]{6}$/
 * @param   {Number} amount - 变暗数
 * @returns {String}        - 返回新的rgb颜色
 */
export const darkenColor = (color, amount) => lightenColor(color, -amount)