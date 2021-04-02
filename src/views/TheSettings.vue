<template>
  <div id="app-settings">
    <div class="settings-header">
      <AppHeaderIcon header-level="3" material-icon="" header-text="Настройки"/>
    </div>

    <div class="settings-content">
      <AppLinkIcon link-content="Список городов" link-icon="location_city" link-path="/sites"/>
      <AppLinkIcon link-content="Список сотрудников" link-icon="group" link-path="/employees"/>
    </div>
  </div>
</template>

<script>
import AppHeaderIcon from '@/components/AppHeaderIcon'
import AppLinkIcon from '@/components/AppLinkIcon'

export default {
  name: 'Settings.vue',
  components: { AppHeaderIcon, AppLinkIcon }
}
</script>

<style scoped>
  #app-settings .settings-header {
    margin: 1.6rem 0 2rem -1rem;
  }

  #app-settings .settings-content {
    display: flex;
    flex-direction: column;
  }
</style>
