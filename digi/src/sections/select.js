import { createData } from 'digi'

const data = createData({ select: '' })

export default [
  { tagName: 'h3', text: '选择' },
  {
    tagName: 'select',
    onchange () { data.select = this.value },
    child: [
      { tagName: 'option', value: '', text: '选择' },
      { tagName: 'option', value: 1, text: '选择1' },
      { tagName: 'option', value: 2, text: '选择2' }
    ]
  },
  { text: '选择了：' + data.$tp('select') }
]