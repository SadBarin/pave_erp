import firebase from 'firebase/app'

export default {
  state: {
    sites: {}
  },
  getters: {
    sites: state => state.sites
  },
  mutations: {
    SET_SITES_FROM_LOCAL_STORAGE (state) {
      state.sites = JSON.parse(localStorage.getItem('sites'))
    },

    SET_SITES_FROM_SERVER (state) {
      const sites = firebase.database().ref('/sites/')
      sites.on('value', (snapshot) => {
        localStorage.setItem('sites', JSON.stringify(snapshot.val()))
        state.sites = JSON.parse(localStorage.getItem('sites'))
      })
    }
  }
}
