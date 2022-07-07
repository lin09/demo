import digi, { createData } from 'digi'

const watchLog = createData({ newVal: '', oldVal: 123 })

const data = createData({ a: 123 }, { watch: {
  a: (newVal, oldVal) => {
    watchLog.newVal = newVal
    watchLog.oldVal = oldVal
  }
}})

export default [
  { tagName: 'h3', text: '绑定数据' },
  { text: data.$tp('a') },
  {
    text: '单向绑定：',
    child: {
      tagName: 'input',
      value: data.a,
      oninput () {
        data.a = this.value
      }
    }
  },
  {
    text: '双向绑定：',
    child: {
      tagName: 'input',
      value: data.$tp('a'),
      oninput () {
        data.a = this.value
      }
    },
  },
  { text: `新值：${ watchLog.$tp('newVal')}，旧值：${ watchLog.$tp('oldVal')}`},
  {
    child: [
      {
        tagName: 'button',
        text: '添加显示',
        onclick () {
          digi({
            text: '点击删除：' + data.$tp('a'),
            onclick (e) {
              e.stopPropagation()
              this.remove()
            }
          }, this.parentNode)
        }
      },
    ]
  }
]