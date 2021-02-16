<template>
  <div>
    <div class="page-title flex-between-center">
      <h3 class="title-clip">Календарь рабочего <br> "{{worker.surname}} {{worker.name}}"</h3>

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

    <section class="info-content">
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CalendarWorker',
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
  filters: {
    booleanToWord: function (boolean) {
      return (boolean === true) ? 'Да' : 'Нет'
    }
  },
  mounted () {
    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.worker = this.workers[this.$route.params.id]
  }
}
</script>
