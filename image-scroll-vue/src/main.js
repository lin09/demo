import Vue from 'vue'
import App from './App.vue'
import adaptive from '@lin09/adaptivejs'
adaptive.run()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
