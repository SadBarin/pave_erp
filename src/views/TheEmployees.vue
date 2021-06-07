<template>
  <div id="app-employees">
    <EmployeePopupAdd
      :popup-hidden="popupAddHidden"
      @popupToggle="popupAddToggle"
      @addEmployee="addEmployee"
      :employees="employees"
    />

    <AppTopPanel header="Список сотрудников">
      <template #nav-buttons>
        <AppButtonIcon icon="add" size="1.8rem" title="Добавить города" @button-click="popupAddToggle"/>
      </template>
    </AppTopPanel>

    <div>
      <EmployeesTable
        v-if="employees"
        :employees="employees"
        @remove-employee="removeEmployee"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

import EmployeesTable from '../components/section/employees/EmployeesTable'
import EmployeePopupAdd from '../components/section/employees/EmployeePopupAdd'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'

export default {
  name: 'Employees',

  components: {
    EmployeesTable,
    AppTopPanel,
    AppButtonIcon,
    EmployeePopupAdd
  },

  computed: {
    ...mapGetters([
      'employees'
    ])
  },

  data () {
    return {
      popupAddHidden: true
    }
  },

  created () {
    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
  },

  methods: {
    ...mapMutations([
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE',
      'SET_EMPLOYEES_FROM_SERVER'
    ]),

    ...mapActions([
      'registerEmployees'
    ]),

    popupAddToggle () {
      this.popupAddHidden = !this.popupAddHidden
    },

    removeEmployee (id) {
      firebase.database().ref('/employees/' + id).remove()
        .then(() => {
          this.SET_EMPLOYEES_FROM_SERVER()
          console.log('Сотрудник удалён 🗑️')
        })
    },

    async addEmployee (employee) {
      this.popupAddToggle()

      const regData = {
        email: employee.email,
        password: employee.password
      }

      employee.id = await this.registerEmployees(regData)

      firebase.database().ref('/employees/' + employee.id).set(employee)
        .then(() => {
          this.SET_EMPLOYEES_FROM_SERVER()
          console.log('Сотрудник добавлен ➕')
        })
    }
  }
}
</script>
