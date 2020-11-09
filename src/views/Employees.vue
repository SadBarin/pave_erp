<template>
  <div>
    <div class="page-title">
      <h3>Список сотрудников</h3>
    </div>

    <section>
      <CardEmployees/>
    </section>
  </div>
</template>

<script>
import CardEmployees from '@/components/employees/CardEmployees'
export default {
  name: 'Employees',
  components: { CardEmployees }
}
</script>

<style scoped>
.row {
  margin-bottom: 0;
}
</style>
