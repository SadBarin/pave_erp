import firebase from 'firebase/app'

export default {
  state: {
    workers: {}
  },
  getters: {
    workers: state => state.workers
  },
  mutations: {
    SET_WORKERS_FROM_LOCAL_STORAGE (state) {
      state.workers = JSON.parse(localStorage.getItem('workers'))
    },

    SET_WORKERS_FROM_SERVER (state) {
      const workers = firebase.database().ref('/workers/')
      workers.on('value', (snapshot) => {
        localStorage.setItem('workers', JSON.stringify(snapshot.val()))
        state.workers = JSON.parse(localStorage.getItem('workers'))
      })
    }
  }
}
