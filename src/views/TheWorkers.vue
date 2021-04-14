<template>
  <div>
    <AppTopPanel header="Список рабочих">
      <template #nav-buttons>
        <AppButtonIcon icon="autorenew" title="Обновить страницу" @button-click="updateWorkers()"/>
        <AppButtonIcon icon="search" title="Поиск" @button-click="$router.push('/workers/search')"/>
        <AppButtonIcon icon="add" title="Добавить рабочего" @button-click="addWorker"/>
      </template>
    </AppTopPanel>

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
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'
import TableWorkers from '@/components/workers/WorkersTable'

export default {
  name: 'Workers',

  components: {
    AppTopPanel,
    AppButtonIcon,
    TableWorkers
  },

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
