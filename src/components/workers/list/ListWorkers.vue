<template>
  <div>
    <Popup
      v-if="popupShow"
      v-on:yes="removeWorker(worker.id)"
      v-on:no="popupHidden"
      v-bind:popup-toast="`${worker.surname} ${worker.name} ${(worker.sex === 'Женский')? ' была удалена' : ' был удалён!'}`"
    >
      <template v-slot:title-popup>
        Удалить?
      </template>

      <template v-slot:text-info-popup>
        {{worker.sex | sexMsgDelete }} <b>{{worker.surname}} {{worker.name}}</b>
      </template>
    </Popup>

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
        v-bind:eye="true"
        @popup-visibility="popupVisibility"
        @edited-worker-status="editedWorkerStatus"
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
      dataThisEmployee: '',
      popupShow: false,
      worker: '',

      updateTimeout: 60000
    }
  },
  methods: {
    popupVisibility (worker) {
      this.popupShow = true
      this.worker = worker

      console.log(worker)
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

      if (localStorage.getItem('dataThisEmployee')) {
        try {
          this.dataThisEmployee = JSON.parse(localStorage.getItem('dataThisEmployee'))
        } catch (e) {
          localStorage.removeItem('dataThisEmployee')
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
