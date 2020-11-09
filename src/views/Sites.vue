<template>
  <div>
    <div class="page-title">
      <h3>Список городов</h3>
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
</style>
