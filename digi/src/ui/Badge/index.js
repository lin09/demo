import './index.scss'
import addStyle     from '../style'
import { adaptBW }  from '../color'
import { arrayTag } from '../toStringTag'

const className  = 'badge'
const classNames = []

export class Badge {
  /**
   * 徽章
   * @param   {Object}              param                 - rgb色值, 格式为：/^#[0-9a-f]{6}$/
   * @param   {String}              param.text            - 徽章里的内容
   * @param   {String}              param.backgroundColor - 背景颜色，默认值为“#e10050”
   * @param   {String}              param.color           - 字体颜色，默认值根据backgroundColor选择黑或白色字体
   * @param   {Array|Object|String} param.child           - 徽章所在的元素
   * @returns {Object}                                    - { className: string, child: [ ...child, badge ]}
   */
  constructor ({ text, backgroundColor, color, child } = {}) {
    backgroundColor = backgroundColor || '#e10050'
    color           = color || adaptBW(backgroundColor)
    const csNm      = `${ className }-${ color.replace('#', '') }${ backgroundColor.replace('#', '') }`

    if (classNames.indexOf(csNm) === -1) {
      classNames.push(csNm)
      addStyle(`
        .${ csNm } {
          color            : ${ color };
          background-color : ${ backgroundColor };
        }`)
    }

    child = child || []
    if (toString.call(child) !== arrayTag) {
      child = [ child ]
    }
    child.push({
      className: [className, csNm],
      text
    })

    this.className = 'badge-content'
    this.child     = child
  }
}
