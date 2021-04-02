<template>
  <div id="main-sidenav-container">
    <aside class="main-sidenav" v-if="open">
      <div class="main-sidenav-top">
        <AppLinkIcon link-content="Рабочие" link-icon="transfer_within_a_station" link-path="/workers"/>
        <AppLinkIcon link-content="Клиенты" link-icon="business_center" link-path="/customers"/>
        <AppLinkIcon link-content="Сделки" link-icon="attach_money" link-path="/deal"/>
        <AppLinkIcon link-content="Настройки" link-icon="settings" link-path="/settings"/>
      </div>

      <div class="main-sidenav-bottom">
        <AppLinkIcon link-content="Выйти" link-icon="exit_to_app" link-path="/"/>
      </div>
    </aside>

    <aside class="main-sidenav" v-else-if="!open">
      <div class="main-sidenav-top">
        <AppLinkIcon link-content="" link-icon="transfer_within_a_station" link-path="/workers"/>
        <AppLinkIcon link-content="" link-icon="business_center" link-path="/customers"/>
        <AppLinkIcon link-content="" link-icon="attach_money" link-path="/deal"/>
        <AppLinkIcon link-content="" link-icon="settings" link-path="/settings"/>
      </div>

      <div class="main-sidenav-bottom">
        <AppLinkIcon link-content="" link-icon="exit_to_app" link-path="/"/>
      </div>
    </aside>
  </div>
</template>

<script>
import AppLinkIcon from '@/components/AppLinkIcon'

export default {
  name: 'MainSidenav',

  props: {
    open: Boolean
  },

  components: { AppLinkIcon }
}
</script>

<style scoped>
  #main-sidenav-container {
    height: 100%;

    position: absolute;
    z-index: 100;
  }

  #main-sidenav-container .main-sidenav {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #main-sidenav-container .main-sidenav .main-sidenav-top,
  #main-sidenav-container .main-sidenav .main-sidenav-bottom {
    display: flex;
    flex-direction: column;
  }
</style>
