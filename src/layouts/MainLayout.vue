<template>
  <div class="app-main-layout" id="blue-layout">
    <template v-if="overlayShow">
      <div class="popup-overlay">
        <form class="card auth-card popup">
          <div class="card-content">
            <span class="card-title">Выйти? <br></span>
          </div>

          <div class="card-action btn-popup">
            <button
              type="submit"
              class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
              v-on:click="exit"
            >
              <i class="material-icons">check</i> Да
            </button>

            <button
              type="submit"
              class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
              v-on:click="overlayHidden"
            >
              <i class="material-icons">clear</i> Нет
            </button>
          </div>
        </form>
      </div>
    </template>

    <nav class="navbar blue darken-1 ">
      <div class="navbar-left">
        <span class="white-text"></span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <button class="btn-flat waves-effect waves-light auth-submit white-text" v-on:click="overlayVisibility">
            <i class="material-icons">arrow_back</i> Выйти
          </button>
        </li>
      </ul>
    </nav>

    <ul class="sidenav app-sidenav open">
      <li>
        <router-link class="waves-effect waves-blue pointer" to="/sites"><i class="material-icons">location_city</i> Города</router-link>
      </li>
      <li>
        <router-link class="waves-effect waves-blue pointer" to="/employees"><i class="material-icons">group</i> Сотрудники</router-link>
      </li>
      <li>
        <router-link class="waves-effect waves-blue pointer" to="/workers"><i class="material-icons">transfer_within_a_station</i> Рабочие</router-link>
      </li>
    </ul>

    <main class="app-content">
      <div class="app-page">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainLayout.vue',
  data () {
    return {
      overlayShow: false
    }
  },
  methods: {
    overlayVisibility () {
      this.overlayShow = true
    },

    overlayHidden () {
      this.overlayShow = false
    },

    exit () {
      this.$router.push('/')
    }
  }
}
</script>
