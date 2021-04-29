<template>
  <AppHistoryWrapper :header='`История изменения рабочего "${worker.surname} ${worker.name}"`' :element="worker">
    <template #nav-buttons>
<!--      <AppButtonIcon icon="date_range" size="1.8rem" title="Календарь" @button-click="$router.push({name : 'workerCalendar', params: {id: worker.id}})"/>-->
<!--      <AppButtonIcon icon="create" size="1.8rem" title="Редактировать" @button-click="$router.push({name : 'workerEdit', params: {id: worker.id}})"/>-->
<!--      <AppButtonIcon icon="transfer_within_a_station" size="1.8rem" title="Вернуться" @button-click="$router.push('/workers')"/>-->

      <WorkerNavigation :worker="worker"/>
    </template>
  </AppHistoryWrapper>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import AppHistoryWrapper from '../../AppHistoryWrapper'
import WorkerNavigation from './WorkerNavigation'

export default {
  name: 'HistoryWorkers',

  components: {
    AppHistoryWrapper,
    WorkerNavigation
  },

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

  created () {
    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.worker = this.workers[this.$route.params.id]
  },

  methods: {
    ...mapMutations([
      'SET_WORKERS_FROM_LOCAL_STORAGE'
    ])
  }
}
</script>
