<template>
  <div>
    <div class="page-title">
      <div class="title-container">
        <h3>Список сотрудников</h3>

        <button class="btn-flat btn-update"
                v-on:click="update"
        ><i class="material-icons">autorenew</i>
        </button>
      </div>

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
      <div v-else class="empty-list">
        <h5 class="empty-list-title"><i class="material-icons">mood_bad</i> Сотрудников не осталось!</h5>
        <p>Добавьте сотрудника, чтобы начать работать над ним.</p>
      </div>
    </div>
  </div>
</template>

<script>
import ListEmployees from '@/components/employees/ListEmployees'
import AddCardEmployees from '@/components/employees/AddCardEmployees'
export default {
  name: 'Employees',
  components: { ListEmployees, AddCardEmployees },
  data () {
    return {
      employees: [],

      updateTimeout: 300000
    }
  },
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
    },

    update () {
      if (localStorage.getItem('employees')) {
        try {
          this.employees = JSON.parse(localStorage.getItem('employees'))
        } catch (e) {
          localStorage.removeItem('employees')
        }
      }
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

    setInterval(this.update, this.updateTimeout)
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
