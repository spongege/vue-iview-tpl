import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './lib/css/reset.css'

// 引入view-design
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)

// 将axios请求做统一管理
import api from './api/index'
Vue.prototype.$api = api

Vue.config.productionTip = false
window.env = process.env
window.v = Vue.prototype

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
