<template>
  <div>
    <PopupAddWrapper
      :hidden="popupHidden"
      header="Фильтрация"
      @popup-add="filterDate(start, end)"
      @popup-close="popupToggle"
    >
      <template #popup-add-content>
        <AppLineDate
          dateID="input-deal-date-start"
          label="Начало: "
          v-model="start"
        />

        <AppLineDate
          dateID="input-deal-date-end"
          label="Конец: "
          v-model="end"
        />
      </template>
    </PopupAddWrapper>

    <AppTopPanel :header="`Статистика сделок клиента ${customer.name}`">
      <template #nav-buttons>
        <CustomerNavigation :customer="customer" @show-period-popup="popupToggle"/>
      </template>
    </AppTopPanel>

    <section>
      <AppTableWrapper>
        <template #table-content>
          <AppTableWrapperRow>
            <template #row-content>
              <th>Сделка</th>
              <th>Начало</th>
              <th>Конец</th>
            </template>
          </AppTableWrapperRow>

          <template v-for="(element, i) in customer.dealStatistics">
            <AppTableWrapperRow :key="i">
              <template #row-content>
                <td>{{element.name}}</td>
                <td>{{element.dateStart.slice(0, 10) + ', ' + element.dateStart.slice(11)}}</td>
                <td>{{element.dateEnd.slice(0, 10) + ', ' + element.dateStart.slice(11)}}</td>
              </template>
            </AppTableWrapperRow>
          </template>
        </template>
      </AppTableWrapper>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import AppTopPanel from '../../AppTopPanel'
import PopupAddWrapper from '../../popups/PopupAddWrapper'
import AppLineDate from '../../AppLineDate'
import CustomerNavigation from './CustomerNavigation'
import AppTableWrapper from '../../table/AppTableWrapper'
import AppTableWrapperRow from '../../table/AppTableWrapperRow'

export default {
  name: 'CustomerStatisticsTable',

  components: {
    AppTopPanel,
    PopupAddWrapper,
    CustomerNavigation,
    AppTableWrapper,
    AppTableWrapperRow,
    AppLineDate
  },

  data () {
    return {
      customer: '',
      start: '',
      end: '',

      popupHidden: true
    }
  },

  computed: {
    ...mapGetters([
      'customers'
    ])
  },

  created () {
    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
    this.customer = this.customers[this.$route.params.id]
  },

  methods: {
    ...mapMutations([
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE'
    ]),

    popupToggle () {
      this.popupHidden = !this.popupHidden
    },

    filterDate (start, end) {
      this.popupToggle()

      this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
      const dateCollection = this.customers[this.$route.params.id].dealStatistics
      const buffer = []

      for (const element of dateCollection) {
        if (element.dateStart > start && element.dateStart < end) buffer.push(element)
      }

      this.customer.dealStatistics = buffer
    }
  }
}
</script>
