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
      const worker = deal.worker = this.workers[deal.worker] ?? null
      const worker2 = deal.worker2 = this.workers[deal.worker2] ?? null
      const worker3 = deal.worker3 = this.workers[deal.worker3] ?? null
      const worker4 = deal.worker4 = this.workers[deal.worker4] ?? null
      const worker5 = deal.worker5 = this.workers[deal.worker5] ?? null
      const customer = deal.customer = this.customers[deal.customer] ?? null

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

        if (worker2 !== undefined && worker2 !== null) {
          worker2.events.push({
            id: Date.now(),
            title: deal.name,
            start: deal.dateStart,
            end: deal.dateEnd,
            dealID: deal.id
          })

          try {
            worker2.dealStatistics.push({
              name: deal.name,
              customer: deal.customer,
              dateStart: deal.dateStart,
              dateEnd: deal.dateEnd,
              dealID: deal.id
            })
          } catch (e) {
            worker2.dealStatistics = [{
              name: deal.name,
              customer: deal.customer,
              dateStart: deal.dateStart,
              dateEnd: deal.dateEnd,
              dealID: deal.id
            }]
          }

          firebase.database().ref('/workers/' + worker2.id).set(worker2)
            .then(() => {
              this.SET_WORKERS_FROM_SERVER()
            })
        }

        if (worker3 !== undefined && worker3 !== null) {
          worker3.events.push({
            id: Date.now(),
            title: deal.name,
            start: deal.dateStart,
            end: deal.dateEnd,
            dealID: deal.id
          })

          try {
            worker3.dealStatistics.push({
              name: deal.name,
              customer: deal.customer,
              dateStart: deal.dateStart,
              dateEnd: deal.dateEnd,
              dealID: deal.id
            })
          } catch (e) {
            worker3.dealStatistics = [{
              name: deal.name,
              customer: deal.customer,
              dateStart: deal.dateStart,
              dateEnd: deal.dateEnd,
              dealID: deal.id
            }]
          }

          firebase.database().ref('/workers/' + worker3.id).set(worker3)
            .then(() => {
              this.SET_WORKERS_FROM_SERVER()
            })
        }

        if (worker4 !== undefined && worker4 !== null) {
          worker4.events.push({
            id: Date.now(),
            title: deal.name,
            start: deal.dateStart,
            end: deal.dateEnd,
            dealID: deal.id
          })

          try {
            worker4.dealStatistics.push({
              name: deal.name,
              customer: deal.customer,
              dateStart: deal.dateStart,
              dateEnd: deal.dateEnd,
              dealID: deal.id
            })
          } catch (e) {
            worker4.dealStatistics = [{
              name: deal.name,
              customer: deal.customer,
              dateStart: deal.dateStart,
              dateEnd: deal.dateEnd,
              dealID: deal.id
            }]
          }

          firebase.database().ref('/workers/' + worker4.id).set(worker4)
            .then(() => {
              this.SET_WORKERS_FROM_SERVER()
            })
        }

        if (worker5 !== undefined && worker5 !== null) {
          worker5.events.push({
            id: Date.now(),
            title: deal.name,
            start: deal.dateStart,
            end: deal.dateEnd,
            dealID: deal.id
          })

          try {
            worker5.dealStatistics.push({
              name: deal.name,
              customer: deal.customer,
              dateStart: deal.dateStart,
              dateEnd: deal.dateEnd,
              dealID: deal.id
            })
          } catch (e) {
            worker5.dealStatistics = [{
              name: deal.name,
              customer: deal.customer,
              dateStart: deal.dateStart,
              dateEnd: deal.dateEnd,
              dealID: deal.id
            }]
          }

          firebase.database().ref('/workers/' + worker5.id).set(worker5)
            .then(() => {
              this.SET_WORKERS_FROM_SERVER()
            })
        }

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
