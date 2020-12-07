<template>
  <section class="workers_section">
    <CardWorkers
      v-for="worker of workers"
      :key="worker.id"
      v-bind:worker="worker"
      v-on:remove-worker="removeWorker"
    />
  </section>
</template>

<script>
import CardWorkers from '@/components/workers/CardWorkers'
export default {
  name: 'ListWorkers',
  components: { CardWorkers },
  methods: {
    removeWorker (id) {
      this.$emit('remove-worker', id)
    }
  },
  props: ['workers']
}
</script>

<style scoped>
  .row {
    margin-bottom: 0;
  }
</style>
