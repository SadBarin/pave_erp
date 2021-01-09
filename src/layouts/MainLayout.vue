<template>
  <div class="app-main-layout">
    <Popup
      v-if="popupShow"
      v-on:yes="exit"
      v-on:no="popupHidden"
      v-bind:popup-title="'Выйти?'"
      v-bind:popup-toast="'Вы вышли из системы'"
    />

    <nav class="navbar blue darken-1">
      <div class="navbar-left">
        <button
          class="btn btn-transparent transparent"
          v-on:click.prevent="isOpen = !isOpen"
        >
          <i class="material-icons">menu</i>
        </button>
      </div>

      <div class="navbar-right">
<!--        <button-->
<!--          class="btn-flat blue darken-2 waves-effect waves-light auth-submit white-text"-->
<!--          v-on:click="popupVisibility">-->
<!--          <i class="material-icons">arrow_back</i> Выйти-->
<!--        </button>-->

        <button
          class="btn btn-transparent transparent"
          v-on:click="popupVisibility"
        >
          Выйти
        </button>
      </div>
    </nav>

    <ul
      class="sidenav app-sidenav"
      v-bind:class="{open: isOpen}"
    >
      <li>
        <router-link class="waves-effect waves-blue pointer" to="/sites">
          <i class="material-icons">location_city</i>
          Города
        </router-link>
      </li>
      <li>
        <router-link class="waves-effect waves-blue waves-ripple pointer" to="/employees">
          <i class="material-icons">group</i>
          Сотрудники
        </router-link>
      </li>
      <li>
        <router-link class="waves-effect waves-blue pointer" to="/workers">
          <i class="material-icons">transfer_within_a_station</i>
          Рабочие
        </router-link>
      </li>
    </ul>

    <main class="app-content">
      <div
        class="app-page"
        v-bind:class="{full: !isOpen}"
      >
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script>
import Popup from '@/components/Popup'

export default {
  name: 'MainLayout.vue',
  components: {
    Popup
  },
  data () {
    return {
      popupShow: false,
      isOpen: true
    }
  },
  methods: {
    popupVisibility () {
      this.popupShow = true
    },

    popupHidden () {
      this.popupShow = false
    },

    exit () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
