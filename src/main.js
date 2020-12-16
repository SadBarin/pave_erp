import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false
Vue.use(Vuelidate, VueTheMask)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
