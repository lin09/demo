import './default.scss'
import Vue    from 'vue'
import App    from './App.vue'
import router from './router'
import adaptive from '@lin09/adaptivejs'

adaptive.run()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
