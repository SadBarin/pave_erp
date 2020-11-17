<template>
  <div>
    <div class="page-title">
      <div class="title-container">
        <h3>Список рабочих</h3>

        <button class="btn-flat btn-update"
                v-on:click="update"
        ><i class="material-icons">autorenew</i>
        </button>
      </div>

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
  data () {
    return {
      workers: [],

      updateTimeout: 300000
    }
  },
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
    },

    update () {
      if (localStorage.getItem('workers')) {
        try {
          this.workers = JSON.parse(localStorage.getItem('workers'))
        } catch (e) {
          localStorage.removeItem('workers')
        }
      }
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

    setInterval(this.update, this.updateTimeout)
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
