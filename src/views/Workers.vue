<template>
  <div>
    <div class="page-title">
      <div class="title-container">
        <h3>Список рабочих</h3>

        <div class="title-btn-container">
          <button class="btn-floating btn-title blue darken-1 waves-effect waves-circle waves-light"
                  onclick="M.toast({html: 'Рабочие обновлены'})"
                  v-on:click="updateCollection('workers')"
          ><i class="material-icons">autorenew</i>
          </button>

          <router-link class="btn-floating btn-title blue darken-1 waves-effect waves-circle waves-light" to="/workers/search"><i class="material-icons">search</i>
          </router-link>
        </div>
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
