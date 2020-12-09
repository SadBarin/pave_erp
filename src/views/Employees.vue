<template>
  <div>
    <div class="page-title">
      <div class="title-container">
        <h3>Список сотрудников</h3>

        <div class="title-btn-container">
          <button class="btn-floating btn-title blue darken-2 waves-effect waves-circle waves-light"
                  onclick="M.toast({html: 'Сотрудники обновлены'})"
                  v-on:click="updateCollection('employees')"
          ><i class="material-icons">autorenew</i>
          </button>
        </div>
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
      employees: [
        { id: 1, email: 'admin@admin.com', password: 'admin2020best', name: 'Захаров', surname: 'Иван', patronymic: 'Михайлович', homePhone: '', mobilePhone: '71272309753', city: 'Ульяновск', duty: 'Админ всея админства', access: 'true', edited: false }
      ],

      updateTimeout: 60000
    }
  },
  methods: {
    removeEmployee (id) {
      this.employees = this.employees.filter(employee => employee.id !== id)
      this.saveCollection(this.employees, 'employees')
    },

    addEmployee (email) {
      this.employees.push(email)
      this.saveCollection(this.employees, 'employees')
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
    this.saveCollection(this.employees, 'employees')
    this.updateCollection('employees')
    setInterval(() => this.updateCollection('employees'), this.updateTimeout)
  }
}
</script>
