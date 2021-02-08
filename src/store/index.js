import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sites: {},
    employees: {},
    workers: {},
    customers: {}
  },

  getters: {
    sites: state => state.sites,
    employees: state => state.employees,
    workers: state => state.workers,
    customers: state => state.customers
  },

  mutations: {
    SET_SITES (state, data) {
      state.sites = data
    },

    SET_EMPLOYEES (state, data) {
      state.employees = data
    },

    SET_WORKERS (state, data) {
      state.workers = data
    },

    SET_SITES_FROM_SERVER (state) {
      const sites = firebase.database().ref('/sites/')
      sites.on('value', (snapshot) => {
        console.log('Sites in Database:', snapshot.val())
        state.sites = snapshot.val()
      })
    },

    SET_EMPLOYEES_FROM_SERVER (state) {
      const employees = firebase.database().ref('/employees/')
      employees.on('value', (snapshot) => {
        console.log('Employees in Database:', snapshot.val())
        state.employees = snapshot.val()
      })
    },

    SET_WORKERS_FROM_SERVER (state) {
      const workers = firebase.database().ref('/workers/')
      workers.on('value', (snapshot) => {
        console.log('Workers in Database:', snapshot.val())
        state.workers = snapshot.val()
      })
    },

    SET_CUSTOMERS_FROM_SERVER (state) {
      const customers = firebase.database().ref('/customers/')
      customers.on('value', (snapshot) => {
        console.log('Customers in Database:', snapshot.val())
        state.customers = snapshot.val()
      })
    }
  },
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
  }
})
