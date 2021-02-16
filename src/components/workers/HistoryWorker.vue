<template>
  <div>
    <div class="page-title flex-between-center">
      <h3 class="right-margin-big">История редактирования рабочего<br>"{{worker.surname}} {{worker.name}}"</h3>

      <div class="editor-btns">
        <router-link class="btn waves-effect waves-blue pointer blue darken-1"
                     :to="{name : 'workerEdit', params: {id: worker.id}}"
        >
          <i class="material-icons">create</i> В редактор
        </router-link>

        <router-link class="btn waves-effect waves-blue pointer blue darken-1"
                     to="/workers"
        >
          <i class="material-icons">transfer_within_a_station</i> К Рабочим
        </router-link>
      </div>
    </div>

    <section>
      <div v-for="(moment, i) of worker.history" :key="i">
        <div class="history-line">
          <p class="history-index">{{i}}:</p>
          <div class="history-moment">
            <span class="history-moment-date">{{moment.date}}</span>
            <p class="history-moment-text">{{moment.info}}</p>
            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Перейти к сотруднику"
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'HistoryWorkers',
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
  }
}
</script>
