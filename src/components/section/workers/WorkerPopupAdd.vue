<template>
  <PopupAddWrapper
    :hidden="popupHidden"
    header="Добавление рабочего"
    @popup-add="createWorker()"
    @popup-close="$emit('popup-toggle')"
  >
    <template #popup-add-content>
      <AppLineText
        class="input-surname"
        type="text"
        maxLength="25"
        v-model.trim="surname"
        label="Фамилия: "
      />

      <AppLineText
        class="input-name"
        type="text"
        maxLength="25"
        v-model.trim="name"
        label="Имя "
      />

      <AppLineText
        class="input-phone"
        type="text"
        maxLength="25"
        v-model.trim="mobilePhone"
        label="Телефон "
      />
    </template>
  </PopupAddWrapper>
</template>

<script>
import PopupAddWrapper from '../../popups/PopupAddWrapper'
import AppLineText from '@/components/AppLineText'

export default {
  name: 'WorkerPopupAdd',

  data () {
    return {
      surname: 'Новый',
      name: 'Рабочий',
      mobilePhone: '+7'
    }
  },

  components: {
    PopupAddWrapper,
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
        name: this.name,
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
        mobilePhone: this.mobilePhone,
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
        dealStatistics: [{
          name: 'Сделка-заглушка',
          customer: { name: 'Клиентинк' },
          dateStart: '2021-05-07, 18:11',
          dateEnd: '2021-05-07, 18:11'
        }],
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
