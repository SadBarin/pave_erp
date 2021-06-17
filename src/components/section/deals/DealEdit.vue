<template>
  <div id="app-edit">
    <PopupDeleteWrapper
      :hidePopupStatus="popupRemoveHidden"
      @close-popup="popupRemoveToggle"
      @delete-element="removeDeal(editedDeal)"
      :header="`Удаление заявки ${editedDeal.name}`"
    >
      <template #popup-delete-content>
        После нажатия на иконку корзины будет удалёна заявка <b>{{editedDeal.name}}</b>
      </template>
    </PopupDeleteWrapper>

    <AppEditWrapper :header="'Редактор заявки: ' + editedDeal.name">
      <template #nav-buttons>
        <AppButtonIcon icon="save" size="1.8rem" title="Сохранить и выйти" @button-click="saveEditedDeal(editedDeal)"/>
        <AppButtonIcon icon="" size="1.8rem"/>
        <AppButtonIcon icon="delete" size="1.8rem" title="Удалить" @button-click="popupRemoveToggle"/>
        <AppButtonIcon icon="description" title="История" size="1.8rem" @button-click="$router.push({name : 'dealHistory', params: {id: editedDeal.id}})"/>
        <AppButtonIcon icon="attach_money" size="1.8rem" title="Вернуться" @button-click="editorExit"/>
      </template>

      <template #edit-section>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="import_contacts" header-text="Основные данные"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-city"
              label="Название: "
              maxLength="20"
              v-model="editedDeal.name"
            />

            <AppSelect
              selectID="select"
              label="Заказчик: "
              v-model="customerID"
            >
              <option v-for="element in customers" :key="element.id" :value="element.id">{{element.name}}</option>
            </AppSelect>
          </div>
        </div>

        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="date_range" header-text="Даты"/>

          <div class="edit-block-content">
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
          </div>
        </div>

        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="transfer_within_a_station" header-text="Рабочие"/>

          <div class="edit-block-content">

            <AppSelect
              selectID="select"
              label="Рабочий 1: "
              v-model="worker1ID"
            >
              <option value="">Никого</option>
              <option v-for="element in localWorkers" :key="element.id" :value="element.id">{{element.surname}} {{element.name}}</option>
            </AppSelect>

            <AppSelect
              selectID="select"
              label="Рабочий 2: "
              v-model="worker2ID"
            >
              <option value="">Никого</option>
              <option v-for="element in localWorkers" :key="element.id" :value="element.id">{{element.surname}} {{element.name}}</option>
            </AppSelect>

            <AppSelect
              selectID="select"
              label="Рабочий 3: "
              v-model="worker3ID"
            >
              <option value="">Никого</option>
              <option v-for="element in localWorkers" :key="element.id" :value="element.id">{{element.surname}} {{element.name}}</option>
            </AppSelect>

            <AppSelect
              selectID="select"
              label="Рабочий 4: "
              v-model="worker4ID"
            >
              <option value="">Никого</option>
              <option v-for="element in localWorkers" :key="element.id" :value="element.id">{{element.surname}} {{element.name}}</option>
            </AppSelect>

            <AppSelect
              selectID="select"
              label="Рабочий 5: "
              v-model=worker5ID
            >
              <option value="">Никого</option>
              <option v-for="element in localWorkers" :key="element.id" :value="element.id">{{element.surname}} {{element.name}}</option>
            </AppSelect>
          </div>
        </div>

        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="chrome_reader_mode" header-text="Заметки"/>

          <div class="edit-block-content">
            <AppNumbers
              inputID="input-note-count"
              label="Заметок в списке:  "
              minValue="0"
              maxValue="35"
              maxLength="3"
              v-model="editedDeal.notesCount"
            />

            <AppLineText
              placeholder="Введите новую заметку"
              inputID="input-note"
              label="Новая Заметка: "
              maxLength="35"
              v-model="note"
            />

            <AppNotesList :notes-list="editedDeal.notes" :notes-count="editedDeal.notesCount"/>
          </div>
        </div>
      </template>
    </AppEditWrapper>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapMutations } from 'vuex'

import AppEditWrapper from '@/components/edit/AppEditWrapper'
import AppHeaderIcon from '@/components/AppHeaderIcon'
import AppNotesList from '@/components/edit/AppNotesList'
import AppLineText from '@/components/AppLineText'
import AppNumbers from '@/components/AppNumbers'
import AppButtonIcon from '@/components/AppButtonIcon'
import PopupDeleteWrapper from '@/components/popups/PopupDeleteWrapper'
import AppSelect from '../../AppSelect'
import AppLineDate from '../../AppLineDate'

export default {
  name: 'DealEdit',

  components: {
    AppEditWrapper,
    AppHeaderIcon,
    AppButtonIcon,
    AppLineText,
    AppNumbers,
    AppSelect,
    AppLineDate,
    AppNotesList,
    PopupDeleteWrapper
  },

  data () {
    return {
      popupRemoveHidden: true,
      editedDeal: '',
      note: '',

      customerID: '',

      worker1ID: '',
      worker2ID: '',
      worker3ID: '',
      worker4ID: '',
      worker5ID: '',

      dateStart: '',
      dateEnd: '',
      localWorkers: '',

      historyElement: {
        date: `[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}]`,
        info: 'Заявка просматривалась ',
        employee: {
          name: 'Неизвестный пользователь',
          id: 0
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'deals',
      'employees',
      'authEmployee',
      'workers',
      'customers'
    ])
  },

  watch: {
    dateStart: function () {
      this.editedDeal.dateStart = this.dateStart
      this.checkWorkers()
    },

    dateEnd: function () {
      this.editedDeal.dateEnd = this.dateEnd
      this.checkWorkers()
    }
  },

  created () {
    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
    this.SET_DEALS_FROM_LOCAL_STORAGE()
    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()

    this.editedDeal = this.deals[this.$route.params.id]
    this.customerID = this.editedDeal.customer.id
    this.dateStart = this.editedDeal.dateStart
    this.dateEnd = this.editedDeal.dateEnd

    try {
      this.worker1ID = this.editedDeal.worker.id
    } catch (e) {}

    try {
      this.worker2ID = this.editedDeal.worker2.id
    } catch (e) {}

    try {
      this.worker3ID = this.editedDeal.worker3.id
    } catch (e) {}
    try {
      this.worker4ID = this.editedDeal.worker4.id
    } catch (e) {}

    try {
      this.worker5ID = this.editedDeal.worker5.id
    } catch (e) {}

    this.checkWorkers()

    // this.historyElement.employee = {
    //   name: `${this.authEmployee.surname} ${this.authEmployee.name}`,
    //   id: this.authEmployee.id
    // }
  },

  methods: {
    ...mapMutations([
      'SET_DEALS_FROM_SERVER',
      'SET_DEALS_FROM_LOCAL_STORAGE',
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE',
      'SET_WORKERS_FROM_LOCAL_STORAGE',
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE',
      'SET_CUSTOMERS_FROM_SERVER',
      'SET_WORKERS_FROM_SERVER'
    ]),

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
                if (event.dealID !== this.editedDeal.id) {
                  delete this.localWorkers[element]
                }
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
                if (event.dealID !== this.editedDeal.id) {
                  delete this.localWorkers[element]
                }
              }
            }
          }
        } catch (e) {}
      }
    },

    popupRemoveToggle () {
      this.popupRemoveHidden = !this.popupRemoveHidden
    },

    removeDeal (deal) {
      this.popupRemoveToggle()
      this.editorExit()

      firebase.database().ref('/deals/' + deal.id).remove()
        .then(() => {
          console.log('Заявка удалёна 🗑️')
          this.SET_DEALS_FROM_SERVER()
        })
    },

    editorExit () {
      this.$router.push('/deals')
    },

    saveNewNote () {
      if (this.note.length) {
        try {
          this.editedDeal.notes.push(`${new Date().toLocaleDateString()}: ${this.note}`)
        } catch (error) {
          this.editedDeal.notes = []
          this.editedDeal.notes.push(`${new Date().toLocaleDateString()}: ${this.note}`)
        }
      }
    },

    getNewHistoryElement (info) {
      const localHistoryElement = this.historyElement
      localHistoryElement.info = info

      return localHistoryElement
    },

    saveEditedDeal (deal) {
      this.saveNewNote()

      if (this.customerID !== '') {
        const localCustomers = this.customers
        localCustomers[this.editedDeal.customer.id].dealStatistics =
          localCustomers[this.editedDeal.customer.id]
            .dealStatistics.filter((element) => element.dealID !== this.editedDeal.id)

        localCustomers[this.customerID].dealStatistics.push({
          name: this.editedDeal.name,
          dateStart: this.editedDeal.dateStart,
          dateEnd: this.editedDeal.dateEnd,
          dealID: this.editedDeal.id
        })

        firebase.database().ref('/customers/').set(localCustomers)
          .then(() => {
            this.SET_CUSTOMERS_FROM_SERVER()
          })

        this.editedDeal.customer = this.customers[this.customerID]
      }

      if (this.worker1ID !== '') {
        try {
          const localWorkerID = this.deals[[this.editedDeal.id]].worker.id
          const localWorker = this.workers[localWorkerID]
          localWorker.dealStatistics = localWorker.dealStatistics.filter((element) => element.dealID !== this.editedDeal.id)
          localWorker.events = localWorker.events.filter((element) => element.dealID !== this.editedDeal.id)

          console.log(localWorker)

          firebase.database().ref('/workers/' + localWorker.id).set(localWorker)
            .then(() => {
              this.SET_WORKERS_FROM_SERVER()
            })
        } catch (e) {}

        const localWorker2 = this.workers[this.worker1ID]
        localWorker2.dealStatistics.push({
          name: deal.name,
          customer: deal.customer,
          dateStart: deal.dateStart,
          dateEnd: deal.dateEnd,
          dealID: deal.id
        })
        localWorker2.events.push({
          id: Date.now(),
          title: deal.name,
          start: deal.dateStart,
          end: deal.dateEnd,
          dealID: deal.id
        })

        firebase.database().ref('/workers/' + localWorker2.id).set(localWorker2)
          .then(() => {
            this.SET_WORKERS_FROM_SERVER()
          })

        this.editedDeal.worker = this.workers[this.worker1ID]
      }
      if (this.worker2ID !== '') {
        try {
          const localWorkerID = this.deals[[this.editedDeal.id]].worker2.id
          const localWorker = this.workers[localWorkerID]
          localWorker.dealStatistics = localWorker.dealStatistics.filter((element) => element.dealID !== this.editedDeal.id)
          localWorker.events = localWorker.events.filter((element) => element.dealID !== this.editedDeal.id)

          firebase.database().ref('/workers/' + localWorker.id).set(localWorker)
            .then(() => {
              this.SET_WORKERS_FROM_SERVER()
            })
        } catch (e) {}

        const localWorker2 = this.workers[this.worker2ID]
        localWorker2.dealStatistics.push({
          name: deal.name,
          customer: deal.customer,
          dateStart: deal.dateStart,
          dateEnd: deal.dateEnd,
          dealID: deal.id
        })
        localWorker2.events.push({
          id: Date.now(),
          title: deal.name,
          start: deal.dateStart,
          end: deal.dateEnd,
          dealID: deal.id
        })

        firebase.database().ref('/workers/' + localWorker2.id).set(localWorker2)
          .then(() => {
            this.SET_WORKERS_FROM_SERVER()
          })

        this.editedDeal.worker2 = this.workers[this.worker2ID]
      }
      if (this.worker3ID !== '') {
        try {
          const localWorkerID = this.deals[[this.editedDeal.id]].worker3.id
          const localWorker = this.workers[localWorkerID]
          localWorker.dealStatistics = localWorker.dealStatistics.filter((element) => element.dealID !== this.editedDeal.id)
          localWorker.events = localWorker.events.filter((element) => element.dealID !== this.editedDeal.id)

          firebase.database().ref('/workers/' + localWorker.id).set(localWorker)
            .then(() => {
              this.SET_WORKERS_FROM_SERVER()
            })
        } catch (e) {}

        const localWorker2 = this.workers[this.worker3ID]
        localWorker2.dealStatistics.push({
          name: deal.name,
          customer: deal.customer,
          dateStart: deal.dateStart,
          dateEnd: deal.dateEnd,
          dealID: deal.id
        })
        localWorker2.events.push({
          id: Date.now(),
          title: deal.name,
          start: deal.dateStart,
          end: deal.dateEnd,
          dealID: deal.id
        })

        firebase.database().ref('/workers/' + localWorker2.id).set(localWorker2)
          .then(() => {
            this.SET_WORKERS_FROM_SERVER()
          })

        this.editedDeal.worker3 = this.workers[this.worker3ID]
      }
      if (this.worker4ID !== '') {
        try {
          const localWorkerID = this.deals[[this.editedDeal.id]].worker4.id
          const localWorker = this.workers[localWorkerID]
          localWorker.dealStatistics = localWorker.dealStatistics.filter((element) => element.dealID !== this.editedDeal.id)
          localWorker.events = localWorker.events.filter((element) => element.dealID !== this.editedDeal.id)

          firebase.database().ref('/workers/' + localWorker.id).set(localWorker)
            .then(() => {
              this.SET_WORKERS_FROM_SERVER()
            })
        } catch (e) {}

        const localWorker2 = this.workers[this.worker4ID]
        localWorker2.dealStatistics.push({
          name: deal.name,
          customer: deal.customer,
          dateStart: deal.dateStart,
          dateEnd: deal.dateEnd,
          dealID: deal.id
        })
        localWorker2.events.push({
          id: Date.now(),
          title: deal.name,
          start: deal.dateStart,
          end: deal.dateEnd,
          dealID: deal.id
        })

        firebase.database().ref('/workers/' + localWorker2.id).set(localWorker2)
          .then(() => {
            this.SET_WORKERS_FROM_SERVER()
          })

        this.editedDeal.worker4 = this.workers[this.worker4ID]
      }
      if (this.worker5ID !== '') {
        try {
          const localWorkerID = this.deals[[this.editedDeal.id]].worker5.id
          const localWorker = this.workers[localWorkerID]
          localWorker.dealStatistics = localWorker.dealStatistics.filter((element) => element.dealID !== this.editedDeal.id)
          localWorker.events = localWorker.events.filter((element) => element.dealID !== this.editedDeal.id)

          firebase.database().ref('/workers/' + localWorker.id).set(localWorker)
            .then(() => {
              this.SET_WORKERS_FROM_SERVER()
            })
        } catch (e) {}

        const localWorker2 = this.workers[this.worker5ID]
        localWorker2.dealStatistics.push({
          name: deal.name,
          customer: deal.customer,
          dateStart: deal.dateStart,
          dateEnd: deal.dateEnd,
          dealID: deal.id
        })
        localWorker2.events.push({
          id: Date.now(),
          title: deal.name,
          start: deal.dateStart,
          end: deal.dateEnd,
          dealID: deal.id
        })

        firebase.database().ref('/workers/' + localWorker2.id).set(localWorker2)
          .then(() => {
            this.SET_WORKERS_FROM_SERVER()
          })

        this.editedDeal.worker5 = this.workers[this.worker5ID]
      }

      deal.history.push(this.getNewHistoryElement('Заявка была изменена'))

      firebase.database().ref('/deals/' + deal.id).set(deal)
        .then(() => {
          this.SET_DEALS_FROM_SERVER()
          this.editorExit()
          // eslint-disable-next-line no-undef
          M.toast({ html: 'Данные сохранены!' })
        })
    }
  }
}
</script>
