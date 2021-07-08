<template>
  <div id="app-deal">
    <DealPopupAdd
      :popupHidden="popupAddDeal"
      @popup-toggle="popupAddToggle"
      @add-deal="addDeal"
    />

    <AppTopPanel header="Список заявок">
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
          console.log('Заявка удалёна 🗑️')
          this.SET_DEALS_FROM_SERVER()
        })
    },

    addDeal (deal) {
      this.popupAddToggle()
      deal.name = deal.name[0].toUpperCase() + deal.name.substring(1)
      const workersDeal = deal.workers
      const customer = deal.customer = this.customers[deal.customer] ?? null

      for (const workerID of workersDeal) {
        const worker = this.workers[workerID] ?? null
        if (worker !== undefined && worker !== null) {
          worker.events.push({
            id: Date.now(),
            title: deal.name,
            start: deal.dateStart,
            end: deal.dateEnd,
            dealID: deal.id
          })

          try {
            worker.dealStatistics.push({
              name: deal.name,
              customer: deal.customer,
              dateStart: deal.dateStart,
              dateEnd: deal.dateEnd,
              dealID: deal.id
            })
          } catch (e) {
            worker.dealStatistics = [{
              name: deal.name,
              customer: deal.customer,
              dateStart: deal.dateStart,
              dateEnd: deal.dateEnd,
              dealID: deal.id
            }]
          }

          firebase.database().ref('/workers/' + worker.id).set(worker)
            .then(() => {
              this.SET_WORKERS_FROM_SERVER()
            })
        }
      }

      if (customer !== undefined && customer !== null) {
        try {
          customer.dealStatistics.push({
            name: deal.name,
            dateStart: deal.dateStart,
            dateEnd: deal.dateEnd,
            dealID: deal.id
          })
        } catch (e) {
          customer.dealStatistics = [{
            name: deal.name,
            dateStart: deal.dateStart,
            dateEnd: deal.dateEnd,
            dealID: deal.id
          }]
        }

        firebase.database().ref('/customers/' + customer.id).set(customer)
          .then(() => {
            this.SET_CUSTOMERS_FROM_SERVER()
          })

        if (deal.dateStart === '') {
          // eslint-disable-next-line no-undef
          M.toast({ html: 'Начало заявки не задано!' })

          // eslint-disable-next-line no-throw-literal
          throw 'Начало заявки не задано'
        }

        if (deal.dateEnd === '') {
          // eslint-disable-next-line no-undef
          M.toast({ html: 'Конец заявки не задан!' })

          // eslint-disable-next-line no-throw-literal
          throw 'Конец заявки не задан!'
        }

        firebase.database().ref('/deals/' + deal.id).set(deal)
          .then(() => {
            console.log('Заявки добавлена ➕')
            this.popupAddHidden = true
            this.SET_DEALS_FROM_SERVER()
          })
      } else {
        // eslint-disable-next-line no-undef
        M.toast({ html: 'Клиент не задан!' })
      }
    }
  }
}
</script>
