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
    SET_EMPLOYEES_FROM_LOCAL_STORAGE (state) {
      state.employees = JSON.parse(localStorage.getItem('employees'))
    },

    SET_EMPLOYEES_FROM_SERVER (state) {
      const employees = firebase.database().ref('/employees/')
      employees.on('value', (snapshot) => {
        localStorage.setItem('employees', JSON.stringify(snapshot.val()))
        state.employees = JSON.parse(localStorage.getItem('employees'))
      })
    }
  }
}
