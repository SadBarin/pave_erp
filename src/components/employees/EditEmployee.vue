<template class="editor">
  <div>
    <Popup
      v-if="popupShow"
      @yes="editorExit"
      @no="popupHidden"
    >
      <template #title-popup>
        Покинуть редактор сотрудника?
      </template>

      <template #text-info-popup>
        Введённые данные не будут сохранены!
      </template>
    </Popup>

    <div class="page-title flex-between-center">
      <h3>Редактор сотрудника "{{editedEmployee.surname}} {{editedEmployee.name}}"</h3>

      <div class="editor-btns">
        <button
          class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
          @click="saveEditedEmployee(editedEmployee)"
        >
          <i class="material-icons">exit_to_app</i> Сохранить и выйти
        </button>

        <button
          class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
          @click="popupVisibility"
        >
          <i class="material-icons">group</i>К Сотрудникам
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
                   <h4 class="card-title"><i class="material-icons">assignment_ind</i> Авторизация</h4>

                   <div class="input-field editor-input">
                     <input
                       id="email"
                       type="text"
                       v-model="editedEmployee.email"
                     >
                   </div>

                   <div class="input-field editor-input">
                     <input
                       id="password"
                       type="text"
                       v-model="editedEmployee.password"
                     >
                     <label for="password" class="active">Пароль</label>
                   </div>

                   <div class="input-field editor-input">
                     <select class="browser-default editor-select"
                             v-model="editedEmployee.access"
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
                            v-model.trim="editedEmployee.duty"
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
                            v-model.trim="editedEmployee.name"
                     >
                     <label for="name" class="active">Имя</label>
                   </div>

                   <div class="input-field editor-input">
                     <input type="text"
                            id="surname"
                            v-model.trim="editedEmployee.surname"
                     >
                     <label for="surname" class="active">Фамилия</label>
                   </div>

                   <div class="input-field editor-input">
                     <input type="text"
                            id="patronymic"
                            v-model.trim="editedEmployee.patronymic"
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
                             v-model.trim="editedEmployee.city"
                     >
                       <option class="editor-option" selected>Отсутствует</option>
                       <option class="editor-option" v-for="city of sites" :key="city.value">
                         {{ city.name }}
                       </option>
                     </select>
                     <label class="active">Город</label>
                   </div>

                   <div class="input-field editor-input">
                     <input type="tel"
                            id="homePhone"
                            v-model.trim="editedEmployee.homePhone"
                     >
                     <label for="homePhone" class="active">Телефон Домашний</label>
                   </div>

                   <div class="input-field editor-input">
                     <input type="tel"
                            id="mobilePhone"
                            v-model.trim="editedEmployee.mobilePhone"
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

                   <div class="editor-input flex-start-center">
                     <p class="right-margin-big">Пол: </p>
                     <p class="right-margin-little">
                       <label>
                         <input type="radio" value="Мужской" v-model.trim="editedEmployee.sex"/>
                         <span>Мужской</span>
                       </label>
                     </p>
                     <p>
                       <label>
                         <input type="radio" value="Женский" v-model.trim="editedEmployee.sex"/>
                         <span>Женский</span>
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
import popupMixin from '@/mixins/popupMixin'
import M from 'materialize-css'
import { mask } from 'vue-the-mask'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'addEmployees.vue',
  mixins: [popupMixin],
  directives: { mask },
  data () {
    return {
      editedEmployee: '',
      history: []
    }
  },
  computed: {
    ...mapGetters([
      'authEmployee',
      'employees',
      'sites'
    ]),

    editedEmail: function () {
      return this.editedEmployee.email
    },

    editedPassword: function () {
      return this.editedEmployee.password
    },

    editedAccess: function () {
      return this.editedEmployee.access
    },

    editedDuty: function () {
      return this.editedEmployee.duty
    },

    editedName: function () {
      return this.editedEmployee.name
    },

    editedSurname: function () {
      return this.editedEmployee.surname
    },

    editedCity: function () {
      return this.editedEmployee.city
    },

    editedHomePhone: function () {
      return this.editedEmployee.homePhone
    },

    editedMobilePhone: function () {
      return this.editedEmployee.mobilePhone
    },

    editedPatronymic: function () {
      return this.editedEmployee.patronymic
    },

    editedSex: function () {
      return this.editedEmployee.sex
    }
  },
  watch: {
    editedEmail: function (newQuestion, oldQuestion) {
      this.changeData(newQuestion, oldQuestion, 'почта')
    },

    editedPassword: function (newQuestion, oldQuestion) {
      this.changeData(newQuestion, oldQuestion, 'пароль')
    },

    editedAccess: function (newQuestion, oldQuestion) {
      this.changeData(newQuestion, oldQuestion, 'доступ')
    },

    editedDuty: function (newQuestion, oldQuestion) {
      this.changeData(newQuestion, oldQuestion, 'должность')
    },

    editedName: function (newQuestion, oldQuestion) {
      this.changeData(newQuestion, oldQuestion, 'имя')
    },

    editedSurname: function (newQuestion, oldQuestion) {
      this.changeData(newQuestion, oldQuestion, 'фамилия')
    },

    editedPatronymic: function (newQuestion, oldQuestion) {
      this.changeData(newQuestion, oldQuestion, 'отчество')
    },

    editedCity: function (newQuestion, oldQuestion) {
      this.changeData(newQuestion, oldQuestion, 'город')
    },

    editedHomePhone: function (newQuestion, oldQuestion) {
      this.changeData(newQuestion, oldQuestion, 'домашний телефон')
    },

    editedMobilePhone: function (newQuestion, oldQuestion) {
      this.changeData(newQuestion, oldQuestion, 'мобильный телефон')
    },

    editedSex: function (newQuestion, oldQuestion) {
      this.changeData(newQuestion, oldQuestion, 'пол')
    }
  },
  methods: {
    ...mapMutations([
      'SET_EMPLOYEES_FROM_SERVER',
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE',
      'SET_SITES_FROM_LOCAL_STORAGE'
    ]),

    changeData (newValue, oldValue, data) {
      if (oldValue !== undefined) {
        this.history.push(`[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}] был изменён ${data} с ${oldValue} на ${newValue} сотрудником ${this.authEmployee.surname} ${this.authEmployee.name}`)
      }
    },

    editorExit () {
      this.$router.push('/employees')
    },

    saveEditedEmployee (employee) {
      try {
        this.history.push(`[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}] Работник редактирован сотрудником ${this.authEmployee.surname} ${this.authEmployee.name}`)
        employee.history.push(...this.history)
      } catch (e) { M.toast({ html: 'Внимание! Данный сотрудник не поддерживает историю' }) }

      firebase.database().ref('/employees/' + employee.id).set(employee).then(() => {
        this.SET_EMPLOYEES_FROM_SERVER()
        this.editorExit()
      })
    }
  },
  mounted () {
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })

    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
    this.SET_SITES_FROM_LOCAL_STORAGE()
    this.editedEmployee = this.employees[this.$route.params.id]
  }
}
</script>

<style scoped>
  #app small .invalid {
    border: none !important;
  }
</style>
