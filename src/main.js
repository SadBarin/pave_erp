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
import VCalendar from 'v-calendar'

// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
  apiKey: 'AIzaSyABOUNJ-twAF_dgCh0Cns3jFeZihOIHQU8',
  authDomain: 'pave0erp.firebaseapp.com',
  projectId: 'pave0erp',
  storageBucket: 'pave0erp.appspot.com',
  messagingSenderId: '1073821009185',
  appId: '1:1073821009185:web:c12b166d1736255b872a60',
  measurementId: 'G-6PK395BWTR'
})

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
Vue.use(Vuelidate, VueTheMask, VCalendar)

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

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
