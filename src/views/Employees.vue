<template>
  <div>
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3>Список сотрудников</h3>

        <div class="flex-center">
          <button class="btn-floating btn-page-title blue darken-1 waves-effect waves-circle waves-light"
                  onclick="M.toast({html: 'Сотрудники обновлены'})"
                  @click="updateEmployees"
          ><i class="material-icons">autorenew</i>
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
        v-if="employees.length"
        :employees="employees"
        @remove-employee="removeEmployee"
      />
      <div v-else class="empty-list">
        <h5 class="empty-list-title"><i class="material-icons">mood_bad</i>Сотрудников не осталось!</h5>
        <p>Добавьте сотрудника, чтобы начать работать над ним.</p>
      </div>
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
      'SET_EMPLOYEES'
    ]),

    updateEmployees () {
      this.SET_EMPLOYEES()
      console.log('Сотрудники обновлены 🌀')
    },

    removeEmployee (id) {
      const buffer = this.employees.filter(employee => employee.id !== id)
      console.log('Сотрудник удалён 🗑️')
      this.SET_EMPLOYEES(buffer)
    },

    addEmployee (email) {
      const buffer = this.employees
      buffer.push(email)
      console.log('Сотрудник добавлен ➕')
      this.SET_EMPLOYEES(buffer)
    }
  },
  mounted () {
    this.updateEmployees()
    setInterval(() => this.updateEmployees, this.updateTimeout)
  }
}
</script>
