<template>
  <div id="app-edit">
    <AppEditWrapper :header="'Редактор рабочего: ' + editedWorker.surname + ' ' + editedWorker.name">
      <template #nav-buttons>
        <AppButtonIcon icon="save" title="Сохранить и выйти" size="1.8rem" @button-click="saveEditedWorker(editedWorker)"/>
        <AppButtonIcon icon="date_range" size="1.8rem" title="Календарь" @button-click="$router.push({name : 'workerCalendar', params: {id: editedWorker.id}})"/>
        <AppButtonIcon icon="description" title="История" size="1.8rem" @button-click="$router.push({name : 'workerHistory', params: {id: editedWorker.id}})"/>
        <AppButtonIcon icon="transfer_within_a_station" title="Вернуться к рабочим" size="1.8rem" @button-click="editorExit"/>
      </template>

      <template #edit-section>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="account_box" header-text="ФИО"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-surname"
              label="Фамилия: "
              maxLength="20"
              v-model="editedWorker.surname"
            />

            <AppLineText
              inputID="input-name"
              label="Имя: "
              maxLength="20"
              v-model="editedWorker.name"
            />

            <AppLineText
              inputID="input-patronymic"
              label="Отчество: "
              maxLength="20"
              v-model="editedWorker.patronymic"
            />
          </div>
        </div>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="account_box" header-text="Паспортные данные"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-passport-id"
              label="Номер паспорта: "
              maxLength="20"
              v-model="editedWorker.passportID"
            />

            <AppLineText
              inputID="input-passport-date"
              label="Дата выдачи: "
              maxLength="20"
              v-model="editedWorker.passportDate"
            />

            <AppLineText
              inputID="input-passport-issued"
              label="Кем выдан: "
              maxLength="20"
              v-model="editedWorker.passportIssued"
            />

            <!--          <AppLineText-->
            <!--            inputID="input-registration"-->
            <!--            label="Прописка: "-->
            <!--            maxLength="20"-->
            <!--            v-model="editedWorker.registration"-->
            <!--          />-->

            <AppLineText
              inputID="input-passport-address"
              label="Адрес: "
              maxLength="20"
              v-model="editedWorker.address"
            />
          </div>
        </div>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="account_box" header-text="Личные данные"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-birthday"
              label="День рождения: "
              maxLength="20"
              v-model="editedWorker.birthday"
            />

            <AppSelect
              selectID="select-bank"
              label="Пол: "
              v-model="editedWorker.sex"
            >
              <option class="editor-option" value="Мужской">Мужской</option>
              <option class="editor-option" value="Женский">Женский</option>
            </AppSelect>

            <AppLineText
              inputID="input-nationality"
              label="Национальность: "
              maxLength="20"
              v-model="editedWorker.nationality"
            />

            <AppLineText
              inputID="input-medical-book"
              label="Мед.книжка: "
              maxLength="20"
              v-model="editedWorker.medicalBook"
            />

            <AppLineText
              inputID="input-education"
              label="Образование: "
              maxLength="20"
              v-model="editedWorker.education"
            />

            <AppLineText
              inputID="input-university"
              label="ВУЗ: "
              maxLength="20"
              v-model="editedWorker.university"
            />
          </div>
        </div>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="account_box" header-text="Банковские данные"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-surname-card"
              label="Фамилия владельца: "
              maxLength="20"
              v-model="editedWorker.surnameCard"
            />

            <AppLineText
              inputID="input-name-card"
              label="Имя владельца: "
              maxLength="20"
              v-model="editedWorker.nameCard"
            />

            <AppLineText
              inputID="input-patronymic-card"
              label="Отчество владельца: "
              maxLength="20"
              v-model="editedWorker.patronymicCard"
            />

            <AppLineText
              inputID="input-account-card-number"
              label="Номер счёта: "
              maxLength="20"
              v-model="editedWorker.accountNumber"
            />

            <AppSelect
              selectID="select-bank"
              label="Банк: "
              v-model="editedWorker.bank"
            >
              <option class="editor-option" value="СберБанк">СберБанк</option>
              <option class="editor-option" value="Банк ВТБ">Банк ВТБ</option>
              <option class="editor-option" value="Газпромбанк">Газпромбанк</option>
              <option class="editor-option" value="Национальный Клиринговый Центр">Национальный Клиринговый Центр</option>
              <option class="editor-option" value="Альфа-Банк">Альфа-Банк</option>
              <option class="editor-option" value="Россельхозбанк">Россельхозбанк</option>
              <option class="editor-option" value="Московский Кредитный Банк">Московский Кредитный Банк</option>
              <option class="editor-option" value="Банк «Открытие»">Банк «Открытие»</option>
              <option class="editor-option" value="Совкомбанк">Совкомбанк</option>
              <option class="editor-option" value="Росбанк">Росбанк</option>
              <option class="editor-option" value="Тинькофф Банк">Тинькофф Банк</option>
            </AppSelect>
          </div>
        </div>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="account_box" header-text="Контактные данные"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-city"
              label="Город: "
              maxLength="20"
              v-model="editedWorker.city"
            />

            <AppLineText
              inputID="input-home-phone"
              label="Домашний телефон: "
              maxLength="20"
              v-model="editedWorker.homePhone"
            />

            <AppLineText
              inputID="input-mobile-phone"
              label="Основ. моб. телефон: "
              maxLength="20"
              v-model="editedWorker.mobilePhone"
            />

            <AppLineText
              inputID="input-mobile-phone-additional"
              label="Доб. моб. телефон: "
              maxLength="20"
              v-model="editedWorker.mobilePhoneAdditional"
            />

            <AppLineText
              inputID="input-mobile-phone-standby"
              label="Запас. моб. телефон: "
              maxLength="20"
              v-model="editedWorker.mobilePhoneStandby"
            />
          </div>
        </div>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="account_box" header-text="Рабочие данные"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-account-number"
              label="Учёт. номер: "
              maxLength="20"
              v-model="editedWorker.accountNumber"
            />

            <AppLineText
              inputID="input-previous-work"
              label="Прежняя работа: "
              maxLength="20"
              v-model="editedWorker.previousWork"
            />

            <AppLineText
              inputID="input-reason-coming"
              label="Почему пришёл к нам: "
              maxLength="20"
              v-model="editedWorker.reasonComing"
            />

            <AppLineText
              inputID="input-profession"
              label="Профессия 1: "
              maxLength="20"
              v-model="editedWorker.professions"
            />

            <AppLineText
              inputID="input-profession-second"
              label="Профессия 2: "
              maxLength="20"
              v-model="editedWorker.professionsSecond"
            />

            <AppLineText
              inputID="input-profession-third"
              label="Профессия 3: "
              maxLength="20"
              v-model="editedWorker.professionsThird"
            />

            <AppLineText
              inputID="input-night-shift"
              label="Ночная смена: "
              maxLength="20"
              v-model="editedWorker.nightShift"
            />

            <AppLineText
              inputID="input-check-mvd"
              label="Проверка МВД: "
              maxLength="20"
              v-model="editedWorker.checkMVD"
            />

            <AppLineText
              inputID="input-date-interview"
              label="Дата собеседования: "
              maxLength="20"
              v-model="editedWorker.dateInterview"
            />

            <AppLineText
              inputID="input-date-uniform"
              label="Униформа: "
              maxLength="20"
              v-model="editedWorker.uniform"
            />

            <AppLineText
              inputID="input-fired"
              label="Уволен ли: "
              maxLength="20"
              v-model="editedWorker.fired"
            />
          </div>
        </div>
      </template>
    </AppEditWrapper>
  </div>
</template>

<script>
import M from 'materialize-css'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

import AppEditWrapper from '@/components/edit/AppEditWrapper'
import AppButtonIcon from '@/components/AppButtonIcon'
import AppLineText from '@/components/AppLineText'
import AppHeaderIcon from '@/components/AppHeaderIcon'
import AppSelect from '@/components/AppSelect'

export default {
  name: 'EditorWorkers',

  components: {
    AppEditWrapper,
    AppButtonIcon,
    AppLineText,
    AppHeaderIcon,
    AppSelect
  },

  data () {
    return {
      editedWorker: '',
      history: [],
      note: ''
    }
  },

  computed: {
    ...mapGetters([
      'workers',
      'sites',
      'employees',
      'authEmployee'
    ])
  },

  created () {
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })

    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.SET_SITES_FROM_LOCAL_STORAGE()
    this.editedWorker = this.workers[this.$route.params.id]
  },

  methods: {
    ...mapMutations([
      'SET_WORKERS_FROM_SERVER',
      'SET_WORKERS_FROM_LOCAL_STORAGE',
      'SET_SITES_FROM_SERVER',
      'SET_SITES_FROM_LOCAL_STORAGE',
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE'
    ]),

    changeData (newValue, data) {
      this.history.push({
        date: `[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}]`,
        info: `был изменён ${data} на "${newValue}" сотрудником`,
        employee: {
          name: `${this.authEmployee.surname} ${this.authEmployee.name}`,
          id: this.authEmployee.id
        }
      })
    },

    editorExit () {
      this.$router.push('/workers')
    },

    saveEditedWorker (worker) {
      this.editedWorker.editedCount += 1

      if (this.note.length) {
        this.editedWorker.notes.push(`${new Date().toLocaleDateString()}: ${this.note}`)
      }

      try {
        this.history.push({
          date: `[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}]`,
          info: 'Работник сохранён сотрудником',
          employee: {
            name: `${this.authEmployee.surname} ${this.authEmployee.name}`,
            id: this.authEmployee.id
          }
        })
        worker.history.push(...this.history)
      } catch (e) { M.toast({ html: 'Внимание! Данный рабочий не поддерживает историю' }) }

      firebase.database().ref('/workers/' + worker.id).set(worker)
        .then(() => {
          this.SET_WORKERS_FROM_SERVER()
          this.editorExit()
        })
    },

    ageCalc () {
      this.editedWorker.age = (new Date()).getFullYear() - this.editedWorker.birthday.substr(0, 4)
    },

    medicalBookCalc () {
      const year = this.editedWorker.medicalBook.substr(0, 4) - (new Date()).getFullYear()
      this.editedWorker.medicalBookStatus = (year > 0) ? year + ' лет' : 'Просрочена'
    },

    upload () {
      // eslint-disable-next-line no-undef
      const myWidget = cloudinary.createUploadWidget({
        cloudName: 'db6qzfvbw',
        uploadPreset: 'ml_default',
        language: 'ru'
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.editedWorker.UploadImage = result.info.secure_url
        }
      })

      myWidget.open()
    },

    uploadPassport () {
      // eslint-disable-next-line no-undef
      const myWidget = cloudinary.createUploadWidget({
        cloudName: 'db6qzfvbw',
        uploadPreset: 'ml_default',
        language: 'ru'
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.editedWorker.UploadPassport = result.info.secure_url
        }
      }
      )

      myWidget.open()
    },

    uploadNote () {
      // eslint-disable-next-line no-undef
      const myWidget = cloudinary.createUploadWidget({
        cloudName: 'db6qzfvbw',
        uploadPreset: 'ml_default',
        language: 'ru'
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.editedWorker.uploadImageNote = result.info.secure_url
        }
      })

      myWidget.open()
    }
  }
}
</script>
