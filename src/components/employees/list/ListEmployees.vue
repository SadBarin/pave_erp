<template>
  <section>
    <CardEmployees
      v-for="employee of employees"
      :key="employee.id"
      v-bind:employee="employee"
      v-on:remove-employee="removeEmployee"
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
  props: ['employees']
}
</script>

<style scoped>
  .row {
    margin-bottom: 0;
  }
</style>
