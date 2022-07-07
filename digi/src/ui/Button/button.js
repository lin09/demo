import addStyle       from '../style'
import { TextButton } from './textButton'
import { className }  from './base'

const classNames = []

export class Button extends TextButton {
  /**
   * 按钮
   * @param   {Object}  param                 - rgb色值格式为：/^#[0-9a-f]{6}$/
   * @param   {String}  param.color           - 文本rgb色值，默认值为“'#333333'”或“#ffffff”(根据backgroundColor)，格式为：/^#[0-9a-f]{6}$/
   * @param   {String}  param.backgroundColor - 背景rgb色值，默认值为“transparent”，格式为：/^#[0-9a-f]{6}$/
   * @param   {String}  param.borderColor     - 边框rgb色值，默认值为(backgroundColor或color)+'88'
   * @param   {Boolean} param.disabled        - 禁用按钮，默认false；如果为true，参数color、borderColor和backgroundColor无效
   * @returns {Object}                        - { className: [ ... ], tagName: 'button', child: { ...ripple } }
   */
  constructor ({ color, backgroundColor, borderColor, disabled } = {}) {
    super({ color, backgroundColor, disabled })
    if (disabled) {
      this.className = [ ...this.className, `${ className }-border-disabled` ]
    } else {
      color = color || (backgroundColor ? '#ffffff' : '#333333')

      let csNm = `${ className }-border-`
      if (backgroundColor) {
        csNm += backgroundColor.replace('#', '')
      } else {
        csNm += color.replace('#', '')
      }

      if (classNames.indexOf(csNm) === -1) {
        classNames.push(csNm)

        let hoverBorderColor = 'transparent'
        borderColor = borderColor || (backgroundColor ? backgroundColor : color)
        if (borderColor !== 'transparent') {
          borderColor     += '88'
          hoverBorderColor = backgroundColor || color
        }
        addStyle(`
          .${ csNm } {
            border: 1px solid ${borderColor};
          }
          .${ csNm }:hover {
            border-color: ${hoverBorderColor};
          }`)
      }

      this.className = [ ...this.className, csNm ]
    }
  }
}
