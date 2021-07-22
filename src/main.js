import Vue from 'vue'
import App from './App.vue'
import BMap from 'BMap'
Vue.config.productionTip = false
new Vue({
  BMap,
  render: h => h(App),
}).$mount('#app')
