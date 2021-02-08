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
                     >
                   </div>

                   <div class="input-field editor-input">
                     <input
                       id="password"
                       type="text"
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
                   <div class="input-field editor-input">
                     <select
                       class="browser-default editor-select"
                       id="sex"
                       v-model.trim="editedEmployee.sex"
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
      editedEmployee: ''
    }
  },
  computed: {
    ...mapGetters([
      'employees',
      'sites'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_EMPLOYEES_FROM_SERVER',
      'SET_SITES_FROM_SERVER'
    ]),

    editorExit () {
      this.$router.push('/employees')
    },

    saveEditedEmployee (employee) {
      firebase.database().ref('/employees/' + employee.id).set(employee)
      this.editorExit()
    }
  },
  mounted () {
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })

    this.SET_EMPLOYEES_FROM_SERVER()
    this.SET_SITES_FROM_SERVER()
    // eslint-disable-next-line no-return-assign
    setTimeout(() => this.editedEmployee = this.employees[this.$route.params.id], 1000)
  }
}
</script>

<style scoped>
  #app small .invalid {
    border: none !important;
  }
</style>
