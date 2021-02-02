import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'
import VueTheMask from 'vue-the-mask'
import Cloudinary from 'cloudinary-vue'
import Popup from '@/components/Popup'

Sentry.init({
  Vue,
  dsn: 'https://6dad949ef73644a191805fba31018ebf@o505169.ingest.sentry.io/5593013',
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing()
  ],
  tracesSampleRate: 1.0
})

Vue.config.productionTip = false
Vue.use(Vuelidate, VueTheMask)

Vue.use(Cloudinary, {
  configuration: { cloudName: 'db6qzfvbw' }
})

Vue.component('Popup', Popup)

Vue.filter('sexMsgDelete', function (sex) {
  if (sex === 'Женский') {
    return 'При нажатии кнопки "да" будет удалена работница '
  } else {
    return 'При нажатии кнопки "да" будет удалён рабочий '
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
