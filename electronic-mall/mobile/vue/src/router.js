import Vue       from 'vue'
import VueRouter from 'vue-router'
import Home      from './pages/Home'
import Login     from './pages/Login'
import Register  from './pages/Register'
import TabNav    from './pages/TabNav'
import Shop      from './pages/Shop'
import ShopSort  from './pages/ShopSort'
import Search    from './pages/Search'
import Detail    from './pages/Detail'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/tabnav', name: 'tabnav', component: TabNav },
    { path: '/shop', name: 'shop', component: Shop },
    { path: '/shop-sort', name: 'shop-sort', component: ShopSort },
    { path: '/search', name: 'search', component: Search },
    { path: '/detail', name: 'detail', component: Detail }
  ]
})
