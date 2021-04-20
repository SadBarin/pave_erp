<template>
  <AppPopupWrapper :hidden="popupHidden">
    <AppTopPanel header="Добавление сделки">
      <template #nav-buttons>
        <AppButtonIcon icon="add" title="Добавить город" @button-click="addDeal(addedDeal)"/>
        <AppButtonIcon icon="close" title="Закрыть окно" @button-click="$emit('popup-toggle')"/>
      </template>
    </AppTopPanel>

    <div class="add-city-container">
      <AppLineText
        inputID="input-deal-name"
        label="Название: "
        maxLength="20"
        v-model="addedDeal.name"
      />

      <AppSelect
        selectID="select"
        label="Заказчик: "
        v-model="addedDeal.customer"
      >
        <option v-for="element in customers" :key="element.id" :value="element.name">{{element.name}}</option>
      </AppSelect>

      <AppSelect
        selectID="select"
        label="Рабочий: "
        v-model="addedDeal.worker"
      >
        <option v-for="element in workers" :key="element.id" :value="element.surname">{{element.surname}} {{element.name}}</option>
      </AppSelect>
    </div>
  </AppPopupWrapper>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import AppPopupWrapper from '@/components/popups/AppPopupWrapper'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'
import AppLineText from '@/components/AppLineText'
import AppSelect from '../../AppSelect'

export default {
  name: 'DealPopupAdd',

  data () {
    return {
      addedDeal: {}
    }
  },

  computed: {
    ...mapGetters([
      'workers', 'customers'
    ])
  },

  components: {
    AppPopupWrapper,
    AppTopPanel,
    AppButtonIcon,
    AppLineText,
    AppSelect
  },

  props: { popupHidden: Boolean },

  created () {
    this.renewAddedData()

    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
  },

  methods: {
    ...mapMutations([
      'SET_WORKERS_FROM_LOCAL_STORAGE',
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE'
    ]),

    renewAddedData () {
      this.addedDeal = {
        id: Date.now(),
        name: '',
        customer: '',
        worker: '',
        notes: ['Сделка была создана'],
        notesCount: '5'
      }
    },

    addDeal (deal) {
      this.$emit('add-deal', deal)
      this.renewAddedData()
    }
  }
}
</script>

<style scoped>

</style>
