import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sites: {},
    employees: {},
    workers: {},
    dataThisEmployee: ''
  },

  getters: {
    sites: state => state.sites,
    employees: state => state.employees,
    workers: state => state.workers,
    dataThisEmployee: state => state.dataThisEmployee
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

    SET_DATA_AUTH (state, data) {
      state.dataThisEmployee = data
    }
  },
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)

        const sites = firebase.database().ref('/sites/')
        sites.on('value', (snapshot) => {
          console.log('Sites in Database:', snapshot.val())
          commit('SET_SITES', snapshot.val())
        })

        const employees = firebase.database().ref('/employees/')
        employees.on('value', (snapshot) => {
          console.log('Employees in Database:', snapshot.val())
          commit('SET_EMPLOYEES', snapshot.val())
        })

        const workers = firebase.database().ref('/workers/')
        workers.on('value', (snapshot) => {
          console.log('Workers in Database:', snapshot.val())
          commit('SET_WORKERS', snapshot.val())
        })
      } catch (e) {}
    },

    async logout () {
      await firebase.auth().signOut()
    }
  }
})
