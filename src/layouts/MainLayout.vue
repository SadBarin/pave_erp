<template>
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
          class="btn transparent black-text"
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
            <router-link class="waves-effect waves-blue pointer" to="/workers">
              <i class="material-icons">transfer_within_a_station</i>
              Рабочие
            </router-link>
          </li>
<!--          <li>-->
<!--            <router-link class="waves-effect waves-blue pointer" to="/workers/search">-->
<!--              <i class="material-icons">search</i>-->
<!--              Поиск рабочих-->
<!--            </router-link>-->
<!--          </li>-->
          <li>
            <router-link class="waves-effect waves-blue pointer" to="/customers">
              <i class="material-icons">business_center</i>
              Клиенты
            </router-link>
          </li>
          <li>
            <router-link class="waves-effect waves-blue pointer" to="/settings">
              <i class="material-icons">settings</i>
              Настройки
            </router-link>
          </li>
        </ul>
      </div>

      <div class="sidenav-content sidenav-bottom">
        <button
          class="btn transparent black-text"
          @click="popupVisibility"
        >
          <i class="material-icons">exit_to_app</i>
          Выйти
        </button>
      </div>
    </div>

    <main class="app-content">
      <div
        class="app-page"
        :class="{full: !isOpen}"
      >
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script>
import popupMixin from '@/mixins/popupMixin'
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'

export default {
  name: 'MainLayout.vue',
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
  methods: {
    async exit () {
      await this.$store.dispatch('logout')
      await this.$router.push('/')
    }
  },
  mounted () {
    if (firebase.auth().currentUser === null) {
      this.$router.push('/')
      // eslint-disable-next-line no-undef
      M.toast({ html: 'Войдите в систему для продолжения!' })
    }
  }
}
</script>
