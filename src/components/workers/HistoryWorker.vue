<template>
  <div>
    <div class="page-title flex-between-center">
      <h3 class="right-margin-big">История редактирования рабочего<br>"{{worker.surname}} {{worker.name}}"</h3>
      <NavWorker :worker="worker"/>
    </div>

    <section>
      <div v-for="(moment, i) of worker.history" :key="i">
        <div class="history-line">
          <p class="history-index">{{i}}:</p>
          <div class="history-moment">
            <span class="history-moment-date">{{moment.date}}</span>
            <p class="history-moment-text">{{moment.info}}</p>
            <router-link title="Перейти к сотруднику"
                         :to="{name : 'employeeEdit', params: {id: moment.employee.id}}"
            >
              {{moment.employee.name}}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavWorker from '@/components/workers/NavWorker'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'HistoryWorkers',
  components: { NavWorker },
  data () {
    return {
      worker: ''
    }
  },
  computed: {
    ...mapGetters([
      'workers'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_WORKERS_FROM_LOCAL_STORAGE'
    ])
  },
  mounted () {
    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.worker = this.workers[this.$route.params.id]
    console.log(this.worker)
  }
}
</script>
