<template class="editor">
  <div>
    <Popup
      v-if="popupShow"
      v-on:yes="editorExit(employees)"
      v-on:no="popupHidden"
    >
      <template v-slot:title-popup>
        Покинуть редактор сотрудника?
      </template>

      <template v-slot:text-info-popup>
        Введённые данные не будут сохранены!
      </template>
    </Popup>

    <div class="page-title flex-between-center">
      <h3>Редактор сотрудника "{{editedSurname}} {{editedName}}"</h3>

      <div class="editor-btns">
        <button
          class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
          v-on:click="editorCollection(employees, sites)"
        >
          <i class="material-icons">exit_to_app</i> Сохранить и выйти
        </button>

        <button
          class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
          v-on:click="popupVisibility"
        >
          <i class="material-icons">group</i>К Сотрудникам
        </button>
      </div>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form @submit.prevent="validate">
             <div class="form-content">
               <div class="card editor-card white darken-1 black-text">
                 <div class="card-content flex-column-center">
                   <h4 class="card-title"><i class="material-icons">assignment_ind</i> Авторизация</h4>

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
                       type="text"
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

                   <div class="input-field editor-input">
                     <input type="text"
                            id="duty"
                            v-model.trim="editedDuty"
                     >
                     <label for="duty" class="active">Должность</label>
                   </div>
                 </div>
               </div>

               <div class="card editor-card white darken-1 black-text">
                 <div class="card-content flex-column-center">
                   <h4 class="card-title"><i class="material-icons">account_box</i>ФИО</h4>
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

               <div class="card editor-card white darken-1 black-text">
                 <div class="card-content flex-column-center black-text">
                   <h4 class="card-title"><i class="material-icons">local_phone</i> Контактные данные</h4>

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

               <div class="card editor-card white darken-1 black-text">
                 <div class="card-content flex-column-center">
                   <h4 class="card-title"><i class="material-icons">account_box</i>Личные данные</h4>
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
      editedSex: '',
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
  beforeDestroy () {
    try {
      window.addEventListener('beforeunload', this.editorCollection(this.employees))
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
        this.validateCheck = false
      } else {
        this.validateCheck = true
      }
    },

    searchIndex (collection) {
      // eslint-disable-next-line eqeqeq
      const object = collection.filter(element => element.id == this.$route.params.id)
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
      this.editedSex = collection[this.searchIndex(collection)].sex
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
      collection[this.searchIndex(collection)].sex = this.editedSex
      collection[this.searchIndex(collection)].homePhone = this.editedHomePhone
      collection[this.searchIndex(collection)].mobilePhone = this.editedMobilePhone
      collection[this.searchIndex(collection)].city = this.editedCity
      collection[this.searchIndex(collection)].duty = this.editedDuty
      collection[this.searchIndex(collection)].access = this.editedAccess

      console.log('Сотрудник сохранён 😉')

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
  #app small .invalid {
    border: none !important;
  }
</style>
