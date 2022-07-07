import './index.scss'

import digi, { createData, forEach } from 'digi'
import refs from 'digi-refs'
import classname from 'digi-classname'
import router from 'digi-router'

import bind from './sections/bind'
import filter from './sections/filter'
import select from './sections/select'
import rgba from './sections/rgba'
import refsSection from './sections/refs'
import className from './sections/className'
import { Button, TextButton, ContainedButton } from './ui/Button'
import { Badge } from './ui/Badge'
import { Navigation } from './ui/Navigation'
import { Card } from './ui/Card'
import { Modal } from './ui/Modal'

digi.plugins([ refs, classname, ...router ])

const line = { tagName: 'hr', style: {  margin: '20px 0' } }
const listData = [{ id: 0, title: '标题1', content: '内容1' }, { id: 1, title: '标题2', content: '内容2' }]
const list = { tagName: 'ul', child: [] }
forEach(listData, item => list.child.push({ tagName: 'li', child: { to: '/list/' + item.id, text: item.title, tagName: 'a' } }))
list.child.push({ tagName: 'li', child: { to: '/list/404', text: '已不存在的文章', tagName: 'a' } })
const modal = new Modal({
  head: {
    child: { ...new Button({ backgroundColor: '#ffbbff' }), text: '关闭', onclick: () => modal.value = false },
    text: 'title',
    style: { backgroundColor: '#2196f3' }
  },
  body: {
    innerText: 'content\ncontent\ncontent\ncontentt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\nt\n\ncontent\ncontent\ncontent',
    // innerText: 'content',
    style: { padding: '20px', minWidth: '200px' }
  },
  footer: {
    child: [
      { ...new Button({ backgroundColor: '#ffbbff' }), text: '取消', onclick: () => modal.value = false },
      { ...new Button({ backgroundColor: '#abcdef' }), text: '确定', onclick: () => modal.value = false },
    ],
    style: { backgroundColor: '#2196f3' }
  },
  scroll: 'modal',
  // fullScreen: true
})
const data = createData()
window.data = data

digi([
  { to: '/', text: '首页', tagName: 'a', style: { marginRight: '20px' } },
  { to: '/ui', text: 'ui', tagName: 'a', style: { marginRight: '20px' } },
  { to: '/list', text: '文章列表', tagName: 'a', style: { marginRight: '20px' } },
  { path: '/list/:id', text: data.$tp('detail.title'), tagName: 'span' },
  line,
  { path: '/', child: [
    ...bind,
    line,
    ...filter,
    line,
    ...select,
    line,
    ...rgba,
    line,
    ...refsSection,
    line,
    ...className,
    line
  ]},
  { path: '/ui', child: [
    { ...new Button(), text: 'Default' },
    { ...new Button({ color: '#2196f3' }), text: 'Primary' },
    { ...new Button({ backgroundColor: '#ffbbff', disabled: true }), text: 'Primary' },
    { ...new Button({ backgroundColor: '#141414' }), text: 'Primary' },
    { ...new TextButton({disabled: true}), text: 'TextButton' },
    { ...new ContainedButton(), text: 'ContainedButton'},
    new Badge({ text: 4, child: { ...new Button(), text: 'Default' } }),
    line,
    new Navigation({
      child: [
        'home',
        { text: 'news', active: true, child: { text: 'news'} },
        'user'
      ],
      color: '#ff0000',
      activeColor: '#00ff00',
      onChange: v => console.log(v)
    }),
    line,
    new Card({
      className: data.$tp('className'),
      style: {
        width: '320px'
      },
      child: [{
        style: {
          background: 'url(http://www.wcwahlj.com/upload/image/20171228/20171228135441_7552.jpg)',
          backgroundSize: 'cover',
          width: '320px',
          height: '180px'
        }
      }, { text: '小猫' }]
    }),
    line,
    { text: 'Modal' },
    { ...new Button(), text: 'open Modal', onclick: () => modal.value = !modal.value },
    modal
  ] },
  { path: '/list', child: list },
  {
    path: { pathname: '/list/:id', watch: ({ params }) => data.detail = listData[params.id]},
    tagName: 'a',
    child: { text: data.$tp('detail.content', val => val || '文章已被外星生物销毁了') }
  },
  { path: /.+/, text: '404' }
])
