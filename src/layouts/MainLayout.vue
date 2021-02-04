<template>
  <div class="app-main-layout">
    <Popup
      v-if="popupShow"
      @yes="exit"
      @no="popupHidden"
      :popup-toast="`До свидания, ${this.dataThisEmployee.surname} ${this.dataThisEmployee.name}!`"
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
          <li>
            <router-link class="waves-effect waves-blue pointer" to="/workers/search">
              <i class="material-icons">search</i>
              Поиск рабочих
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

export default {
  name: 'MainLayout.vue',
  mixins: [popupMixin],
  data () {
    return {
      isOpen: true
    }
  },
  methods: {
    async exit () {
      await this.$store.dispatch('logout')
      await this.$router.push('/')
    }
  },
  mounted () {
    if (localStorage.getItem('dataThisEmployee')) {
      try {
        this.dataThisEmployee = JSON.parse(localStorage.getItem('dataThisEmployee'))
      } catch (e) {
        localStorage.removeItem('dataThisEmployee')
      }
    }

    console.log('Вошёл пользователь с id:', this.dataThisEmployee.id)

    try {
      if (this.dataThisEmployee.access !== 'admin') {
        this.permissions = false

        console.log('Доступ ограничен ⚠')
      }
    } catch (e) {
      console.log('Пользователь без пароля!')
      // eslint-disable-next-line no-undef
      M.toast({ html: 'Войдите в систему для продолжения.' })

      this.$router.push('/')
    }
  }
}
</script>
