import firebase from 'firebase/app'

export default {
  state: {
    employees: {}
  },
  getters: {
    employees: state => state.employees,
    authEmployee: state => state.employees[firebase.auth().currentUser.uid]
  },
  mutations: {
    SET_EMPLOYEES_FROM_SERVER (state) {
      const employees = firebase.database().ref('/employees/')
      employees.on('value', (snapshot) => {
        state.employees = snapshot.val()
      })
    }
  }
}
