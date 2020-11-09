<template>
  <div>
    <div class="page-title">
      <h3>Список рабочих</h3>
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
</style>
