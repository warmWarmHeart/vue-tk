import Vue from 'vue'
import App from './App.vue'
import Echarts from 'echarts'
import Element from 'element-ui'

import vueTk from './lib/index.js'
// import vuePayKeyboard from './lib/indexvue-pay-keyboard'
Vue.use(vueTk)
Vue.prototype.$echarts = Echarts
Vue.use(Element)
new Vue({
  el: '#app',
  render: h => h(App)
})


