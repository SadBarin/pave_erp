import firebase from 'firebase/app'

export default {
  state: {
    customers: {}
  },
  getters: {
    customers: state => state.customers
  },
  mutations: {
    SET_CUSTOMERS_FROM_LOCAL_STORAGE (state) {
      state.customers = JSON.parse(localStorage.getItem('customers'))
    },

    SET_CUSTOMERS_FROM_SERVER (state) {
      const customers = firebase.database().ref('/customers/')
      customers.on('value', (snapshot) => {
        localStorage.setItem('customers', JSON.stringify(snapshot.val()))
        state.customers = JSON.parse(localStorage.getItem('customers'))
      })
    }
  }
}
