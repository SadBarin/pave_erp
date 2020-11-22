<template>
  <div>
    <template v-if="overlayShow">
      <div class="popup-overlay">
        <form class="card auth-card popup">
          <div class="card-content">
            <span class="card-title">Выйти?<br></span>
          </div>

          <div class="card-action btn-popup">
            <button
              type="submit"
              class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
              v-on:click="editorExit(workers)"
            >
              <i class="material-icons">check</i> Да
            </button>

            <button
              type="submit"
              class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
              v-on:click="overlayHidden"
            >
              <i class="material-icons">clear</i> Нет
            </button>
          </div>
        </form>
      </div>
    </template>

    <div class="page-title">
      <h3>Редактор рабочего "{{editedName}} {{editedSurname}}"</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form>
              <div class="form-content">
                <div class="input-field input-field-blue">
                  <input
                    id="name"
                    type="text"
                    v-model.trim="editedName"
                  >
                  <label class="active" for="name">Имя</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="surname"
                    type="text"
                    v-model.trim="editedSurname"
                  >
                  <label class="active" for="surname">Фамилия</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="patronymic"
                    type="text"
                    v-model.trim="editedPatronymic"
                  >
                  <label class="active" for="patronymic">Отчество</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="accountNumber"
                    type="text"
                    v-model.trim="editedAccountNumber"
                  >
                  <label class="active" for="accountNumber">Учётный номер</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="number"
                    type="text"
                    v-model.trim="editedNumber"
                  >
                  <label class="active" for="number">Номер</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="nameCard"
                    type="text"
                    v-model.trim="editedNameCard"
                  >
                  <label class="active" for="nameCard">Имя Держателя Карты</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="surnameCard"
                    type="text"
                    v-model.trim="editedSurnameCard"
                  >
                  <label class="active" for="surnameCard">Фамилия Держателя Карты</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="patronymicCard"
                    type="text"
                    v-model.trim="editedPatronymicCard"
                  >
                  <label class="active" for="patronymicCard">Отчество Держателя Карты</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="accountNumberCard"
                    type="text"
                    v-model.trim="editedAccountNumberCard"
                  >
                  <label class="active" for="accountNumberCard">Номер Счёта</label>
                </div>

                <div class="input-field">
                  <select
                    class="browser-default"
                    id="bank"
                    v-model.trim="editedBank"
                  >
                    <option value="1">СберБанк</option>
                    <option value="2">Банк ВТБ</option>
                    <option value="3">Газпромбанк</option>
                    <option value="4">Национальный Клиринговый Центр</option>
                    <option value="5">Альфа-Банк</option>
                    <option value="6">Россельхозбанк</option>
                    <option value="7">Московский Кредитный Банк</option>
                    <option value="8">Банк «Открытие»</option>
                    <option value="9">Совкомбанк</option>
                    <option value="10">Росбанк</option>
                    <option value="11">Тинькофф Банк</option>
                  </select>
                  <label class="active">Банк</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    class="datepicker"
                    id="birthday"
                    type="text"
                    v-model.trim="editedBirthday"
                  >
                  <label class="active" for="birthday">Дата Рождения</label>
                </div>

                <div class="input-field">
                  <select
                    class="browser-default"
                    id="sex"
                    v-model.trim="editedSex"
                  >
                    <option value="1">Мужской</option>
                    <option value="2">Женский</option>
                  </select>
                  <label class="active">Биологический Пол</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="nationality"
                    type="text"
                    v-model.trim="editedNationality"
                  >
                  <label class="active" for="nationality">Национальность</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="passportID"
                    type="text"
                    v-model.trim="editedPassportID"
                  >
                  <label class="active" for="PassportID">Номер Паспорта</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="passportDate"
                    class="datepicker"
                    type="text"
                    v-model.trim="editedPassportDate"
                  >
                  <label class="active" for="passportDate">Дата Выдачи Паспорта</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="passportIssued"
                    type="text"
                    v-model.trim="editedPassportIssued"
                  >
                  <label class="active" for="passportIssued">Кем выдан</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="registration"
                    type="text"
                    v-model.trim="editedRegistration"
                  >
                  <label class="active" for="registration">Прописка</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="address"
                    type="text"
                    v-model.trim="editedAddress"
                  >
                  <label class="active" for="address">Адрес</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="homePhone"
                    type="text"
                    v-model.trim="editedHomePhone"
                  >
                  <label class="active" for="homePhone">Телефон Домашний</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="mobilePhone"
                    type="text"
                    v-model.trim="editedMobilePhone"
                  >
                  <label class="active" for="mobilePhone">Телефон Мобильный</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="medicalBook"
                    type="text"
                    v-model.trim="editedMedicalBook"
                  >
                  <label class="active" for="medicalBook">Медицинская Книга</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="education"
                    type="text"
                    v-model.trim="editedEducation"
                  >
                  <label class="active" for="education">Образование</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="university"
                    type="text"
                    v-model.trim="editedUniversity"
                  >
                  <label class="active" for="university">ВУЗ</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="previousWork"
                    type="text"
                    v-model.trim="editedPreviousWork"
                  >
                  <label class="active" for="previousWork">Прежняя Работа</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="reasonComing"
                    type="text"
                    v-model.trim="editedReasonComing"
                  >
                  <label class="active" for="reasonComing">Почему пришел к нам</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="professions"
                    type="text"
                    v-model.trim="editedProfessions"
                  >
                  <label class="active" for="professions">Профессии</label>
                </div>

                <div class="input-field">
                  <select
                    id="nightShift"
                    class="browser-default"
                    v-model.trim="editedNightShift"
                  >
                    <option value="1">Да</option>
                    <option value="2">Нет</option>
                  </select>
                  <label class="active">Ночная</label>
                </div>

                <div class="input-field">
                  <select
                    id="checkMVD"
                    class="browser-default"
                    v-model.trim="editedCheckMVD"
                  >
                    <option value="1">Да</option>
                    <option value="2">Нет</option>
                  </select>
                  <label class="active">Проверка МВД</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="dateInterview"
                    class="datepicker"
                    type="text"
                    v-model.trim="editedDateInterview"
                  >
                  <label class="active" for="dateInterview">Дата Собеседования</label>
                </div>

                <div class="input-field input-field-blue">
                  <input
                    id="uniform"
                    type="text"
                    v-model.trim="editedUniform"
                  >
                  <label class="active" for="uniform">Униформа</label>
                </div>

                <div class="input-field">
                  <select
                    id="fired"
                    class="browser-default"
                    v-model.trim="editedFired"
                  >
                    <option value="1">Да</option>
                    <option value="2">Нет</option>
                  </select>
                  <label class="active">Уволен</label>
                </div>
              </div>

              <div class="button-container">
                <button
                  class="btn waves-effect waves-light auth-submit blue darken-1"
                  v-on:click="editorCollection(workers)"
                >
                  <i class="material-icons">create</i> Редактировать
                </button>

                <button
                  class="btn waves-effect waves-light auth-submit blue darken-1"
                  v-on:click.prevent="overlayVisibility"
                >
                  <i class="material-icons">arrow_back</i> Вернуться назад
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import M from 'materialize-css'

export default {
  name: 'AddWorkers',
  data () {
    return {
      overlayShow: false,

      workers: [{}],

      editedName: '',
      editedSurname: '',
      editedPatronymic: '',
      editedAccountNumber: '',
      editedNumber: '',
      editedNameCard: '',
      editedSurnameCard: '',
      editedPatronymicCard: '',
      editedAccountNumberCard: '',
      editedBank: '',
      editedBirthday: '',
      editedSex: '',
      editedNationality: '',
      editedPassportID: '',
      editedPassportDate: '',
      editedPassportIssued: '',
      editedRegistration: '',
      editedAddress: '',
      editedHomePhone: '',
      editedMobilePhone: '',
      editedMedicalBook: '',
      editedEducation: '',
      editedUniversity: '',
      editedPreviousWork: '',
      editedReasonComing: '',
      editedProfessions: '',
      editedNightShift: '',
      editedCheckMVD: '',
      editedDateInterview: '',
      editedUniform: '',
      editedFired: '',
      editedEdited: false
    }
  },
  methods: {
    overlayVisibility () {
      this.overlayShow = true
    },

    overlayHidden () {
      this.overlayShow = false
    },

    validate () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
    },

    searchIndex (collection) {
      const object = collection.filter(element => element.edited !== false)
      return collection.findIndex((element) => element.id === object[0].id)
    },

    editorExit (collection) {
      collection[this.searchIndex(collection)].edited = false
      this.saveCollection(this.workers, 'workers')
      this.$router.push('/workers')
    },

    outputCollection (collection, additionalCollection) {
      this.editedName = collection[this.searchIndex(collection)].name
      this.editedSurname = collection[this.searchIndex(collection)].surname
      this.editedPatronymic = collection[this.searchIndex(collection)].patronymic
      this.editedAccountNumber = collection[this.searchIndex(collection)].accountNumber
      this.editedNumber = collection[this.searchIndex(collection)].number
      this.editedNameCard = collection[this.searchIndex(collection)].nameCard
      this.editedSurnameCard = collection[this.searchIndex(collection)].surnameCard
      this.editedPatronymicCard = collection[this.searchIndex(collection)].patronymicCard
      this.editedAccountNumberCard = collection[this.searchIndex(collection)].accountNumberCard
      this.editedBank = collection[this.searchIndex(collection)].bank
      this.editedBirthday = collection[this.searchIndex(collection)].birthday
      this.editedSex = collection[this.searchIndex(collection)].sex
      this.editedNationality = collection[this.searchIndex(collection)].nationality
      this.editedPassportID = collection[this.searchIndex(collection)].passportID
      this.editedPassportDate = collection[this.searchIndex(collection)].passportDate
      this.editedPassportIssued = collection[this.searchIndex(collection)].passportIssued
      this.editedRegistration = collection[this.searchIndex(collection)].registration
      this.editedAddress = collection[this.searchIndex(collection)].address
      this.editedHomePhone = collection[this.searchIndex(collection)].homePhone
      this.editedMobilePhone = collection[this.searchIndex(collection)].mobilePhone
      this.editedMedicalBook = collection[this.searchIndex(collection)].medicalBook
      this.editedEducation = collection[this.searchIndex(collection)].education
      this.editedUniversity = collection[this.searchIndex(collection)].university
      this.editedPreviousWork = collection[this.searchIndex(collection)].previousWork
      this.editedReasonComing = collection[this.searchIndex(collection)].reasonComing
      this.editedProfessions = collection[this.searchIndex(collection)].professions
      this.editedNightShift = collection[this.searchIndex(collection)].nightShift
      this.editedCheckMVD = collection[this.searchIndex(collection)].checkMVD
      this.editedDateInterview = collection[this.searchIndex(collection)].dateInterview
      this.editedUniform = collection[this.searchIndex(collection)].uniform
      this.editedFired = collection[this.searchIndex(collection)].fired
    },

    editorCollection (collection, additionalCollection) {
      collection[this.searchIndex(collection)].name = this.editedName
      collection[this.searchIndex(collection)].surname = this.editedSurname
      collection[this.searchIndex(collection)].patronymic = this.editedPatronymic
      collection[this.searchIndex(collection)].accountNumber = this.editedAccountNumber
      collection[this.searchIndex(collection)].number = this.editedNumber
      collection[this.searchIndex(collection)].nameCard = this.editedNameCard
      collection[this.searchIndex(collection)].surnameCard = this.editedSurnameCard
      collection[this.searchIndex(collection)].patronymicCard = this.editedPatronymicCard
      collection[this.searchIndex(collection)].accountNumberCard = this.editedAccountNumberCard
      collection[this.searchIndex(collection)].bank = this.editedBank
      collection[this.searchIndex(collection)].birthday = this.editedBirthday
      collection[this.searchIndex(collection)].sex = this.editedSex
      collection[this.searchIndex(collection)].nationality = this.editedNationality
      collection[this.searchIndex(collection)].passportID = this.editedPassportID
      collection[this.searchIndex(collection)].passportDate = this.editedPassportDate
      collection[this.searchIndex(collection)].passportIssued = this.editedPassportIssued
      collection[this.searchIndex(collection)].registration = this.editedRegistration
      collection[this.searchIndex(collection)].address = this.editedAddress
      collection[this.searchIndex(collection)].homePhone = this.editedHomePhone
      collection[this.searchIndex(collection)].mobilePhone = this.editedMobilePhone
      collection[this.searchIndex(collection)].medicalBook = this.editedMedicalBook
      collection[this.searchIndex(collection)].education = this.editedEducation
      collection[this.searchIndex(collection)].university = this.editedUniversity
      collection[this.searchIndex(collection)].previousWork = this.editedPreviousWork
      collection[this.searchIndex(collection)].reasonComing = this.editedReasonComing
      collection[this.searchIndex(collection)].professions = this.editedProfessions
      collection[this.searchIndex(collection)].nightShift = this.editedNightShift
      collection[this.searchIndex(collection)].checkMVD = this.editedCheckMVD
      collection[this.searchIndex(collection)].dateInterview = this.editedDateInterview
      collection[this.searchIndex(collection)].uniform = this.editedUniform
      collection[this.searchIndex(collection)].fired = this.editedFired

      this.editorExit(collection)
    },

    saveCollection (collection, collectionName) {
      const parsed = JSON.stringify(collection)
      localStorage.setItem(collectionName, parsed)
    },

    updateCollection (collectionName) {
      if (localStorage.getItem(collectionName)) {
        try {
          this.workers = JSON.parse(localStorage.getItem(collectionName))
        } catch (e) {
          localStorage.removeItem(collectionName)
        }
      }
    }
  },
  mounted () {
    this.updateCollection('workers')

    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })

    this.outputCollection(this.workers)
  }
}
</script>

<style scoped>
  .row .col {
    padding: 0;
  }

  .btn {
    margin-right: 10px;
  }

  form {
    width: 100%;
  }

  .form-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .input-field {
    width: 48%;
  }

  select {
    border: none !important;
    border-bottom: 1px solid #9E9E9E !important;
    padding: 0 !important;
    appearance: none !important;
  }

  option {
    margin-left: 10px !important;
  }

  select:focus {
    outline: none !important;
  }
</style>
