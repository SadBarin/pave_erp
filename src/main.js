import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Popup from '@/components/Popup'

import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

import Cloudinary from 'cloudinary-vue'

import 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.component('Popup', Popup)

Vue.config.productionTip = false
Vue.use(Vuelidate, VueTheMask, Cloudinary, {
  configuration: { cloudName: 'db6qzfvbw' }
})

Sentry.init({
  Vue,
  dsn: 'https://6dad949ef73644a191805fba31018ebf@o505169.ingest.sentry.io/5593013',
  autoSessionTracking: true,
  environment: 'production',
  integrations: [
    new Integrations.BrowserTracing()
  ],
  tracesSampleRate: 1.0
})

firebase.initializeApp({
  apiKey: 'AIzaSyABOUNJ-twAF_dgCh0Cns3jFeZihOIHQU8',
  authDomain: 'pave0erp.firebaseapp.com',
  projectId: 'pave0erp',
  storageBucket: 'pave0erp.appspot.com',
  messagingSenderId: '1073821009185',
  appId: '1:1073821009185:web:c12b166d1736255b872a60',
  measurementId: 'G-6PK395BWTR'
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
