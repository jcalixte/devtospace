import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import filters from './utils/filters'

Vue.config.productionTip = false

for (const filter in filters) {
  Vue.filter(filter, filters[filter])
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
