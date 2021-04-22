<template>
  <transition>
    <div class="app-main-layout">
      <div class="sidenav-menu">
        <AppButtonIcon icon="menu" size="1.8rem" @button-click="isOpen = !isOpen"/>
      </div>

      <MainSidenav :open="isOpen"/>

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
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'

import MainSidenav from './MainSidenav'
import AppButtonIcon from '../../components/AppButtonIcon'

export default {
  name: 'MainLayout.vue',

  components: {
    MainSidenav,
    AppButtonIcon
  },

  data () {
    return {
      isOpen: false
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
  .app-main-layout .sidenav-menu {
    padding: 1.65rem 0.5rem 0.5rem 0.5rem;
  }
</style>
