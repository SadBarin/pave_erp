<template>
  <div id="app-deal">
    <DealPopupAdd
      :popupHidden="popupAddDeal"
      @popup-toggle="popupAddToggle"
      @add-deal="addDeal"
    />

    <AppTopPanel header="Список сделок">
      <template #nav-buttons>
        <AppButtonIcon icon="add" size="1.8rem" title="Добавить" @button-click="popupAddToggle()"/>
      </template>
    </AppTopPanel>

    <div class="app-deal-content">
      <DealsTable :deals="deals" @remove-deal="removeDeal" @set-current-deal="setCurrentDeal"/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapMutations } from 'vuex'

import AppTopPanel from '../components/AppTopPanel'
import AppButtonIcon from '../components/AppButtonIcon'
import DealPopupAdd from '../components/section/deals/DealPopupAdd'
import DealsTable from '../components/section/deals/DealsTable'

export default {
  name: 'TheDeals',

  components: {
    AppTopPanel,
    AppButtonIcon,
    DealPopupAdd,
    DealsTable
  },

  data () {
    return {
      popupAddDeal: true,
      currentDeal: null
    }
  },

  computed: {
    ...mapGetters([
      'deals',
      'workers',
      'customers'
    ])
  },

  created () {
    this.SET_DEALS_FROM_LOCAL_STORAGE()

    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
  },

  methods: {
    ...mapMutations([
      'SET_DEALS_FROM_LOCAL_STORAGE',
      'SET_DEALS_FROM_SERVER',

      'SET_WORKERS_FROM_SERVER',
      'SET_WORKERS_FROM_LOCAL_STORAGE',

      'SET_CUSTOMERS_FROM_SERVER',
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE'
    ]),

    popupAddToggle () {
      this.popupAddDeal = !this.popupAddDeal
    },

    setCurrentDeal (deal) {
      this.currentDeal = deal
    },

    removeDeal (id) {
      firebase.database().ref('/deals/' + id).remove()
        .then(() => {
          console.log('Сделка удалёна 🗑️')
          this.SET_DEALS_FROM_SERVER()
        })
    },

    addDeal (deal) {
      this.popupAddToggle()
      deal.name = deal.name[0].toUpperCase() + deal.name.substring(1)
      const worker = deal.worker = this.workers[deal.worker]
      const customer = deal.customer = this.customers[deal.customer]

      // deal.worker = worker.surname + ' ' + worker.name

      // const date = deal.date
      // deal.worker = worker.surname + ' ' + worker.name

      try {
        customer.dealStatistics.push({
          name: deal.name,
          dateStart: deal.dateStart,
          dateEnd: deal.dateEnd
        })
      } catch (e) {
        customer.dealStatistics = [{
          name: deal.name,
          dateStart: deal.dateStart,
          dateEnd: deal.dateEnd
        }]
      }

      worker.events.push({
        id: Date.now(),
        title: deal.name,
        start: deal.dateStart,
        end: deal.dateEnd
      })

      try {
        worker.dealStatistics.push({
          name: deal.name,
          customer: deal.customer,
          dateStart: deal.dateStart,
          dateEnd: deal.dateEnd
        })
      } catch (e) {
        worker.dealStatistics = [{
          name: deal.name,
          customer: deal.customer,
          dateStart: deal.dateStart,
          dateEnd: deal.dateEnd
        }]
      }

      deal.dateStart = deal.dateStart.slice(0, 10) + ', ' + deal.dateStart.slice(11)
      deal.dateEnd = deal.dateEnd.slice(0, 10) + ', ' + deal.dateEnd.slice(11)

      firebase.database().ref('/workers/' + worker.id).set(worker)
        .then(() => {
          this.SET_WORKERS_FROM_SERVER()
        })

      firebase.database().ref('/customers/' + customer.id).set(customer)
        .then(() => {
          this.SET_CUSTOMERS_FROM_SERVER()
        })

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
