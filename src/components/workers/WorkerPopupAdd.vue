<template>
  <AppPopupWrapper :hidden="popupHidden">
    <AppTopPanel header="Добавление рабочих">
      <template #nav-buttons>
        <AppButtonIcon icon="close" title="Закрыть окно" @button-click="$emit('popupToggle')"/>
      </template>
    </AppTopPanel>

    <div class="add-city-container">
      <WorkerAdd
        @add-employee="$emit('addEmployee')"
        :workers="workers"
      />
    </div>
  </AppPopupWrapper>
</template>

<script>
import AppPopupWrapper from '@/components/AppPopupWrapper'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'
import WorkerAdd from '@/components/workers/WorkerAdd'

export default {
  name: 'WorkerPopupAdd',

  components: {
    AppPopupWrapper,
    AppTopPanel,
    AppButtonIcon,
    WorkerAdd
  },

  props: {
    popupHidden: Boolean,
    workers: Object
  }
}
</script>

