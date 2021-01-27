<template>
  <div>
    <Popup
      v-if="popupShow"
      v-on:yes="editorExit(workers)"
      v-on:no="popupHidden"
    >
      <template v-slot:title-popup>
        Покинуть редактор рабочего?
      </template>

      <template v-slot:text-info-popup>
        Введённые данные не будут сохранены!
      </template>
    </Popup>

    <div class="page-title flex-between-center">
      <h3>Редактор рабочего "{{editedSurname}} {{editedName}}"</h3>

      <div class="editor-btns">
        <button
          class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
          v-on:click="editorCollection(workers)"
        >
          <i class="material-icons">exit_to_app</i>Сохранить и выйти
        </button>

        <button
          class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
          v-on:click.prevent="popupVisibility"
        >
          <i class="material-icons">transfer_within_a_station</i> К Рабочим
        </button>
      </div>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>

            <form>
              <div class="form-content">
                <div class="card editor-card white darken-1 black-text">
                  <div class="card-content flex-column-center">
                    <h4 class="card-title"><i class="material-icons">account_box</i> ФИО</h4>

                    <div class="input-field editor-input flex-column-center">
                      <button id="upload_widget" v-on:click.prevent="upload" class="cloudinary-button">Загрузить фото рабочего</button>

                      <div class="photo-container flex-center">
                        <img v-bind:src="this.editedUploadImage" width="300rem">
                      </div>
                    </div>

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

                <div class="card editor-card white darken-1 black-text">
                  <div class="card-content flex-column-center">
                    <h4 class="card-title"><i class="material-icons">assignment</i> Личные данные</h4>

                    <div class="input-field editor-input">
                      <input
                        id="birthday"
                        type="date"
                        v-model.trim="editedBirthday"
                        v-on:change="ageCalc"
                      >
                      <label class="active" for="birthday">День рождения</label>
                      <p>Возраст: {{editedAge}} лет</p>
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
                      <input
                        id="medicalBook"
                        type="date"
                        v-model="editedMedicalBook"
                        v-on:input="medicalBookCalc"
                      >
                      <label class="active" for="medicalBook">Медицинская Книга</label>
                      <p>Истекает через: {{editedMedicalBookStatus}} лет</p>
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

                <div class="card editor-card white darken-1 black-text">
                  <div class="card-content flex-column-center">
                    <h4 class="card-title"><i class="material-icons">book</i> Паспортные данные</h4>

                    <div class="input-field editor-input flex-column-center">
                      <button v-on:click.prevent="uploadPassport" class="cloudinary-button">Загрузить паспорт рабочего</button>

                      <div class="photo-container flex-center" v-show="editedUploadPassport !== undefined">
                        <a v-bind:href="editedUploadPassport" target="_blank">Открыть паспорт</a>
                      </div>
                    </div>

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
                        type="date"
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

                <div class="card editor-card white darken-1 black-text">
                  <div class="card-content flex-column-center">
                    <h4 class="card-title"><i class="material-icons">account_balance_wallet</i> Банковские данные</h4>
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
                      </select>
                      <label class="active">Банк</label>
                    </div>
                  </div>
                </div>

                <div class="card editor-card white darken-1 black-text">
                  <div class="card-content flex-column-center">
                    <h4 class="card-title"><i class="material-icons">local_phone</i> Контактные данные</h4>

                    <div class="input-field editor-input">
                      <select class="browser-default editor-select"
                              v-model="editedCity"
                      >
                        <option class="editor-option" selected value="">Не отмечено</option>
                        <option class="editor-option" v-for="city of this.sites" :key="city.cityName">
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

                <div class="card editor-card white darken-1 black-text">
                  <div class="card-content flex-column-center">
                    <h4 class="card-title"><i class="material-icons">rate_review</i> Рабочие данные</h4>
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
                      <label class="active" for="reasonComing">Почему пришел к нам (кратко)</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="professions"
                        type="text"
                        v-model.trim="editedProfessions"
                      >
                      <label class="active" for="professions">Профессия</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        id="nightShift"
                        class="browser-default editor-select"
                        v-model.trim="editedNightShift"
                      >
                        <option class="editor-option" value="Да">Да</option>
                        <option class="editor-option" value="Нет">Нет</option>
                      </select>
                      <label class="active">Ночная смена</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        id="checkMVD"
                        class="browser-default editor-select"
                        v-model.trim="editedCheckMVD"
                      >
                        <option class="editor-option" value="Да">Да</option>
                        <option class="editor-option" value="Нет">Нет</option>
                      </select>
                      <label class="active">Проверка МВД</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="dateInterview"
                        type="date"
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
                        <option class="editor-option" value="Да">Да</option>
                        <option class="editor-option" value="Нет">Нет</option>
                      </select>
                      <label class="active">Уволен</label>
                    </div>
                  </div>
                </div>

                <div class="card editor-card red darken-1 white-text" v-if="coincidence">
                  <div class="card-content flex-column-center">
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
  </div>
</template>

<script>
import Popup from '@/components/Popup'
import M from 'materialize-css'
import { mask } from 'vue-the-mask'

export default {
  name: 'EditorWorkers',
  components: {
    Popup
  },
  directives: { mask },
  data () {
    return {
      popupShow: false,
      coincidence: false,

      workers: [{}],
      sites: [{}],

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
      editedCity: '',
      editedEdited: false,
      editedUploadImage: '',
      editedUploadPassport: '',

      editedMedicalBookStatus: ''
    }
  },
  beforeDestroy () {
    try {
      window.addEventListener('beforeunload', this.editorCollection(this.workers))
    } catch (e) {}
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
      // eslint-disable-next-line eqeqeq
      const object = collection.filter(element => element.id == this.$route.params.id)
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
      this.editedCity = collection[this.searchIndex(collection)].city
      this.editedUploadImage = collection[this.searchIndex(collection)].UploadImage
      this.editedUploadPassport = collection[this.searchIndex(collection)].UploadPassport
    },

    ageCalc () {
      this.editedAge = (new Date()).getFullYear() - this.editedBirthday.substr(0, 4)
    },

    medicalBookCalc () {
      this.editedMedicalBookStatus = this.editedMedicalBook.substr(0, 4) - (new Date()).getFullYear()
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
      collection[this.searchIndex(collection)].city = this.editedCity
      collection[this.searchIndex(collection)].UploadImage = this.editedUploadImage
      collection[this.searchIndex(collection)].UploadPassport = this.editedUploadPassport

      collection[this.searchIndex(collection)].age = this.editedAge
      collection[this.searchIndex(collection)].editedCount += 1

      console.log('Рабочий сохранён 😉')

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
    },

    upload () {
      // eslint-disable-next-line no-undef
      const myWidget = cloudinary.createUploadWidget({
        cloudName: 'db6qzfvbw',
        uploadPreset: 'ml_default',
        language: 'ru'
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.editedUploadImage = result.info.secure_url
        }
      }
      )

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
          this.editedUploadPassport = result.info.secure_url
        }
      }
      )

      myWidget.open()
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

    this.medicalBookCalc()
  }
}
</script>

<style scoped>
  .photo-container {
    margin-top: 2rem;
    width: 100%;
  }
</style>
