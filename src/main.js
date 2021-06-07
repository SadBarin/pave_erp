import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate, VueTheMask)

firebase.initializeApp({
  apiKey: 'AIzaSyBKUt6p0YEmr1ktJHOtPpGyU9lBr0Hli_g',
  authDomain: 'pave-erp-demo.firebaseapp.com',
  databaseURL: 'https://pave-erp-demo-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'pave-erp-demo',
  storageBucket: 'pave-erp-demo.appspot.com',
  messagingSenderId: '131489584571',
  appId: '1:131489584571:web:6ee13dcc5cae99c6cbe09e',
  measurementId: 'G-CD3GLGV8H5'
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
