import { createData } from 'digi'
import { arrayTag }   from '../toStringTag'
import { TextButton } from '../Button'
import addStyle       from '../style'

import './navigation.scss'

// 记录添加的样式名
const classNames = []
// 样式名
const className = 'navigation'

export class Navigation {
  /**
   * 导航
   * @param   {Object}   param0
   * @param   {Array}    param0.child       - 导航项
   * @param   {String}   param0.color       - 默认颜色，默认值为“#333333”
   * @param   {String}   param0.activeColor - 激活状态的颜色，默认值为“#2196f3”
   * @param   {Function} param0.onChange    - 值更改时触发回调, fun({ index: Number, event: event })，index:索引，event:事件
   * @returns {Object}                      - { child: Array, className: Array }
   */
  constructor ({ child, color, activeColor, onChange } = {}) {
    if (toString.call(child) !== arrayTag) {
      throw new TypeError('Navigation params error:' + JSON.stringify(child))
    }

    // 记录激活状态
    const data      = createData()
    // 激活索引
    let activeIndex = 0

    color           = color || '#333333'
    activeColor     = activeColor || '#2196f3'
    // 默认颜色，覆盖按钮颜色(按钮颜色为激活状态的颜色)
    const csNm      = `${ className }-${ color.replace('#', '') }`

    child = [ ...child ]
    child.forEach((item, index) => {
      if (typeof item !== 'object') {
        // 不是对象输出到文本
        item = { text: item }
      }

      item = { ...item, color: activeColor }
      const button = new TextButton(item)

      item.child = item.child || []
      if (toString.call(item.child) !== arrayTag) {
        item.child = [ item.child ]
      }
      item.child = [].concat(button.child).concat(item.child)

      // 自定义样式名
      item.className = item.className || []
      if (toString.call(item.className) !== arrayTag) {
        item.className = [ item.className ]
      }
      // 正常状态样式名
      const itemClassName = [].concat(button.className).concat([ className + '-item', csNm ]).concat(item.className)
      // 激活状态样式名
      const itemClassNameActive = [].concat(button.className).concat([ className + '-item' ]).concat(item.className)
      // 是否激活
      if (item.active) {
        data[index] = itemClassNameActive
        activeIndex = index
      } else {
        data[index] = itemClassName
      }

      for (const key in item) {
        button[key] = item[key]
      }
      // 绑定样式名
      button.className = data.$tp(index)
      button.onclick = event => {
        // 切换项
        if (activeIndex !== index) {
          data[activeIndex] = itemClassName
          data[index] = itemClassNameActive
          activeIndex = index
          onChange && onChange({ index: activeIndex, name: item.name, event })
        }
      }
      child[index] = button
    })

    // 添加样式
    if (classNames.indexOf(csNm) === -1) {
      classNames.push(csNm)
      addStyle(`
        .${ csNm } {
          color: ${ color };
        }`)
    }

    this.child     = child
    this.className = [ className ]
  }
}
