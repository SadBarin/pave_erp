<template>
  <div>
    <Popup
      v-if="popupShow"
      v-on:yes="removeWorker(worker)"
      v-on:no="popupHidden"
      v-bind:popup-title="'Удалить рабочего?'"
      v-bind:popup-toast="'Рабочий был удалён'"
    />

    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3>Список рабочих</h3>

        <div class="flex-center">
          <button class="btn-floating btn-page-title blue darken-1 waves-effect waves-circle waves-light"
                  onclick="M.toast({html: 'Рабочие обновлены'})"
                  v-on:click="updateCollection('workers')"
          ><i class="material-icons">autorenew</i>
          </button>

          <router-link class="btn-floating btn-page-title blue darken-1 waves-effect waves-circle waves-light" to="/workers/search"><i class="material-icons">search</i>
          </router-link>
        </div>
      </div>

      <AddCardWorkers
        @add-worker="addWorker"
      />
    </div>

    <section>
      <TableWorkers
        v-if="workers.length"
        v-bind:workers="workers"
        @popup-visibility="popupVisibility"
        @edited-worker-status="editedWorkerStatus"
        @watch-about-worker="watchAboutWorker"
      />
      <div v-else class="empty-list">
        <h5 class="empty-list-title"><i class="material-icons">mood_bad</i> Рабочих не осталось!</h5>
        <p>Добавьте рабочего, чтобы начать работать над ним.</p>
      </div>
    </section>
  </div>
</template>

<script>
import AddCardWorkers from '@/components/workers/AddCardWorkers'
import TableWorkers from '@/components/workers/list/TableWorkers'
import Popup from '@/components/Popup'
export default {
  name: 'ListWorkers',
  components: { AddCardWorkers, TableWorkers, Popup },
  data () {
    return {
      workers: [],
      popupShow: false,
      worker: '',

      updateTimeout: 60000
    }
  },
  methods: {
    watchAboutWorker (id) {
      this.$emit('watch-about-worker', id)
    },

    popupVisibility (id) {
      this.popupShow = true
      this.worker = id
    },

    popupHidden () {
      this.popupShow = false
    },

    removeWorker (id) {
      this.workers = this.workers.filter(worker => worker.id !== id)
      this.saveCollection(this.workers, 'workers')
      this.popupHidden()
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
