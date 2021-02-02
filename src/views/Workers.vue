<template>
  <div>
    <ListWorkers/>
  </div>
</template>

<script>
import ListWorkers from '@/components/workers/list/ListWorkers'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Workers',
  components: { ListWorkers },
  data () {
    return {
      updateTimeout: 60000
    }
  },
  computed: {
    ...mapGetters([
      'workers'
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
      this.SET_SITES(buffer)
    },

    addWorker (worker) {
      const buffer = this.workers
      buffer.push(worker)
      console.log('Рабочий добавлен ➕')
      this.SET_SITES(buffer)
    }
  },
  mounted () {
    this.updateWorkers()
    setInterval(() => this.updateWorkers(), this.updateTimeout)
  }
}
</script>
