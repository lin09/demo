import { objectTag } from '../toStringTag'

export class Params {
  /**
   * 复制元素属性
   * @param   {Any} params - 元素属性
   * @returns { Object }   - { (...params(对象类型) | child: params) }
   */
  constructor (params) {
    if (toString.call(params) === objectTag) {
      Object.keys(params).forEach(key => {
        this[key] = params[key]
      })
    } else {
      this.child = params
    }
  }
}
