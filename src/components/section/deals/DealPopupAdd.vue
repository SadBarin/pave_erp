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

      <div v-for="count in workersCount" :key="count">
        <AppSelect
          selectID="select"
          :label="'Рабочий ' + (count) + ': ' "
          @select-change="pushMoreWorkers"
          :value="elementCountNumber(count)"
        >
          <option value="">Никого</option>
          <option v-for="element in localWorkers" :key="element.id" :value="element.id">{{element.surname}} {{element.name}}</option>
        </AppSelect>
      </div>

      <p class="button-add" @click="addMoreWorkers()">Добавить ещё одного рабочего</p>
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
      workersCount: 1,
      addedWorkers: new Set(),
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

    elementCountNumber (count) {
      let i = 0
      for (const element of this.addedWorkers) {
        i++
        if (i === count) {
          console.log(element)
          return element
        }
      }
    },

    addMoreWorkers () {
      this.workersCount++
      this.checkWorkers()
    },

    pushMoreWorkers (workerID) {
      this.addedWorkers.add(workerID)
    },

    checkWorkers () {
      this.localWorkers = { ...this.workers }

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

<style>
  .button-add {
    color: #039be5;
    background: transparent;
    border: none;

    margin-top: 1rem !important;
    padding: 0;

    cursor: pointer;
  }
</style>
