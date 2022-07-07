import { concat } from '../utils'
import { Params } from '../Params'

import './index.scss'

const className = 'card'

export class Card extends Params {
  /**
   * 卡片
   * @param   {Any} params - 元素属性
   * @returns { Object }   - { (...params | child: params), className: [ 'card', (params.className | ...params.className) ] }
   */
  constructor (params) {
    super(params)
    this.className = concat([ className ], this.className)
  }
}
