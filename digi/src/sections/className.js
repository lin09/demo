import { createData } from 'digi'

const data = createData({ hide: false })

export default [
  { tagName: 'h3', text: 'className' },
  { className: 'red', text: `字符串className: 'red'` },
  { text: `className: { hide: ${data.$tp('hide')} }`},
  {
    tagName: 'button',
    text: '点击' + data.$tp('hide', val => val ? 'show': 'hide'),
    onclick: () => data.hide = !data.hide
  },
  { className: { hide: data.$tp('hide') }, text: `对象值className: { hide: ${data.$tp('hide')} }` },
  { className: [{ hide: data.$tp('hide') }, 'red'], text: `数组+对象值className: [{ hide: ${data.$tp('hide')} }, 'red']` },
  { className: ['red', ['hide', data.$tp('hide')]], text: `数组+数组值className: ['red', ['hide', ${data.$tp('hide')}]]` }
]
