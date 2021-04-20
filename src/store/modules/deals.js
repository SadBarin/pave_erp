import firebase from 'firebase/app'

export default {
  state: {
    deals: {}
  },
  getters: {
    deals: state => state.deals
  },
  mutations: {
    SET_DEALS_FROM_LOCAL_STORAGE (state) {
      state.deals = JSON.parse(localStorage.getItem('deals'))
    },

    SET_DEALS_FROM_SERVER (state) {
      const deals = firebase.database().ref('/deals/')
      deals.on('value', (snapshot) => {
        localStorage.setItem('deals', JSON.stringify(snapshot.val()))
        state.deals = JSON.parse(localStorage.getItem('deals'))
      })
    }
  }
}
