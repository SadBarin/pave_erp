<template>
  <div>
    <ListWorkers
      v-if="!aboutStatus"
      @watch-about-worker="watchAboutWorker"
    />
  </div>
</template>

<script>
import ListWorkers from '@/components/workers/list/ListWorkers'
export default {
  name: 'Workers',
  components: { ListWorkers },
  data () {
    return {
      workers: [],
      aboutStatus: false,
      aboutWorkerStatus: '',

      updateTimeout: 60000
    }
  },
  methods: {
    removeWorker (id) {
      this.workers = this.workers.filter(worker => worker.id !== id)
      this.saveCollection(this.workers, 'workers')
    },

    addWorker (worker) {
      this.workers.push(worker)
      this.saveCollection(this.workers, 'workers')
    },

    saveCollection (collection, collectionName) {
      const parsed = JSON.stringify(collection)
      localStorage.setItem(collectionName, parsed)
    },

    editedWorkerStatus (id) {
      const index = this.workers.findIndex((element) => element.id === id)
      this.workers[index].edited = true
      this.saveCollection(this.workers, 'workers')
      this.$router.push('/workers/editor')
    },

    updateCollection (collectionName) {
      if (localStorage.getItem(collectionName)) {
        try {
          this.workers = JSON.parse(localStorage.getItem(collectionName))
        } catch (e) {
          localStorage.removeItem(collectionName)
        }
      }
    }
  },
  mounted () {
    this.updateCollection('workers')
    setInterval(() => this.updateCollection('workers'), this.updateTimeout)
  }
}
</script>
