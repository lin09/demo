import './index.scss'
import adaptive from '@lin09/adaptivejs'

adaptive.run()

const createText = ({ fontSize, pageWidth, scale }) => `{
  fontSize  : ${ fontSize },
  pageWidth : ${ pageWidth },
  scale     : ${ scale }
}
`
window.addEventListener('load', () => {
  const viewport = document.getElementsByName('viewport')[0]

  const adaptiveEl = document.createElement('div')
  adaptiveEl.className = 'adaptive'
  const infoDoc = document.createElement('pre')
  adaptiveEl.prepend(infoDoc)
  document.body.prepend(adaptiveEl)


  // 监控变化
  const resize = () => {
    let pageWidth = document.documentElement.clientWidth
    if (pageWidth > 1024) {
      pageWidth = 1024
    } else if (pageWidth < 750) {
      pageWidth = 750
    }

    infoDoc.innerText = createText({
      fontSize: document.documentElement.style.fontSize,
      pageWidth: pageWidth + 'px',
      scale: viewport.content.replace(/.+scale=((.+),)?.+/,'$2')
    })
  }

  resize()

  window.addEventListener('resize', resize)
})
