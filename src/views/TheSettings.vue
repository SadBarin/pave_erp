<template>
  <div id="app-settings">
    <AppTopPanel header="Список настроек"/>

    <section class="settings-section">
      <div class="settings-block">
        <div class="settings-block-content">
          <AppLinkIcon link-content="Список городов" link-icon="location_city" link-path="/sites"/>
          <AppLinkIcon link-content="Список сотрудников" link-icon="group" link-path="/employees"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AppTopPanel from '@/components/AppTopPanel'
import AppLinkIcon from '@/components/AppLinkIcon'

export default {
  name: 'Settings.vue',
  components: { AppTopPanel, AppLinkIcon }
}
</script>

<style scoped>
  .settings-section {
    position: relative;
  }

  #app-settings .settings-header {
    margin: 1.6rem 0 2rem -1rem;
  }

  #app-settings .settings-block,
  #app-settings .settings-block-content {
    display: flex;
    flex-direction: column;
  }

  #app-settings .settings-block-content > * {
    font-size: 1.2rem !important;
  }
</style>
