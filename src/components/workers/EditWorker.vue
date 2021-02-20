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
      <h3>Редактор рабочего <br> "{{editedWorker.surname}} {{editedWorker.name}}"</h3>
      <NavWorker :worker="editedWorker" @save-worker="saveEditedWorker(editedWorker)"/>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>

            <form>
              <div class="form-content">
                <div class="card editor-card white darken-1 black-text">
                  <div class="card-content flex-column-center">
                    <h4 class="card-title flex-start-center"><i class="material-icons">account_box</i> ФИО</h4>

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
                        @change="changeData(editedWorker.name, 'имя')"
                      >
                      <label class="active" for="name">Имя</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="surname"
                        type="text"
                        v-model.trim="editedWorker.surname"
                        @change="changeData(editedWorker.surname, 'фамилия')"
                      >
                      <label class="active" for="surname">Фамилия</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="patronymic"
                        type="text"
                        v-model.trim="editedWorker.patronymic"
                        @change="changeData(editedWorker.patronymic, 'отчество')"
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
                        @change="ageCalc(), changeData(editedWorker.birthday, 'день рождение')"
                      >
                      <label class="active" for="birthday">День рождения</label>
                      <p>Возраст: {{editedWorker.age}} лет</p>
                    </div>

                    <div class="input-field radio-field editor-input flex-start-center">
                      <p class="right-margin-big">Пол: </p>
                      <p class="right-margin-little">
                        <label>
                          <input type="radio" @change="changeData(editedWorker.sex, 'пол')" value="Мужской" v-model.trim="editedWorker.sex"/>
                          <span>Мужской</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input type="radio" value="Женский" v-model.trim="editedWorker.sex"/>
                          <span>Женский</span>
                        </label>
                      </p>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="nationality"
                        type="text"
                        v-model.trim="editedWorker.nationality"
                        @change="changeData(editedWorker.nationality, 'Национальность')"
                      >
                      <label class="active" for="nationality">Национальность</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="medicalBook"
                        type="date"
                        v-model="editedWorker.medicalBook"
                        @change="medicalBookCalc(), changeData(editedWorker.medicalBook, 'Медицинская Книга')"
                      >
                      <label class="active" for="medicalBook">Медицинская Книга</label>
                      <p v-if="editedWorker.medicalBookStatus === 'Просрочена'" class="red-text darken-1">{{editedWorker.medicalBookStatus}}</p>
                      <p v-else>Истекает через: {{editedWorker.medicalBookStatus}}</p>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="education"
                        type="text"
                        v-model.trim="editedWorker.education"
                        @change="changeData(editedWorker.education, 'Образование')"
                      >
                      <label class="active" for="education">Образование</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="university"
                        type="text"
                        v-model.trim="editedWorker.university"
                        @change="changeData(editedWorker.university, 'ВУЗ')"
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
                        @change="changeData(editedWorker.passportID, 'номер паспорта')"
                      >
                      <label class="active" for="PassportID">Номер Паспорта</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="passportDate"
                        type="date"
                        v-model.trim="editedWorker.passportDate"
                        @change="changeData(editedWorker.passportDate, 'дата выдачи паспорта')"
                      >
                      <label class="active" for="passportDate">Дата Выдачи Паспорта</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="passportIssued"
                        type="text"
                        v-model.trim="editedWorker.passportIssued"
                        @change="changeData(editedWorker.passportIssued, 'Кем выдан')"
                      >
                      <label class="active" for="passportIssued">Кем выдан</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="registration"
                        type="text"
                        v-model.trim="editedWorker.registration"
                        @change="changeData(editedWorker.registration, 'Прописка')"
                      >
                      <label class="active" for="registration">Прописка</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="address"
                        type="text"
                        v-model.trim="editedWorker.address"
                        @change="changeData(editedWorker.address, 'Адрес')"
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
                        @change="changeData(editedWorker.nameCard, 'имя держателя карты')"
                      >
                      <label class="active" for="nameCard">Имя Держателя Карты</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="surnameCard"
                        type="text"
                        v-model.trim="editedWorker.surnameCard"
                        @change="changeData(editedWorker.surnameCard, 'фамилия держателя карты')"
                      >
                      <label class="active" for="surnameCard">Фамилия Держателя Карты</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="patronymicCard"
                        type="text"
                        v-model.trim="editedWorker.patronymicCard"
                        @change="changeData(editedWorker.patronymicCard, 'отчество держателя карты')"
                      >
                      <label class="active" for="surnameCard">Отчество Держателя Карты</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="accountNumberCard"
                        type="text"
                        v-model.trim="editedWorker.accountNumberCard"
                        @change="changeData(editedWorker.accountNumberCard, 'номер счёта')"
                      >
                      <label class="active" for="accountNumberCard">Номер Счёта</label>
                    </div>

                    <div class="input-field editor-input">
                      <select
                        class="browser-default editor-select"
                        id="bank"
                        v-model.trim="editedWorker.bank"
                        @change="changeData(editedWorker.bank, 'банк')"
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
                              @change="changeData(editedWorker.city, 'город')"
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
                        @change="changeData(editedWorker.homePhone, 'домашний телефон')"
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
                        @change="changeData(editedWorker.mobilePhone, 'мобильный телефон')"
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
                        @change="changeData(editedWorker.accountNumber, 'учётный номер')"
                      >
                      <label class="active" for="accountNumber">Учётный номер</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="previousWork"
                        type="text"
                        v-model.trim="editedWorker.previousWork"
                        @change="changeData(editedWorker.previousWork, 'прежняя работа')"
                      >
                      <label class="active" for="previousWork">Прежняя Работа</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="reasonComing"
                        type="text"
                        maxlength="100"
                        v-model.trim="editedWorker.reasonComing"
                        @change="changeData(editedWorker.reasonComing, 'почему пришёл к нам')"
                      >
                      <label class="active" for="reasonComing">Почему пришел к нам (кратко)</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="professions"
                        type="text"
                        v-model.trim="editedWorker.professions"
                        @change="changeData(editedWorker.professions, 'профессия')"
                      >
                      <label class="active" for="professions">Профессия</label>
                    </div>

                    <div class="input-field radio-field editor-input flex-start-center">
                      <p class="right-margin-big">Ночная смена: </p>
                      <p class="right-margin-little">
                        <label>
                          <input type="radio" value="Да" v-model.trim="editedWorker.nightShift" @change="changeData(editedWorker.nightShift, 'ночная схема')"/>
                          <span>Да</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input type="radio" value="Нет" v-model.trim="editedWorker.nightShift"/>
                          <span>Нет</span>
                        </label>
                      </p>
                    </div>

                    <div class="input-field radio-field editor-input flex-start-center">
                      <p class="right-margin-big">Проверка МВД: </p>
                      <p class="right-margin-little">
                        <label>
                          <input type="radio" value="Да" v-model.trim="editedWorker.checkMVD" />
                          <span>Да</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input type="radio" value="Нет" v-model.trim="editedWorker.checkMVD" @change="changeData(editedWorker.nightShift, 'проверка МВД')"/>
                          <span>Нет</span>
                        </label>
                      </p>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="dateInterview"
                        type="date"
                        v-model.trim="editedWorker.dateInterview"
                        @change="changeData(editedWorker.nightShift, 'дата собеседования')"
                      >
                      <label class="active" for="dateInterview">Дата Собеседования</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="uniform"
                        type="text"
                        v-model.trim="editedWorker.uniform"
                        @change="changeData(editedWorker.uniform, 'униформа')"
                      >
                      <label class="active" for="uniform">Униформа</label>
                    </div>

                    <div class="input-field radio-field editor-input flex-start-center">
                      <p class="right-margin-big">Уволен: </p>
                      <p class="right-margin-little">
                        <label>
                          <input type="radio" value="Да" v-model.trim="editedWorker.fired" @change="changeData(editedWorker.fired, 'уволен')"/>
                          <span>Да</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input type="radio" value="Нет" v-model.trim="editedWorker.fired"/>
                          <span>Нет</span>
                        </label>
                      </p>
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
import NavWorker from '@/components/workers/NavWorker'
import { mask } from 'vue-the-mask'
import popupMixin from '@/mixins/popupMixin'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'EditorWorkers',
  components: { NavWorker },
  mixins: [popupMixin],
  directives: { mask },
  data () {
    return {
      editedWorker: '',
      history: []
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
          this.this.editedWorker.UploadPassport = result.info.secure_url
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

    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.SET_SITES_FROM_LOCAL_STORAGE()
    this.editedWorker = this.workers[this.$route.params.id]
  }
}
</script>

<style scoped>
  .photo-container {
    border-radius: var(--border-radius);
    margin-top: 2rem;
    width: 100%;
  }
</style>
