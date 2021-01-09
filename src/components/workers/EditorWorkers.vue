<template>
  <div>
    <Popup
      v-if="popupShow"
      v-on:yes="editorExit(workers)"
      v-on:no="popupHidden"
      v-bind:popup-title="'Выйти?'"
    />

    <div class="page-title editor-title">
      <h3>Редактор рабочего "{{editedName}} {{editedSurname}}"</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form class="editor-form">
              <div class="form-content editor-form-content">
                <div class="card editor-card blue darken-1 white-text">
                  <div class="card-content editor-card-content">
                    <span class="card-title">ФИО</span>

                    <div class="input-field editor-input">
                      <input
                        id="name"
                        type="text"
                        v-model.trim="editedName"
                      >
                      <label class="active" for="name">Имя</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="surname"
                        type="text"
                        v-model.trim="editedSurname"
                      >
                      <label class="active" for="surname">Фамилия</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="patronymic"
                        type="text"
                        v-model.trim="editedPatronymic"
                      >
                      <label class="active" for="patronymic">Отчество</label>
                    </div>
                  </div>
                </div>

                <div class="card editor-card blue darken-1 white-text">
                  <div class="card-content editor-card-content">
                    <span class="card-title">Личные данные</span>

                    <div class="input-field editor-input">
                      <input
                        id="age"
                        type="text"
                        v-model.trim="editedAge"
                      >
                      <label class="active" for="age">Возраст</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        class="browser-default editor-select"
                        id="sex"
                        v-model.trim="editedSex"
                      >
                        <option class="editor-option" value="Мужской">Мужской</option>
                        <option class="editor-option" value="Женский">Женский</option>
                      </select>
                      <label class="active">Пол</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="nationality"
                        type="text"
                        v-model.trim="editedNationality"
                      >
                      <label class="active" for="nationality">Национальность</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        class="browser-default editor-select"
                        id="medicalBook"
                        v-model="editedMedicalBook"
                      >
                        <option class="editor-option" selected value="">Не отмечено</option>
                        <option class="editor-option" value="Есть">Есть</option>
                        <option class="editor-option" value="Отсутствует">Отсутствует</option>
                      </select>
                      <label class="active">Медицинская Книга</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="education"
                        type="text"
                        v-model.trim="editedEducation"
                      >
                      <label class="active" for="education">Образование</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="university"
                        type="text"
                        v-model.trim="editedUniversity"
                      >
                      <label class="active" for="university">ВУЗ</label>
                    </div>
                  </div>
                </div>

                <div class="card editor-card blue darken-1 white-text">
                  <div class="card-content editor-card-content">
                    <span class="card-title">Паспортные данные</span>

                    <div class="input-field editor-input">
                      <input
                        id="passportID"
                        type="text"
                        v-model.trim="editedPassportID"
                      >
                      <label class="active" for="PassportID">Номер Паспорта</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="passportDate"
                        type="text"
                        v-model.trim="editedPassportDate"
                      >
                      <label class="active" for="passportDate">Дата Выдачи Паспорта</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="passportIssued"
                        type="text"
                        v-model.trim="editedPassportIssued"
                      >
                      <label class="active" for="passportIssued">Кем выдан</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="registration"
                        type="text"
                        v-model.trim="editedRegistration"
                      >
                      <label class="active" for="registration">Прописка</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="address"
                        type="text"
                        v-model.trim="editedAddress"
                      >
                      <label class="active" for="address">Адрес</label>
                    </div>
                  </div>
                </div>

                <div class="card editor-card blue darken-1 white-text">
                  <div class="card-content editor-card-content">
                    <span class="card-title">Банковские данные</span>
                    <div class="input-field editor-input">
                      <input
                        id="nameCard"
                        type="text"
                        v-model.trim="editedNameCard"
                      >
                      <label class="active" for="nameCard">Имя Держателя Карты</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="surnameCard"
                        type="text"
                        v-model.trim="editedSurnameCard"
                      >
                      <label class="active" for="surnameCard">Фамилия Держателя Карты</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="patronymicCard"
                        type="text"
                        v-model.trim="editedPatronymicCard"
                      >
                      <label class="active" for="surnameCard">Отчество Держателя Карты</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="accountNumberCard"
                        type="text"
                        v-model.trim="editedAccountNumberCard"
                      >
                      <label class="active" for="accountNumberCard">Номер Счёта</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        class="browser-default editor-select"
                        id="bank"
                        v-model.trim="editedBank"
                      >
                        <option class="editor-option" value="1">СберБанк</option>
                        <option class="editor-option" value="2">Банк ВТБ</option>
                        <option class="editor-option" value="3">Газпромбанк</option>
                        <option class="editor-option" value="4">Национальный Клиринговый Центр</option>
                        <option class="editor-option" value="5">Альфа-Банк</option>
                        <option class="editor-option" value="6">Россельхозбанк</option>
                        <option class="editor-option" value="7">Московский Кредитный Банк</option>
                        <option class="editor-option" value="8">Банк «Открытие»</option>
                        <option class="editor-option" value="9">Совкомбанк</option>
                        <option class="editor-option" value="10">Росбанк</option>
                        <option class="editor-option" value="11">Тинькофф Банк</option>
                      </select>
                      <label class="active">Банк</label>
                    </div>
                  </div>
                </div>

                <div class="card editor-card blue darken-1 white-text">
                  <div class="card-content editor-card-content">
                    <span class="card-title">Контактные данные</span>

                    <div class="input-field editor-input">
                      <select class="browser-default editor-select"
                              v-model="editedCity"
                      >
                        <option class="editor-option" selected value="">Не отмечено</option>
                        <option class="editor-option" v-for="(city) of sites" :key="city.cityName">
                          {{ city.cityName }}
                        </option>
                      </select>
                      <label class="active">Город</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="homePhone"
                        type="text"
                        v-model.trim="editedHomePhone"
                      >
                      <label class="active" for="homePhone">Телефон Домашний</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="mobilePhone"
                        type="text"
                        v-model.trim="editedMobilePhone"
                        v-mask="'+7 (###) ###-##-##'"
                        placeholder="+7 ( ) "
                      >
                      <label class="active" for="mobilePhone">Телефон Мобильный</label>
                    </div>
                  </div>
                </div>

                <div class="card editor-card blue darken-1 white-text">
                  <div class="card-content editor-card-content">
                    <span class="card-title">Рабочие данные</span>
                    <div class="input-field editor-input">
                      <input
                        id="accountNumber"
                        type="text"
                        v-model.trim="editedAccountNumber"
                      >
                      <label class="active" for="accountNumber">Учётный номер</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="previousWork"
                        type="text"
                        v-model.trim="editedPreviousWork"
                      >
                      <label class="active" for="previousWork">Прежняя Работа</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="reasonComing"
                        type="text"
                        v-model.trim="editedReasonComing"
                      >
                      <label class="active" for="reasonComing">Почему пришел к нам</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="professions"
                        type="text"
                        v-model.trim="editedProfessions"
                      >
                      <label class="active" for="professions">Профессии</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        id="nightShift"
                        class="browser-default editor-select"
                        v-model.trim="editedNightShift"
                      >
                        <option class="editor-option" value="1">Да</option>
                        <option class="editor-option" value="2">Нет</option>
                      </select>
                      <label class="active">Ночная</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        id="checkMVD"
                        class="browser-default editor-select"
                        v-model.trim="editedCheckMVD"
                      >
                        <option class="editor-option" value="1">Да</option>
                        <option class="editor-option" value="2">Нет</option>
                      </select>
                      <label class="active">Проверка МВД</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="dateInterview"
                        type="text"
                        v-model.trim="editedDateInterview"
                      >
                      <label class="active" for="dateInterview">Дата Собеседования</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="uniform"
                        type="text"
                        v-model.trim="editedUniform"
                      >
                      <label class="active" for="uniform">Униформа</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        id="fired"
                        class="browser-default editor-select"
                        v-model.trim="editedFired"
                      >
                        <option class="editor-option" value="1">Да</option>
                        <option class="editor-option" value="2">Нет</option>
                      </select>
                      <label class="active">Уволен</label>
                    </div>
                  </div>
                </div>

                <div class="card editor-card red darken-1 white-text" v-if="coincidence">
                  <div class="card-content editor-card-content">
                    <span class="card-title error-title">Ошибка!</span>

                    <div>
                      <p>Проверьте правильность заполнения формы</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <div class="btn-container editor-btns">
      <button
        class="btn editor-btn waves-effect waves-light auth-submit blue darken-2"
        v-on:click="editorCollection(workers)"
      >
        <i class="material-icons">create</i> Редактировать
      </button>

      <button
        class="btn editor-btn waves-effect waves-light auth-submit blue darken-2"
        v-on:click.prevent="popupVisibility"
      >
        <i class="material-icons">arrow_back</i> Вернуться назад
      </button>
    </div>
  </div>
</template>

<script>
import Popup from '@/components/Popup'
import M from 'materialize-css'
import { mask } from 'vue-the-mask'

export default {
  name: 'AddWorkers',
  components: {
    Popup
  },
  directives: { mask },
  data () {
    return {
      popupShow: false,
      coincidence: false,

      workers: [{}],

      editedName: '',
      editedSurname: '',
      editedPatronymic: '',
      editedAccountNumber: '',
      editedNameCard: '',
      editedSurnameCard: '',
      editedPatronymicCard: '',
      editedAccountNumberCard: '',
      editedBank: '',
      editedAge: '',
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
      editedCity: '',
      editedEdited: false
    }
  },
  methods: {
    popupVisibility () {
      this.popupShow = true
    },

    popupHidden () {
      this.popupShow = false
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
      this.editedNameCard = collection[this.searchIndex(collection)].nameCard
      this.editedSurnameCard = collection[this.searchIndex(collection)].surnameCard
      this.editedPatronymicCard = collection[this.searchIndex(collection)].patronymicCard
      this.editedAccountNumberCard = collection[this.searchIndex(collection)].accountNumberCard
      this.editedBank = collection[this.searchIndex(collection)].bank
      this.editedAge = collection[this.searchIndex(collection)].age
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
      this.editedCity = collection[this.searchIndex(collection)].city
    },

    editorCollection (collection, additionalCollection) {
      collection[this.searchIndex(collection)].name = this.editedName
      collection[this.searchIndex(collection)].surname = this.editedSurname
      collection[this.searchIndex(collection)].patronymic = this.editedPatronymic
      collection[this.searchIndex(collection)].accountNumber = this.editedAccountNumber
      collection[this.searchIndex(collection)].nameCard = this.editedNameCard
      collection[this.searchIndex(collection)].surnameCard = this.editedSurnameCard
      collection[this.searchIndex(collection)].accountNumberCard = this.editedAccountNumberCard
      collection[this.searchIndex(collection)].patronymicCard = this.editedPatronymicCard
      collection[this.searchIndex(collection)].bank = this.editedBank
      collection[this.searchIndex(collection)].age = this.editedAge
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
      collection[this.searchIndex(collection)].city = this.editedCity

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

    if (localStorage.getItem('sites')) {
      try {
        this.sites = JSON.parse(localStorage.getItem('sites'))
      } catch (e) {
        localStorage.removeItem('sites')
      }
    }

    // TODO Сделать универсальную функцию
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })

    this.outputCollection(this.workers)
  }
}
</script>

<style scoped>
  .app-content section {
    height: 70vh;

    overflow-y: auto;

    padding-bottom: 15px;
  }

  .editor-title{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .editor-form,
  .editor-form-content,
  .editor-card-content {
    color: white !important;

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .editor-card {
    width: 100%;
  }

  .editor-input {
    width: 50%;
  }

  .editor-input input {
    color: rgba(255, 255, 255, 0.9);
  }

  .editor-input label {
    color: white;
  }

  input:not([type]),
  input[type=text]:not(.browser-default),
  input[type=password]:not(.browser-default),
  input[type=email]:not(.browser-default),
  input[type=url]:not(.browser-default),
  input[type=time]:not(.browser-default),
  input[type=date]:not(.browser-default),
  input[type=datetime]:not(.browser-default),
  input[type=datetime-local]:not(.browser-default),
  input[type=tel]:not(.browser-default),
  input[type=number]:not(.browser-default),
  input[type=search]:not(.browser-default),
  textarea.materialize-textarea {
    border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  }

  input.invalid:not([type]),
  input.invalid:not([type]):focus,
  input.invalid[type=text]:not(.browser-default),
  input.invalid[type=text]:not(.browser-default):focus,
  input.invalid[type=password]:not(.browser-default),
  input.invalid[type=password]:not(.browser-default):focus,
  input.invalid[type=email]:not(.browser-default),
  input.invalid[type=email]:not(.browser-default):focus,
  input.invalid[type=url]:not(.browser-default),
  input.invalid[type=url]:not(.browser-default):focus,
  input.invalid[type=time]:not(.browser-default),
  input.invalid[type=time]:not(.browser-default):focus,
  input.invalid[type=date]:not(.browser-default),
  input.invalid[type=date]:not(.browser-default):focus,
  input.invalid[type=datetime]:not(.browser-default),
  input.invalid[type=datetime]:not(.browser-default):focus,
  input.invalid[type=datetime-local]:not(.browser-default),
  input.invalid[type=datetime-local]:not(.browser-default):focus,
  input.invalid[type=tel]:not(.browser-default),
  input.invalid[type=tel]:not(.browser-default):focus,
  input.invalid[type=number]:not(.browser-default),
  input.invalid[type=number]:not(.browser-default):focus,
  input.invalid[type=search]:not(.browser-default),
  input.invalid[type=search]:not(.browser-default):focus,
  textarea.materialize-textarea.invalid,
  textarea.materialize-textarea.invalid:focus,
  .select-wrapper.invalid>input.select-dropdown,
  .select-wrapper.invalid>input.select-dropdown:focus {
    border: none;
  }

  /* label focus color */
  #app .input-field input:focus + label {
    color: white;
  }
  /* label underline focus color */
  #app .input-field input:focus {
    border-bottom: 1px solid white;
    box-shadow: 0 1px 0 0 white;
  }

  .input-field .helper-text {
    color: rgba(255, 255, 255, 0.7)
  }

  #app .editor-select {
    border: none;
    border-bottom: 1px solid white;
    padding: 0;

    text-align-last: center;
    text-align: center;

    margin-top: 10px;

    cursor: pointer;
  }

  #app .editor-select .invalid {
    border: none;
    border-bottom: 1px solid #F44336;
  }

  #app small .invalid {
    border: none !important;
  }

  .editor-option {
    margin-left: 15px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .editor-select:focus {
    outline: none !important;
  }

  .editor-btns {
    width: 100%;
    margin-top: 18px;
  }

  .editor-btns .btn:first-child {
    margin-right: 1rem;
  }
</style>
