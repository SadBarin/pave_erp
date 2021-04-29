<template>
  <div id="main-sidenav-container">
    <aside class="main-sidenav" v-if="open">
      <div class="main-sidenav-top">
        <AppLinkIcon link-content="Рабочие" link-icon="transfer_within_a_station"
                     link-path="/workers"
                     :pressed="$route.name === 'workers'"
        />

        <AppLinkIcon link-content="Клиенты" link-icon="business_center"
                     link-path="/customers"
                     :pressed="$route.name === 'customers'"
        />

        <AppLinkIcon link-content="Сделки" link-icon="attach_money"
                     link-path="/deals"
                     :pressed="$route.name === 'deals'"
        />

        <AppLinkIcon link-content="Настройки" link-icon="settings"
                     link-path="/settings"
                     :pressed="$route.name === 'settings'"
        />
      </div>

      <div class="main-sidenav-bottom">
        <AppLinkIcon link-content="Выйти" link-icon="exit_to_app" link-path="/"/>
      </div>
    </aside>

    <aside class="main-sidenav" v-else-if="!open">
      <div class="main-sidenav-top main-sidenav-button">
        <AppButtonIcon icon="transfer_within_a_station" size="1.8rem"
                       @button-click="$router.push('/workers')"
                       :pressed="$route.name === 'workers'"
        />

        <AppButtonIcon icon="business_center" size="1.8rem"
                       @button-click="$router.push('/customers')"
                       :pressed="$route.name === 'customers'"
        />

        <AppButtonIcon icon="attach_money" size="1.8rem"
                       @button-click="$router.push('/deals')"
                       :pressed="$route.name === 'deals'"
        />

        <AppButtonIcon icon="settings" size="1.8rem"
                       @button-click="$router.push('/settings')"
                       :pressed="$route.name === 'settings'"
        />
      </div>

      <div class="main-sidenav-bottom">
        <AppButtonIcon icon="exit_to_app" size="1.8rem" @button-click="$router.push('/')"/>
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

  components: { AppLinkIcon, AppButtonIcon }
}
</script>

<style scoped>
  #main-sidenav-container {
    opacity: 0.8;
    height: 100%;
    padding: 6.5rem 0.5rem 0.5rem 0.5rem;

    position: absolute;
    z-index: 100;
  }

  #main-sidenav-container .main-sidenav {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #main-sidenav-container .main-sidenav-button > *{
    margin-bottom: 1rem;
  }

  #main-sidenav-container .main-sidenav .main-sidenav-top,
  #main-sidenav-container .main-sidenav .main-sidenav-bottom {
    display: flex;
    flex-direction: column;
  }
</style>
