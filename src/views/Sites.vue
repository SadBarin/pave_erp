<template>
  <div>
    <div class="page-title">
      <h3>Список городов</h3>
      <router-link class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" to="/sites/editor">Добавить город</router-link>
    </div>

    <section>
      <CardSites/>
      <CardSites/>
      <CardSites/>
    </section>
  </div>
</template>

<script>
import CardSites from '@/components/sites/CardSites'
export default {
  name: 'EditorSites',
  components: { CardSites }
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
