<template>
  <div>
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3 class="right-margin-big">Список сотрудников</h3>

        <div class="flex-center">
          <button class="btn-transparent transparent btn-page-title blue-text text-darken-1 "
                  onclick="M.toast({html: 'Сотрудники обновлены'})"
                  @click="SET_EMPLOYEES_FROM_SERVER()"
          ><i class="material-icons middle-material-icons">autorenew</i>
          </button>
        </div>
      </div>

      <AddCardEmployees
        @add-employee="addEmployee"
        :employees="employees"
      />
    </div>

    <div>
      <ListEmployees
        v-if="employees"
        :employees="employees"
        @remove-employee="removeEmployee"
      />
    </div>
  </div>
</template>

<script>
import ListEmployees from '@/components/employees/list/ListEmployees'
import AddCardEmployees from '@/components/employees/AddCardEmployees'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Employees',
  components: { ListEmployees, AddCardEmployees },
  data () {
    return {
      updateTimeout: 60000
    }
  },
  computed: {
    ...mapGetters([
      'employees'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_EMPLOYEES',
      'SET_EMPLOYEES_FROM_SERVER'
    ]),

    removeEmployee (id) {
      const buffer = this.employees.filter(employee => employee.id !== id)
      console.log('Сотрудник удалён 🗑️')
      this.SET_EMPLOYEES(buffer)
    },

    addEmployee (employee) {
      const buffer = this.employees
      buffer.push(employee)
      console.log('Сотрудник добавлен ➕')
      this.SET_EMPLOYEES(buffer)
    }
  },
  mounted () {
    this.SET_EMPLOYEES_FROM_SERVER()
    console.log('Employees:', this.employees)
  }
}
</script>
