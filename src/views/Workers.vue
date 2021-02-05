<template>
  <div>
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3 class="right-margin-big">Список рабочих</h3>

        <div class="flex-center">
          <button class="btn-transparent transparent btn-page-title blue-text text-darken-1"
                  title="Обновить страницу"
                  onclick="M.toast({html: 'Рабочие обновлены'})"
                  @click="updateWorkers()"
          ><i class="material-icons middle-material-icons">autorenew</i>
          </button>

          <router-link class="btn-transparent transparent btn-page-title blue-text text-darken-1" title="Начать поиск" to="/workers/search">
            <i class="material-icons middle-material-icons">search</i>
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
        @remove-worker="removeWorker"
        :workers="workers"
        :data-this-employee="dataThisEmployee"
      />
      <div v-else class="empty-list">
        <h5 class="empty-list-title"><i class="material-icons">mood_bad</i> Рабочих не осталось!</h5>
        <p>Добавьте рабочего, чтобы начать работать над ним.</p>
      </div>
    </section>
  </div>
</template>

<script>
import TableWorkers from '@/components/workers/TableWorkers'
import AddCardWorkers from '@/components/workers/AddCardWorkers'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Workers',
  components: { TableWorkers, AddCardWorkers },
  data () {
    return {
      updateTimeout: 60000
    }
  },
  computed: {
    ...mapGetters([
      'workers',
      'dataThisEmployee'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_WORKERS'
    ]),

    updateWorkers () {
      this.SET_WORKERS()
      console.log('Рабочие обновлены 🌀')
    },

    removeWorker (id) {
      const buffer = this.workers.filter(worker => worker.id !== id)
      console.log('Рабочий удалён 🗑️')
      this.SET_WORKERS(buffer)
    },

    addWorker (worker) {
      const buffer = this.workers
      buffer.push(worker)
      console.log('Рабочий добавлен ➕')
      this.SET_WORKERS(buffer)
    }
  },
  mounted () {
    this.updateWorkers()
    setInterval(() => this.updateWorkers(), this.updateTimeout)
  }
}
</script>
