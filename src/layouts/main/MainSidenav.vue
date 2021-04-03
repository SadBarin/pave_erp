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
        <AppButtonIcon material-icon="transfer_within_a_station" @button-click="$router.push('/workers')"/>
        <AppButtonIcon material-icon="business_center" @button-click="$router.push('/customers')"/>
        <AppButtonIcon material-icon="attach_money" @button-click="$router.push('/deal')"/>
        <AppButtonIcon material-icon="settings" @button-click="$router.push('/settings')"/>
      </div>

      <div class="main-sidenav-bottom">
        <AppButtonIcon material-icon="exit_to_app" @button-click="$router.push('/')"/>
      </div>
    </aside>
  </div>
</template>

<script>
import AppLinkIcon from '@/components/AppLinkIcon'
import AppButtonIcon from '@/components/AppButtonIcon'

export default {
  name: 'MainSidenav',

  props: {
    open: Boolean
  },

  components: { AppLinkIcon, AppButtonIcon },

  created () {
    console.log(this.$router)
  }
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
