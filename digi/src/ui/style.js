const style = document.createElement('style')
style.type  = 'text/css'

export default cssText => {
  const newStyle = style.cloneNode()
  const text     = document.createTextNode(cssText)
  newStyle.appendChild(text)
  document.head.appendChild(newStyle)
}
