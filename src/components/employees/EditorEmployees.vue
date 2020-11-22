<template>
  <div>
    <Popup
      v-if="popupShow"
      v-on:yes="editorExit(employees)"
      v-on:no="popupHidden"
      v-bind:popup-title="'Выйти?'"
    />

    <div class="page-title">
      <h3>Редактор сотрудника "{{editedName}} {{editedSurname}}"</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form @submit.prevent="validate">
             <div class="form-content">
               <div class="input-field input-field-blue">
                 <input
                   id="email"
                   type="text"
                   v-model.trim="editedEmail"
                   :class="{invalid: ($v.editedEmail.$dirty && !$v.editedEmail.required) || ($v.editedEmail.$dirty && !$v.editedEmail.editedEmail)}"
                 >
                 <label for="email" class="active">Почта</label>
                 <small
                   class="helper-text invalid"
                   v-if="$v.editedEmail.$dirty && !$v.editedEmail.required"
                 >Введите ваш email</small>
                 <small
                   class="helper-text invalid"
                   v-else-if="$v.editedEmail.$dirty && !$v.editedEmail.editedEmail"
                 >Введите правильно email
                 </small>
               </div>

               <div class="input-field" id="input-field-blue">
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

               <div class="input-field input-field-blue">
                 <input type="text"
                        id="name"
                        v-model.trim="editedName"
                 >
                 <label for="name" class="active">Имя</label>
               </div>

               <div class="input-field input-field-blue">
                 <input type="text"
                        id="surname"
                        v-model.trim="editedSurname"
                 >
                 <label for="surname" class="active">Фамилия</label>
               </div>

               <div class="input-field input-field-blue">
                 <input type="text"
                        id="patronymic"
                        v-model.trim="editedPatronymic"
                 >
                 <label for="patronymic" class="active">Отчество</label>
               </div>

               <div class="input-field input-field-blue">
                 <input type="tel"
                        id="homePhone"
                        v-model.trim="editedHomePhone"
                 >
                 <label for="homePhone" class="active">Телефон Домашний</label>
               </div>

               <div class="input-field input-field-blue">
                 <input type="tel"
                        id="mobilePhone"
                        v-model.trim="editedMobilePhone"
                 >
                 <label for="mobilePhone" class="active">Телефон Мобильный</label>
               </div>

               <div class="input-field">
                 <select class="browser-default"
                         v-model.trim="editedCity"
                 >
                   <option v-for="(city) of sites" :key="city.cityName">
                     {{ city.cityName }}
                   </option>
                 </select>
                 <label class="active">Город</label>
               </div>

               <div class="input-field input-field-blue">
                 <input type="text"
                        id="duty"
                        v-model.trim="editedDuty"
                 >
                 <label for="duty" class="active">Должность</label>
               </div>

               <div class="input-field">
                 <select class="browser-default"
                         v-model.trim="editedAccess"
                 >
                   <option value="1">Сотрудник</option>
                   <option value="2">Админ</option>
                 </select>
                 <label class="active">Доступ</label>
               </div>
             </div>

             <div class="button-container">
               <button
                 class="btn waves-effect waves-light auth-submit blue darken-1"
                 v-on:click="editorCollection(employees, sites)"
               >
                 <i class="material-icons">create</i> Редактировать
               </button>

               <button
                 class="btn waves-effect waves-light auth-submit blue darken-1"
                 v-on:click="popupVisibility"
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
import Popup from '@/components/Popup'
import M from 'materialize-css'
import { email, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'addEmployees.vue',
  components: {
    Popup
  },
  data () {
    return {
      popupShow: false,

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
      editedAccess: ''
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
