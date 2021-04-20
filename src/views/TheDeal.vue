<template>
  <div id="app-deal">
    <DealPopupAdd
      :popupHidden="popupAddDeal"
      @popup-toggle="popupAddToggle"
      @add-deal="addDeal"
    />

    <AppTopPanel header="Список сделок">
      <template #nav-buttons>
        <AppButtonIcon icon="add" title="Добавить сделки" @button-click="popupAddToggle()"/>
      </template>
    </AppTopPanel>

    <div class="app-deal-content">
      <DealTable :deals="deals"/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapMutations } from 'vuex'

import AppTopPanel from '../components/AppTopPanel'
import AppButtonIcon from '../components/AppButtonIcon'
import DealPopupAdd from '../components/section/deal/DealPopupAdd'
import DealTable from '../components/section/deal/DealTable'

export default {
  name: 'TheDeal',

  components: {
    AppTopPanel,
    AppButtonIcon,
    DealPopupAdd,
    DealTable
  },

  data () {
    return {
      popupAddDeal: true
    }
  },

  computed: {
    ...mapGetters([
      'deals'
    ])
  },

  created () {
    this.SET_DEALS_FROM_LOCAL_STORAGE()
  },

  methods: {
    ...mapMutations([
      'SET_DEALS_FROM_LOCAL_STORAGE',
      'SET_DEALS_FROM_SERVER'
    ]),

    popupAddToggle () {
      this.popupAddDeal = !this.popupAddDeal
    },

    addDeal (deal) {
      this.popupAddToggle()
      deal.name = deal.name[0].toUpperCase() + deal.name.substring(1)

      firebase.database().ref('/deals/' + deal.id).set(deal)
        .then(() => {
          console.log('Сделка добавлена ➕')
          this.popupAddHidden = true
          this.SET_DEALS_FROM_SERVER()
        })
    }
  }
}
</script>
