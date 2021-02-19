import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

import sites from '@/store/modules/sites'
import employees from '@/store/modules/employees'
import workers from '@/store/modules/workers'
import customers from '@/store/modules/customers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)

        commit('SET_WORKERS_FROM_SERVER')
        commit('SET_CUSTOMERS_FROM_SERVER')
        commit('SET_SITES_FROM_SERVER')
        commit('SET_EMPLOYEES_FROM_SERVER')
      } catch (e) {}
    },

    async logout () {
      await firebase.auth().signOut()
    }
  },
  modules: [sites, employees, workers, customers]
})
