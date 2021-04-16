<template>
  <AppPopupWrapper :hidden="popupHidden">
    <AppTopPanel header="Добавление рабочего">
      <template #nav-buttons>
        <AppButtonIcon icon="add" title="Добавить" @button-click="createWorker()"/>
        <AppButtonIcon icon="close" title="Закрыть окно" @button-click="$emit('popup-toggle')"/>
      </template>
    </AppTopPanel>

    <div class="add-city-container">
      <AppLineText
        class="input-add"
        type="text"
        maxLength="25"
        v-model.trim="surname"
        label="Фамилия: "
      />
    </div>
  </AppPopupWrapper>
</template>

<script>
import AppPopupWrapper from '@/components/popups/AppPopupWrapper'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'
import AppLineText from '@/components/AppLineText'

export default {
  name: 'WorkerPopupAdd',

  data () {
    return {
      surname: 'Рабочий'
    }
  },

  components: {
    AppPopupWrapper,
    AppTopPanel,
    AppButtonIcon,
    AppLineText
  },

  props: {
    popupHidden: Boolean,
    workers: Object
  },

  methods: {
    createWorker () {
      const newWorker = {
        id: Date.now(),
        name: 'Новый',
        surname: this.surname,
        patronymic: '',
        accountNumber: Date.now(),
        nameCard: 'Новый',
        surnameCard: 'Рабочий',
        patronymicCard: '',
        accountNumberCard: '',
        bank: 'СберБанк',
        age: '',
        sex: 'Мужской',
        city: '',
        nationality: '',
        passportID: '',
        passportDate: '',
        passportIssued: '',
        registration: '',
        address: '',
        homePhone: '',
        mobilePhone: '',
        medicalBook: '',
        education: '',
        university: '',
        previousWork: '',
        reasonComing: '',
        professions: '',
        nightShift: 'Нет',
        checkMVD: 'Да',
        dateInterview: '',
        uniform: '',
        fired: 'Нет',
        edited: false,
        editedCount: 0,
        history: [{
          date: `[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}]`,
          info: 'Работник создан сотрудником ',
          employee: {
            name: '',
            id: ''
          }
        }],
        events: [{ id: Date.now(), title: 'Карточка создана', date: new Date().toJSON() }],
        notes: [`${new Date().toLocaleDateString()}: Рабочий создан`]
      }

      this.$emit('add-worker', newWorker)
      this.$emit('popup-toggle')
      this.surname = 'Рабочий'
    }
  }
}
</script>
