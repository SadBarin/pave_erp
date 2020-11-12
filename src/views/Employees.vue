<template>
  <div>
    <div class="page-title">
      <h3>Список сотрудников</h3>

      <AddCardEmployees
        @add-employee="addEmployee"
      />
    </div>

    <section>
      <ListEmployees
        v-if="employees.length"
        v-bind:employees="employees"
        @remove-employee="removeEmployee"
      />
      <p v-else>Сотрудников не осталось!</p>
    </section>
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
    },

    addEmployee (name) {
      this.employees.push(name)
    }
  },
  data () {
    return {
      employees: [
        { id: 1, name: 'Артём', city: 'Москва' },
        { id: 2, name: 'Богдан', city: 'Москва' },
        { id: 3, name: 'Михаил', city: 'Москва' },
        { id: 4, name: 'Бенедикт', city: 'Москва' }
      ]
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
