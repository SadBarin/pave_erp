<template>
  <div>
    <div class="page-title">
      <h3>Список сотрудников</h3>

      <AddCardEmployees
        @add-employee="addEmployee"
      />
    </div>

    <div>
      <ListEmployees
        v-if="employees.length"
        v-bind:employees="employees"
        @remove-employee="removeEmployee"
      />
      <p v-else>Сотрудников не осталось!</p>
    </div>
  </div>
</template>

<script>
import ListEmployees from '@/components/employees/ListEmployees'
import AddCardEmployees from '@/components/employees/AddCardEmployees'
export default {
  name: 'Employees',
  components: { ListEmployees, AddCardEmployees },
  methods: {
    removeEmployee (id) {
      this.employees = this.employees.filter(employee => employee.id !== id)
      this.saveEmployees()
    },

    addEmployee (email) {
      this.employees.push(email)
      this.saveEmployees()
    },

    saveEmployees () {
      const parsed = JSON.stringify(this.employees)
      localStorage.setItem('employees', parsed)
    }
  },
  data () {
    return {
      employees: [
        { id: 1, email: 'admin@admin.by', name: 'Админ', city: 'Минск' }
      ]
    }
  },
  mounted () {
    if (localStorage.getItem('employees')) {
      try {
        this.employees = JSON.parse(localStorage.getItem('employees'))
      } catch (e) {
        localStorage.removeItem('employees')
      }
    }
  }
}
</script>

<style scoped>
  .row {
    margin-bottom: 0;
  }

  .page-title {
    display: flex;
    justify-content: space-between;
  }
</style>
