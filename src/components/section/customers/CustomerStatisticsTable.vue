<template>
  <div>
    <AppTopPanel :header="`Статистика сделок клиента ${customer.name}`">
      <template #nav-buttons>
        <CustomerNavigation :customer="customer"/>
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
import CustomerNavigation from './CustomerNavigation'
import AppTableWrapper from '../../table/AppTableWrapper'
import AppTableWrapperRow from '../../table/AppTableWrapperRow'

export default {
  name: 'CustomerStatisticsTable',

  components: {
    AppTopPanel,
    CustomerNavigation,
    AppTableWrapper,
    AppTableWrapperRow
  },

  data () {
    return {
      customer: '',

      popupRemoveHidden: true
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

    popupRemoveToggle () {
      this.popupRemoveHidden = !this.popupRemoveHidden
    }
  }
}
</script>
