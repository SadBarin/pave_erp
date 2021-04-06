<template>
  <div id="app-deal">
    <AppTopPanel header="Список сделок">
      <template #nav-buttons>
        <AppButtonIcon icon="autorenew" title="Обновить сделки"/>
        <AppButtonIcon icon="add" title="Добавить сделки"/>
      </template>
    </AppTopPanel>
  </div>
</template>

<script>
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'

export default {
  name: 'TheDeal',

  components: { AppTopPanel, AppButtonIcon }
}
</script>
