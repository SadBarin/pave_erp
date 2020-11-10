<template>
  <div>
    <div class="page-title">
      <h3>Список рабочих</h3>
      <router-link class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" to="/sites/editor">Добавить рабочего</router-link>
    </div>

    <section>
      <CardWorkers />
    </section>
  </div>
</template>

<script>
import CardWorkers from '@/components/workers/CardWorkers'
export default {
  name: 'Workers',
  components: { CardWorkers }
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
