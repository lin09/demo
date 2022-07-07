import './index.scss'
import addStyle                 from '../style'
import { Ripple }               from '../Ripple'
import { darkenColor, adaptBW } from '../color'
import { className, baseColor } from './base'

const classNames = []

export class TextButton {
  /**
   * 文本按钮
   * @param   {Object}  param                 - rgb色值格式为：/^#[0-9a-f]{6}$/
   * @param   {String}  param.color           - 文本rgb色值，默认值为“'#333333'”或“#ffffff”(根据backgroundColor)，格式为：/^#[0-9a-f]{6}$/
   * @param   {String}  param.backgroundColor - 背景rgb色值，默认值为“transparent”，格式为：/^#[0-9a-f]{6}$/
   * @param   {Boolean} param.disabled        - 禁用按钮，默认false；如果为true，参数color和backgroundColor无效
   * @returns {Object}                        - { className: [ ... ], tagName: 'button', child: { ...ripple }, [disabled] }
   */
  constructor ({ color, backgroundColor, disabled } = {}) {
    this.tagName = 'button'

    if (disabled) {
      this.className = [ className ]
      this.disabled  = true
    } else {
      if (!color && backgroundColor) {
        // 无文本颜色，根据背景颜色设置黑白文本颜色
        color = adaptBW(backgroundColor)
      } else {
        color = color || baseColor
      }

      // className
      let csNm = `${ className }-text-${ color.replace('#', '') }`
      // 鼠标经过背景颜色
      let hoverBgcolor = color + '14'
      if (backgroundColor) {
        // 有背景颜色的处理
        csNm += backgroundColor.replace('#', '')
        hoverBgcolor = darkenColor(backgroundColor, 20)
      }

      if (classNames.indexOf(csNm) === -1) {
        classNames.push(csNm)
        addStyle(`
          .${ csNm } {
            color            : ${ color };
            background-color : ${ backgroundColor || 'transparent' };
          }
          .${ csNm }:hover {
            background-color: ${ hoverBgcolor };
          }`)
      }

      this.className = [ className, csNm ]
      this.child     = new Ripple({ color })
    }
  }
}
