import firebase from 'firebase/app'

export default {
  state: {
    customers: {}
  },
  getters: {
    customers: state => state.customers
  },
  mutations: {
    SET_CUSTOMERS_FROM_SERVER (state) {
      const customers = firebase.database().ref('/customers/')
      customers.on('value', (snapshot) => {
        state.customers = snapshot.val()
      })
    }
  }
}
