<template>
  <div>
    <div class="page-title">
      <h3>Список сотрудников</h3>
      <router-link class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" to="/sites/editor">Добавить сотрудника</router-link>
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

  .page-title {
    display: flex;
    justify-content: space-between;
  }
</style>
