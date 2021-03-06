<template>
  <div>
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3 class="right-margin-big">Список рабочих</h3>

        <div class="flex-center">
          <button class="btn-transparent transparent btn-page-title blue-text text-darken-1"
                  title="Обновить страницу"
                  @click="updateWorkers"
          ><i class="material-icons middle-material-icons">autorenew</i>
          </button>

          <router-link class="btn-transparent transparent btn-page-title blue-text text-darken-1" title="Начать поиск" to="/workers/search">
            <i class="material-icons middle-material-icons">search</i>
          </router-link>
        </div>
      </div>

      <AddCardWorkers
        @add-worker="addWorker"
        :workers="workers"
      />
    </div>

    <section>
      <TableWorkers
        v-if="workers"
        @remove-worker="removeWorker"
        :workers="workers"
      />
    </section>
  </div>
</template>

<script>
import TableWorkers from '@/components/workers/WorkersTable'
import AddCardWorkers from '@/components/workers/WorkerAdd'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'Workers',

  components: { TableWorkers, AddCardWorkers },

  computed: {
    ...mapGetters([
      'workers'
    ])
  },

  created () {
    this.SET_WORKERS_FROM_LOCAL_STORAGE()
  },

  methods: {
    ...mapMutations([
      'SET_WORKERS_FROM_SERVER',
      'SET_WORKERS_FROM_LOCAL_STORAGE'
    ]),

    removeWorker (id) {
      firebase.database().ref('/workers/' + id).remove()
        .then(() => {
          this.SET_WORKERS_FROM_SERVER()
          console.log('Рабочий удалён 🗑️')
        })
    },

    addWorker (worker) {
      firebase.database().ref('/workers/' + worker.id).set(worker)
        .then(() => {
          this.SET_WORKERS_FROM_SERVER()
          console.log('Рабочий добавлен ➕')
        })
    },

    updateWorkers () {
      this.SET_WORKERS_FROM_SERVER()
      // eslint-disable-next-line no-undef
      M.toast({ html: 'Сотрудники обновлены' })
    }
  }
}
</script>
