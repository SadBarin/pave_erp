<template>
  <div>
    <AppTopPanel :header="`Статистика сделок рабочего ${worker.surname} ${worker.name}`">
      <template #nav-buttons>
        <WorkerNavigation :worker="worker"/>
      </template>
    </AppTopPanel>

    <section>
      <AppTableWrapper>
        <template #table-content>
          <AppTableWrapperRow>
            <template #row-content>
              <th>Сделка</th>
              <th>Дата</th>
              <th>Время</th>
            </template>
          </AppTableWrapperRow>

          <template v-for="(element) in worker">
            <AppTableWrapperRow :key="element.id">
              <template #row-content>
              </template>
            </AppTableWrapperRow>
          </template>
        </template>
      </AppTableWrapper>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import AppTopPanel from '../../AppTopPanel'
import WorkerNavigation from './WorkerNavigation'
import AppTableWrapper from '../../table/AppTableWrapper'
import AppTableWrapperRow from '../../table/AppTableWrapperRow'

export default {
  name: 'WorkerStatisticsTable',

  components: {
    AppTopPanel,
    WorkerNavigation,
    AppTableWrapper,
    AppTableWrapperRow
  },

  data () {
    return {
      worker: '',

      popupRemoveHidden: true
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
    ]),

    popupRemoveToggle () {
      this.popupRemoveHidden = !this.popupRemoveHidden
    }
  }
}
</script>
