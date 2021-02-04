import Vue from 'vue'
import Vuex from 'vuex'
import additionalData from '@/store/modules/additionalData'
// eslint-disable-next-line no-unused-vars
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sites: [],
    employees: [],
    workers: [],
    dataThisEmployee: '',

    sitesTrash: [],
    employeesTrash: [],
    workersTrash: []
  },

  getters: {
    additionalSites: state => state.additionalData.additionalSites,
    additionalEmployees: state => state.additionalData.additionalEmployees,
    additionalWorkers: state => state.additionalData.additionalWorkers,

    sites: state => state.sites,
    employees: state => state.employees,
    workers: state => state.workers,
    dataThisEmployee: state => state.dataThisEmployee
  },

  mutations: {
    SET_SITES (state, data = JSON.parse(localStorage.getItem('sites'))) {
      state.sites = data

      // Crutch
      localStorage.setItem('sites', JSON.stringify(data))
    },

    SET_EMPLOYEES (state, data = JSON.parse(localStorage.getItem('employees'))) {
      state.employees = data

      // Crutch
      localStorage.setItem('employees', JSON.stringify(data))
    },

    SET_WORKERS (state, data = JSON.parse(localStorage.getItem('workers'))) {
      state.workers = data

      // Crutch
      localStorage.setItem('workers', JSON.stringify(data))
    },

    SET_DATA_AUTH (state, data = JSON.parse(localStorage.getItem('dataThisEmployee'))) {
      state.dataThisEmployee = data

      // Crutch
      localStorage.setItem('dataThisEmployee', JSON.stringify(data))
    },

    SET_TRASH_SITES (state, data) {
      state.sitesTrash.push(data)
    }
  },
  actions: {},
  modules: {
    additionalData, auth
  }
})
