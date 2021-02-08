<template>
  <section>
    <CardEmployees
      v-for="employee of employees"
      :key="employee.id"
      :employee="employee"
      @remove-employee="removeEmployee"
    />
  </section>
</template>

<script>
import CardEmployees from '@/components/employees/list/CardEmployees'
export default {
  name: 'ListEmployees',
  components: { CardEmployees },
  methods: {
    removeEmployee (id) {
      this.$emit('remove-employee', id)
    }
  },
  props: ['employees'],
  mounted () {
    console.log('Employees for:', this.employees)
  }
}
</script>
