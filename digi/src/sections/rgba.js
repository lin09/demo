import { createData } from 'digi'

const data = createData({ color: { r: 0, g: 0, b: 0, a: 1 } })

export default [
  { tagName: 'h3', text: '颜色' },
  {
    style: {
      width: '200px',
      height: '100px',
      backgroundColor: `rgba(${ data.$tp('color.r') }, ${ data.$tp('color.g') }, ${ data.$tp('color.b') }, ${ data.$tp('color.a') })`
    }
  },
  {
    text: 'r: ',
    child: {
      tagName: 'input',
      type: 'number',
      min: 0,
      max: 255,
      value: data.$tp('color.r'),
      oninput () { data.color.r = this.value }
    }
  },
  {
    text: 'g: ',
    child: {
      tagName: 'input',
      type: 'number',
      min: 0,
      max: 255,
      value: data.$tp('color.g'),
      oninput () { data.color.g = this.value }
    }
  },
  {
    text: 'b: ',
    child: {
      tagName: 'input',
      type: 'number',
      min: 0,
      max: 255,
      value: data.$tp('color.b'),
      oninput () { data.color.b = this.value }
    }
  },
  {
    text: 'a: ',
    child: {
      tagName: 'input',
      type: 'number',
      min: 0,
      max: 1,
      step: 0.01,
      value: data.$tp('color.a'),
      oninput () { data.color.a = this.value }
    }
  }
]