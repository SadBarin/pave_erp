import firebase from 'firebase/app'

export default {
  state: {
    workers: {}
  },
  getters: {
    workers: state => state.workers
  },
  mutations: {
    SET_WORKERS_FROM_SERVER (state) {
      const workers = firebase.database().ref('/workers/')
      workers.on('value', (snapshot) => {
        state.workers = snapshot.val()
      })
    }
  }
}
