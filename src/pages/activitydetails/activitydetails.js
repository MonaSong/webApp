require('@/assets/lib/polyfill.min.js')
require('@/assets/js/tools')
import Vue from 'vue'
import App from './activitydetails-app'
import router from './router'
import '@/assets/js/set_rem'
import '@/assets/style/normalize.css'
import '@/assets/style/common.less'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
