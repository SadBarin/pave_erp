<template class="editor">
  <div id="app-edit">
    <AppEditWrapper :header="'Редактор сотрудника: ' + editedEmployee.surname + ' ' + editedEmployee.name">
      <template #nav-buttons>
        <AppButtonIcon icon="save" title="Сохранить и выйти" @button-click="saveEditedEmployee(editedEmployee)"/>
        <AppButtonIcon icon="location_city" title="Вернуться к городам" @button-click="editorExit"/>
      </template>

      <template #edit-section>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="assignment_ind" header-text="Авторизация"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-email"
              label="Почта: "
              maxLength="20"
              v-model="editedEmployee.email"
            />

            <AppLineText
              inputID="input-password"
              label="Пароль: "
              maxLength="20"
              v-model="editedEmployee.password"
            />

            <AppSelect
              selectID="select"
              label="Доступ: "
              v-model="editedEmployee.access"
            >
              <option value="employee">Сотрудник</option>
              <option value="admin">Админ</option>
              <option value="staffManager">Менеджер по персоналу</option>
              <option value="customerManager">Менеджер по работе с заказчиками</option>
              <option value="leader">Руководитель обособленного подразделения</option>
            </AppSelect>

            <AppLineText
              inputID="input-duty"
              label="Должность: "
              maxLength="20"
              v-model="editedEmployee.duty"
            />
          </div>
        </div>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="account_box" header-text="ФИО"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-surname"
              label="Фамилия: "
              maxLength="20"
              v-model="editedEmployee.surname"
            />

            <AppLineText
              inputID="input-name"
              label="Имя: "
              maxLength="20"
              v-model="editedEmployee.name"
            />

            <AppLineText
              inputID="input-patronymic"
              label="Отчество: "
              maxLength="20"
              v-model="editedEmployee.patronymic"
            />
          </div>
        </div>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="local_phone" header-text="Контактные данные"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-city"
              label="Город: "
              maxLength="20"
              v-model="editedEmployee.city"
            />

            <AppLineText
              inputID="input-home-phone"
              label="Телефон домашний: "
              maxLength="20"
              v-model="editedEmployee.homePhone"
            />

            <AppLineText
              inputID="input-mobile-phone"
              label="Телефон мобильный: "
              maxLength="20"
              v-model="editedEmployee.mobilePhone"
            />
          </div>
        </div>
      </template>
    </AppEditWrapper>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

import AppEditWrapper from '@/components/edit/AppEditWrapper'
import AppHeaderIcon from '@/components/AppHeaderIcon'
import AppButtonIcon from '@/components/AppButtonIcon'
import AppLineText from '@/components/AppLineText'
import AppSelect from '@/components/AppSelect'

export default {
  name: 'addEmployees.vue',

  components: {
    AppEditWrapper,
    AppHeaderIcon,
    AppButtonIcon,
    AppLineText,
    AppSelect
  },

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
    ])
  },

  created () {
    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
    this.SET_SITES_FROM_LOCAL_STORAGE()
    this.editedEmployee = this.employees[this.$route.params.id]
  },

  methods: {
    ...mapMutations([
      'SET_EMPLOYEES_FROM_SERVER',
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE',
      'SET_SITES_FROM_LOCAL_STORAGE'
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
      this.$router.push('/employees')
    },

    saveEditedEmployee (employee) {
      try {
        this.history.push({
          date: `[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}]`,
          info: 'Работник сохранён работником',
          employee: {
            name: `${this.authEmployee.surname} ${this.authEmployee.name}`,
            id: this.authEmployee.id
          }
        })
        employee.history.push(...this.history)
        // eslint-disable-next-line no-undef
      } catch (e) { M.toast({ html: 'Внимание! Данный сотрудник не поддерживает историю' }) }

      firebase.database().ref('/employees/' + employee.id).set(employee).then(() => {
        this.SET_EMPLOYEES_FROM_SERVER()
        this.editorExit()
      })
    }
  }
}
</script>
