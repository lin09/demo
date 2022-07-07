import './index.scss'
import addStyle from '../style'

const className  = 'ripple'
const effect     = document.createElement('div')
effect.className = 'ripple-effect'

/**
 * 涟波
 * @class
 * @param   {String} color  - 颜色，默认值为“#000000”，格式为：/^#[0-9a-f]{6}$/
 * @returns {Object}        - { className: string, onclick: fun }
 */
export class Ripple {
  constructor ({ color } = {}) {
    this.className = className
    this.onclick   = function (e) {
      const el                 = effect.cloneNode()
      el.style.top             = (e.offsetY - 50) + 'px'
      el.style.left            = (e.offsetX - 50) + 'px'
      el.style.backgroundColor = color || '#000000'
      this.appendChild(el)
      setTimeout(() => el.remove(), 1000);
    }
  }
}
