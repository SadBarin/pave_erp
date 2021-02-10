<template>
  <div>
    <Popup
      v-if="popupShow"
      @yes="editorExit"
      @no="popupHidden"
    >
      <template #title-popup>
        Покинуть редактор рабочего?
      </template>

      <template #text-info-popup>
        Введённые данные не будут сохранены!
      </template>
    </Popup>

    <div class="page-title flex-between-center">
      <h3>Редактор рабочего "{{editedWorker.surname}} {{editedWorker.name}}"</h3>

      <div class="editor-btns">
        <button
          class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
          v-on:click="saveEditedWorker(editedWorker)"
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
                      <button id="upload_widget" @click.prevent="upload" class="cloudinary-button">Загрузить фото рабочего</button>

                      <div class="photo-container flex-center">
                        <img :src="editedWorker.UploadImage" width="200rem">
                      </div>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="name"
                        type="text"
                        v-model.trim="editedWorker.name"
                      >
                      <label class="active" for="name">Имя</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="surname"
                        type="text"
                        v-model.trim="editedWorker.surname"
                      >
                      <label class="active" for="surname">Фамилия</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="patronymic"
                        type="text"
                        v-model.trim="editedWorker.patronymic"
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
                        v-model.trim="editedWorker.birthday"
                      >
                      <label class="active" for="birthday">День рождения</label>
                      <p>Возраст: {{editedWorker.age}} лет</p>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        class="browser-default editor-select"
                        id="sex"
                        v-model.trim="editedWorker.sex"
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
                        v-model.trim="editedWorker.nationality"
                      >
                      <label class="active" for="nationality">Национальность</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="medicalBook"
                        type="date"
                        v-model="editedWorker.medicalBook"
                      >
                      <label class="active" for="medicalBook">Медицинская Книга</label>
                      <p>Истекает через: {{editedWorker.medicalBookStatus}} лет</p>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="education"
                        type="text"
                        v-model.trim="editedWorker.education"
                      >
                      <label class="active" for="education">Образование</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="university"
                        type="text"
                        v-model.trim="editedWorker.university"
                      >
                      <label class="active" for="university">ВУЗ</label>
                    </div>
                  </div>
                </div>

                <div class="card editor-card white darken-1 black-text">
                  <div class="card-content flex-column-center">
                    <h4 class="card-title"><i class="material-icons">book</i> Паспортные данные</h4>

                    <div class="input-field editor-input flex-column-center">
                      <button @click.prevent="uploadPassport" class="cloudinary-button">Загрузить паспорт рабочего</button>

                      <div class="photo-container flex-center" v-show="editedWorker.UploadPassport !== undefined">
                        <a v-bind:href="editedWorker.UploadPassport" target="_blank">Открыть паспорт</a>
                      </div>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="passportID"
                        type="text"
                        v-model.trim="editedWorker.passportID"
                      >
                      <label class="active" for="PassportID">Номер Паспорта</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="passportDate"
                        type="date"
                        v-model.trim="editedWorker.passportDate"
                      >
                      <label class="active" for="passportDate">Дата Выдачи Паспорта</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="passportIssued"
                        type="text"
                        v-model.trim="editedWorker.passportIssued"
                      >
                      <label class="active" for="passportIssued">Кем выдан</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="registration"
                        type="text"
                        v-model.trim="editedWorker.registration"
                      >
                      <label class="active" for="registration">Прописка</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="address"
                        type="text"
                        v-model.trim="editedWorker.address"
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
                        v-model.trim="editedWorker.nameCard"
                      >
                      <label class="active" for="nameCard">Имя Держателя Карты</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="surnameCard"
                        type="text"
                        v-model.trim="editedWorker.surnameCard"
                      >
                      <label class="active" for="surnameCard">Фамилия Держателя Карты</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="patronymicCard"
                        type="text"
                        v-model.trim="editedWorker.patronymicCard"
                      >
                      <label class="active" for="surnameCard">Отчество Держателя Карты</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="accountNumberCard"
                        type="text"
                        v-model.trim="editedWorker.accountNumberCard"
                      >
                      <label class="active" for="accountNumberCard">Номер Счёта</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        class="browser-default editor-select"
                        id="bank"
                        v-model.trim="editedWorker.bank"
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
                              v-model="editedWorker.city"
                      >
                        <option class="editor-option" selected value="">Не отмечено</option>
                        <option class="editor-option" v-for="city of this.sites" :key="city.value">
                          {{ city.name }}
                        </option>
                      </select>
                      <label class="active">Город</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="homePhone"
                        type="text"
                        v-model.trim="editedWorker.homePhone"
                      >
                      <label class="active" for="homePhone">Телефон Домашний</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="mobilePhone"
                        type="text"
                        v-model.trim="editedWorker.mobilePhone"
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
                        v-model.trim="editedWorker.accountNumber"
                      >
                      <label class="active" for="accountNumber">Учётный номер</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="previousWork"
                        type="text"
                        v-model.trim="editedWorker.previousWork"
                      >
                      <label class="active" for="previousWork">Прежняя Работа</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="reasonComing"
                        type="text"
                        v-model.trim="editedWorker.reasonComing"
                      >
                      <label class="active" for="reasonComing">Почему пришел к нам (кратко)</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="professions"
                        type="text"
                        v-model.trim="editedWorker.professions"
                      >
                      <label class="active" for="professions">Профессия</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        id="nightShift"
                        class="browser-default editor-select"
                        v-model.trim="editedWorker.nightShift"
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
                        v-model.trim="editedWorker.checkMVD"
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
                        v-model.trim="editedWorker.dateInterview"
                      >
                      <label class="active" for="dateInterview">Дата Собеседования</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="uniform"
                        type="text"
                        v-model.trim="editedWorker.uniform"
                      >
                      <label class="active" for="uniform">Униформа</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        id="fired"
                        class="browser-default editor-select"
                        v-model.trim="editedWorker.fired"
                      >
                        <option class="editor-option" value="Да">Да</option>
                        <option class="editor-option" value="Нет">Нет</option>
                      </select>
                      <label class="active">Уволен</label>
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
import M from 'materialize-css'
import { mask } from 'vue-the-mask'
import popupMixin from '@/mixins/popupMixin'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'EditorWorkers',
  mixins: [popupMixin],
  directives: { mask },
  data () {
    return {
      editedWorker: ''
    }
  },
  computed: {
    ...mapGetters([
      'workers',
      'sites'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_WORKERS_FROM_SERVER',
      'SET_WORKERS_FROM_LOCAL_STORAGE',
      'SET_SITES_FROM_SERVER',
      'SET_SITES_FROM_LOCAL_STORAGE'
    ]),

    editorExit () {
      this.$router.push('/workers')
    },

    saveEditedWorker (worker) {
      firebase.database().ref('/workers/' + worker.id).set(worker)
        .then(() => {
          this.SET_WORKERS_FROM_SERVER()
          this.editorExit()
        })
    },

    // ageCalc () {
    //   this.editedAge = (new Date()).getFullYear() - this.editedWorker.birthday.substr(0, 4)
    // },
    //
    // medicalBookCalc () {
    //   this.editedMedicalBookStatus = this.editedWorker.medicalBook.substr(0, 4) - (new Date()).getFullYear()
    // },

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
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })

    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.SET_SITES_FROM_LOCAL_STORAGE()
    this.editedWorker = this.workers[this.$route.params.id]
  }
}
</script>

<style scoped>
  .photo-container {
    margin-top: 2rem;
    width: 100%;
  }
</style>
