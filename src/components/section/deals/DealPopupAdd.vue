<template>
  <PopupAddWrapper
    :hidden="popupHidden"
    header="Добавление заявки"
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

      <AppLineDate
        dateID="input-deal-date-start"
        label="Начало: "
        v-model="dateStart"
      />

      <AppLineDate
        dateID="input-deal-date-end"
        label="Конец: "
        v-model="dateEnd"
      />

      <AppSelect
        selectID="select"
        label="Заказчик: "
        v-model="addedDeal.customer"
      >
        <option v-for="element in customers" :key="element.id" :value="element.id">{{element.name}}</option>
      </AppSelect>

      <AppSelect
        selectID="select"
        label="Рабочий 1: "
        v-model="addedDeal.worker"
      >
        <option value="">Никого</option>
        <option v-for="element in localWorkers" :key="element.id" :value="element.id">{{element.surname}} {{element.name}}</option>
      </AppSelect>

      <AppSelect
        selectID="select"
        label="Рабочий 2: "
        v-model="addedDeal.worker2"
      >
        <option value="">Никого</option>
        <option v-for="element in localWorkers" :key="element.id" :value="element.id">{{element.surname}} {{element.name}}</option>
      </AppSelect>

      <AppSelect
        selectID="select"
        label="Рабочий 3: "
        v-model="addedDeal.worker3"
      >
        <option value="">Никого</option>
        <option v-for="element in localWorkers" :key="element.id" :value="element.id">{{element.surname}} {{element.name}}</option>
      </AppSelect>

      <AppSelect
        selectID="select"
        label="Рабочий 4: "
        v-model="addedDeal.worker4"
      >
        <option value="">Никого</option>
        <option v-for="element in localWorkers" :key="element.id" :value="element.id">{{element.surname}} {{element.name}}</option>
      </AppSelect>

      <AppSelect
        selectID="select"
        label="Рабочий 5: "
        v-model="addedDeal.worker5"
      >
        <option value="">Никого</option>
        <option v-for="element in localWorkers" :key="element.id" :value="element.id">{{element.surname}} {{element.name}}</option>
      </AppSelect>
    </template>
  </PopupAddWrapper>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import PopupAddWrapper from '../../popups/PopupAddWrapper'
import AppLineText from '../../AppLineText'
import AppLineDate from '../../AppLineDate'
import AppSelect from '../../AppSelect'

export default {
  name: 'DealPopupAdd',

  data () {
    return {
      addedDeal: {},
      localWorkers: '',
      dateStart: '',
      dateEnd: ''
    }
  },

  computed: {
    ...mapGetters([
      'workers',
      'customers'
    ])
  },

  components: {
    PopupAddWrapper,
    AppLineText,
    AppLineDate,
    AppSelect
  },

  props: { popupHidden: Boolean },

  watch: {
    dateStart: function () {
      this.addedDeal.dateStart = this.dateStart
      this.checkWorkers()
    },

    dateEnd: function () {
      this.addedDeal.dateEnd = this.dateEnd
      this.checkWorkers()
    }
  },

  created () {
    this.renewAddedData()

    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()

    this.checkWorkers()
  },

  methods: {
    ...mapMutations([
      'SET_WORKERS_FROM_LOCAL_STORAGE',
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE'
    ]),

    checkWorkers () {
      this.localWorkers = { ...this.workers }
      console.log('local', this.localWorkers)
      console.log('worker', this.workers)

      for (const element in this.localWorkers) {
        if (this.localWorkers[element].fired === 'Да') {
          delete this.localWorkers[element]
        }
      }

      if (this.dateStart !== '') {
        try {
          for (const element in this.localWorkers) {
            for (const event of this.localWorkers[element].events) {
              if (this.localWorkers[element] !== undefined && event.start < this.dateStart) {
                delete this.localWorkers[element]
              }
            }
          }
        } catch (e) {}
      }

      if (this.dateEnd !== '') {
        try {
          for (const element in this.localWorkers) {
            for (const event of this.localWorkers[element].events) {
              if (this.localWorkers[element] !== undefined && event.end < this.dateEnd) {
                delete this.localWorkers[element]
              }
            }
          }
        } catch (e) {}
      }
    },

    renewAddedData () {
      this.addedDeal = {
        id: Date.now(),
        name: 'Новая заявка',

        customer: '',
        worker: '',

        dateStart: '',
        dateEnd: '',

        notes: [`${new Date().toLocaleDateString()} Заявка была создана`],
        notesCount: '5',

        history: [{
          date: `[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}]`,
          info: 'Заявка создана',
          employee: {
            name: '',
            id: ''
          }
        }]
      }
    },

    addDeal (deal) {
      this.$emit('add-deal', deal)
      this.renewAddedData()
    }
  }
}
</script>
