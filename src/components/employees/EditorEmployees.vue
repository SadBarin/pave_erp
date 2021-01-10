<template class="editor">
  <div>
    <Popup
      v-if="popupShow"
      v-on:yes="editorExit(employees)"
      v-on:no="popupHidden"
      v-bind:popup-title="'Выйти?'"
    />

    <div class="page-title flex-center">
      <h3>Редактор сотрудника "{{editedName}} {{editedSurname}}"</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form @submit.prevent="validate">
             <div class="form-content">
               <div class="card editor-card blue darken-1 white-text">
                 <div class="card-content flex-column-center">
                   <span class="card-title white-text">Авторизация</span>

                   <div class="input-field editor-input">
                     <input
                       id="email"
                       type="text"
                       v-model.trim="editedEmail"
                       :class="{invalid: ($v.editedEmail.$dirty && !$v.editedEmail.required) || ($v.editedEmail.$dirty && !$v.editedEmail.email)}"
                     >
                     <label for="email" class="active">Почта</label>
                     <small
                       class="helper-text invalid"
                       v-if="$v.editedEmail.$dirty && !$v.editedEmail.required"
                     >Введите ваш email</small>
                     <small
                       class="helper-text invalid"
                       v-else-if="$v.editedEmail.$dirty && !$v.editedEmail.email"
                     >Введите правильно email
                     </small>
                   </div>

                   <div class="input-field editor-input">
                     <input
                       id="password"
                       type="password"
                       v-model.trim="editedPassword"
                       :class="{invalid: ($v.editedPassword.$dirty && !$v.editedPassword.required) || ($v.editedPassword.$dirty && !$v.editedPassword.minLength)}"
                     >
                     <label for="password" class="active">Пароль</label>
                     <small
                       class="helper-text invalid"
                       v-if="$v.editedPassword.$dirty && !$v.editedPassword.required"
                     >
                       Введите ваш пароль
                     </small>
                     <small
                       class="helper-text invalid"
                       v-else-if="$v.editedPassword.$dirty && !$v.editedPassword.minLength"
                     >
                       Пароль должен содержать не менее {{$v.editedPassword.$params.minLength.min}} символов.
                     </small>
                   </div>

                   <div class="input-field editor-input">
                     <select class="browser-default editor-select"
                             v-model="editedAccess"
                     >
                       <option class="editor-option" value="employee">Сотрудник</option>
                       <option class="editor-option" value="admin">Админ</option>
                       <option class="editor-option" value="staffManager">Менеджер по персоналу</option>
                       <option class="editor-option" value="customerManager">Менеджер по работе с заказчиками</option>
                       <option class="editor-option" value="leader">Руководитель обособленного подразделения</option>
                     </select>
                     <label class="active">Доступ</label>
                   </div>
                 </div>
               </div>

               <div class="card editor-card blue darken-1 white-text">
                 <div class="card-content flex-column-center">
                   <span class="card-title white-text">ФИО</span>
                   <div class="input-field editor-input">
                     <input type="text"
                            id="name"
                            v-model.trim="editedName"
                     >
                     <label for="name" class="active">Имя</label>
                   </div>

                   <div class="input-field editor-input">
                     <input type="text"
                            id="surname"
                            v-model.trim="editedSurname"
                     >
                     <label for="surname" class="active">Фамилия</label>
                   </div>

                   <div class="input-field editor-input">
                     <input type="text"
                            id="patronymic"
                            v-model.trim="editedPatronymic"
                     >
                     <label for="patronymic" class="active">Отчество</label>
                   </div>
                 </div>
               </div>

               <div class="card editor-card blue darken-1 white-text">
                 <div class="card-content flex-column-center black-text">
                   <span class="card-title white-text">Контактные данные</span>

                   <div class="input-field editor-input">
                     <input type="tel"
                            id="homePhone"
                            v-model.trim="editedHomePhone"
                     >
                     <label for="homePhone" class="active">Телефон Домашний</label>
                   </div>

                   <div class="input-field editor-input">
                     <input type="tel"
                            id="mobilePhone"
                            v-model.trim="editedMobilePhone"
                            v-mask="'+7 (###) ###-##-##'"
                            placeholder="+7 ( ) "
                     >
                     <label for="mobilePhone" class="active">Телефон Мобильный</label>
                   </div>
                 </div>
               </div>

               <div class="card editor-card blue darken-1 white-text">
                 <div class="card-content flex-column-center black-text">
                   <span class="card-title white-text">Дополнительно</span>

                   <div class="input-field editor-input">
                     <select class="browser-default editor-select"
                             v-model.trim="editedCity"
                     >
                       <option class="editor-option" selected>Отсутствует</option>
                       <option class="editor-option" v-for="(city) of sites" :key="city.cityName">
                         {{ city.cityName }}
                       </option>
                     </select>
                     <label class="active">Город</label>
                   </div>

                   <div class="input-field editor-input">
                     <input type="text"
                            id="duty"
                            v-model.trim="editedDuty"
                     >
                     <label for="duty" class="active">Должность</label>
                   </div>
                 </div>
               </div>

               <div class="card editor-card red darken-1 white-text" v-if="!validateCheck">
                 <div class="card-content flex-column-center">
                   <span class="card-title white-text error-title">Ошибка!</span>

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

    <div class="flex-center editor-btns">
      <button
        class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
        v-on:click="editorCollection(employees, sites)"
      >
        <i class="material-icons">create</i> Редактировать
      </button>

      <button
        class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
        v-on:click="popupVisibility"
      >
        <i class="material-icons">arrow_back</i> Вернуться назад
      </button>
    </div>
  </div>
</template>

<script>
import Popup from '@/components/Popup'
import M from 'materialize-css'
import { email, minLength, required } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'

export default {
  name: 'addEmployees.vue',
  components: {
    Popup
  },
  directives: { mask },
  data () {
    return {
      popupShow: false,
      validateCheck: true,
      employees: [{}],
      sites: [{}],
      editedEmail: '',
      editedPassword: '',
      editedName: '',
      editedSurname: '',
      editedPatronymic: '',
      editedHomePhone: '',
      editedMobilePhone: '',
      editedCity: '',
      editedDuty: '',
      editedAccess: false
    }
  },
  validations: {
    editedEmail: { email, required },
    editedPassword: { required, minLength: minLength(8) }
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
        this.validateCheck = false
      } else {
        this.validateCheck = true
      }
    },

    searchIndex (collection) {
      const object = collection.filter(element => element.edited !== false)
      return collection.findIndex((element) => element.id === object[0].id)
    },

    editorExit (collection) {
      collection[this.searchIndex(collection)].edited = false
      this.saveCollection(this.employees, 'employees')
      this.saveCollection(this.sites, 'sites')
      this.$router.push('/employees')
    },

    outputCollection (collection, additionalCollection) {
      this.editedEmail = collection[this.searchIndex(collection)].email
      this.editedPassword = collection[this.searchIndex(collection)].password
      this.editedName = collection[this.searchIndex(collection)].name
      this.editedSurname = collection[this.searchIndex(collection)].surname
      this.editedPatronymic = collection[this.searchIndex(collection)].patronymic
      this.editedHomePhone = collection[this.searchIndex(collection)].homePhone
      this.editedMobilePhone = collection[this.searchIndex(collection)].mobilePhone
      this.editedCity = collection[this.searchIndex(collection)].city
      this.editedDuty = collection[this.searchIndex(collection)].duty
      this.editedAccess = collection[this.searchIndex(collection)].access
    },

    editorCollection (collection, additionalCollection) {
      collection[this.searchIndex(collection)].email = this.editedEmail
      collection[this.searchIndex(collection)].password = this.editedPassword
      collection[this.searchIndex(collection)].name = this.editedName
      collection[this.searchIndex(collection)].surname = this.editedSurname
      collection[this.searchIndex(collection)].patronymic = this.editedPatronymic
      collection[this.searchIndex(collection)].homePhone = this.editedHomePhone
      collection[this.searchIndex(collection)].mobilePhone = this.editedMobilePhone
      collection[this.searchIndex(collection)].city = this.editedCity
      collection[this.searchIndex(collection)].duty = this.editedDuty
      collection[this.searchIndex(collection)].access = this.editedAccess

      this.editorExit(collection)
    },

    saveCollection (collection, collectionName) {
      const parsed = JSON.stringify(collection)
      localStorage.setItem(collectionName, parsed)
    },

    updateCollection (collectionName) {
      if (localStorage.getItem(collectionName)) {
        try {
          this.employees = JSON.parse(localStorage.getItem(collectionName))
        } catch (e) {
          localStorage.removeItem(collectionName)
        }
      }
    }
  },
  mounted () {
    this.updateCollection('employees')

    if (localStorage.getItem('sites')) {
      try {
        this.sites = JSON.parse(localStorage.getItem('sites'))
      } catch (e) {
        localStorage.removeItem('sites')
      }
    }

    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })

    this.outputCollection(this.employees)
  }
}
</script>

<style scoped>
  .app-content section {
    height: 70vh;

    overflow-y: auto;

    padding-bottom: 15px;
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

  #app small .invalid {
    border: none !important;
  }
</style>
