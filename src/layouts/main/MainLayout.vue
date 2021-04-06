<template>
  <transition>
    <div class="app-main-layout">
      <Popup
        v-if="popupShow"
        @yes="exit()"
        @no="popupHidden"
      >
        <template #title-popup>
          Выйти?
        </template>
      </Popup>

      <div class="sidenav-menu">
        <div class="navbar-left">
          <button
            class="btn transparent blue-text text-darken-1"
            @click.prevent="isOpen = !isOpen"
          >
            <i class="material-icons">menu</i>
          </button>
        </div>
      </div>

      <div class="sidenav app-sidenav" :class="{open: isOpen}">
        <div class="sidenav-content sidenav-top">
          <ul>
            <li>
              <AppLinkIcon link-content="Рабочие" link-icon="transfer_within_a_station" link-path="/workers"/>
            </li>
            <li>
              <AppLinkIcon link-content="Клиенты" link-icon="business_center" link-path="/customers"/>
            </li>
            <li>
              <AppLinkIcon link-content="Сделки" link-icon="attach_money" link-path="/deal"/>
            </li>
            <li>
              <AppLinkIcon link-content="Настройки" link-icon="settings" link-path="/settings"/>
            </li>
          </ul>
        </div>

        <div class="sidenav-content sidenav-bottom">
          <AppLinkIcon link-content="Выйти" link-icon="exit_to_app" link-path="/"/>
        </div>
      </div>

<!--      <MainSidenav :open="false"/>-->

      <main class="app-content">
        <div
          class="app-page"
          :class="{full: !isOpen}"
        >
          <router-view/>
        </div>
      </main>
    </div>
  </transition>
</template>

<script>
import popupMixin from '@/mixins/popupMixin'
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'

import AppLinkIcon from '@/components/AppLinkIcon'

export default {
  name: 'MainLayout.vue',

  components: { AppLinkIcon },

  mixins: [popupMixin],

  data () {
    return {
      isOpen: true
    }
  },

  computed: {
    ...mapGetters([
      'authEmployee'
    ])
  },

  created () {
    if (firebase.auth().currentUser === null) {
      this.$router.push('/')
      // eslint-disable-next-line no-undef
      M.toast({ html: 'Войдите в систему для продолжения!' })
    }
  },

  methods: {
    async exit () {
      await this.$store.dispatch('logout')
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  #app .btn.transparent:hover {
    color: var(--hover-color) !important;
    background: transparent;
  }

  #app .btn.transparent:hover .material-icons {
    color: var(--hover-color) !important;
  }

  .sidenav-bottom {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>
