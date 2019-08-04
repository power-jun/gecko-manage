import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './HTTPAdapter'

import '../public/css/icon.css'
import '../public/css/main.css'
import '../public/css/color-dark.css'

Vue.config.productionTip = false
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
