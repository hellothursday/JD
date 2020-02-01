import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'scss/reset.scss'
import 'api/axios.config'
import 'js/filters'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
