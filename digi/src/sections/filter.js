import { createData } from 'digi'

const data = createData({ a: '2019-01-01' })

export default [
  { tagName: 'h3', text: '过滤器' },
  {
    tagName: 'input',
    type: 'date',
    value: data.a,
    oninput () {
      data.a = this.value
    }
  },
  // 可多个过滤器
  { text: data.$tp('a', val => val + ' 0:00:', val => val + '00') },
  // 可以接收参数
  { text: data.$tp('a', [(val, Y, M, D) => val.replace('-', Y).replace('-', M) + D, '年', '月', '日']) }
]
