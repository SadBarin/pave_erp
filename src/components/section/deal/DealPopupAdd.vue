<template>
  <PopupAddWrapper
    :hidden="popupHidden"
    header="Добавление сделки"
    @popup-add="addDeal(addedDeal)"
    @popup-close="$emit('popup-toggle')"
  >
    <template #popup-add-content>
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
    </template>
  </PopupAddWrapper>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import PopupAddWrapper from '../../popups/PopupAddWrapper'
import AppLineText from '../../AppLineText'
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
    PopupAddWrapper,
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
