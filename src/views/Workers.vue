<template>
  <div>
    <div class="page-title">
      <h3>Список рабочих</h3>

      <AddCardWorkers
        @add-worker="addWorker"
      />
    </div>

    <div>
      <ListWorkers
        v-if="workers.length"
        v-bind:workers="workers"
        @remove-worker="removeWorker"
      />
      <div v-else class="empty-list">
        <h5 class="empty-list-title"><i class="material-icons">mood_bad</i> Рабочих не осталось!</h5>
        <p>Добавьте рабочего, чтобы начать работать над ним.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AddCardWorkers from '@/components/workers/AddCardWorkers'
import ListWorkers from '@/components/workers/ListWorkers'
export default {
  name: 'Workers',
  components: { ListWorkers, AddCardWorkers },
  methods: {
    removeWorker (id) {
      this.workers = this.workers.filter(worker => worker.id !== id)
      this.saveWorkers()
    },

    addWorker (worker) {
      this.workers.push(worker)
      this.saveWorkers()
    },

    saveWorkers () {
      const parsed = JSON.stringify(this.workers)
      localStorage.setItem('workers', parsed)
    }
  },
  data () {
    return {
      workers: [
        { id: 1, name: 'Зубило', edited: false }
      ]
    }
  },
  mounted () {
    if (localStorage.getItem('workers')) {
      try {
        this.workers = JSON.parse(localStorage.getItem('workers'))
      } catch (e) {
        localStorage.removeItem('workers')
      }
    }
  }
}
</script>

<style scoped>
  .page-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
