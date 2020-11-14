<template>
  <div class="app-main-layout" id="blue-layout">
    <nav class="navbar blue darken-1 ">
      <div class="navbar-left">
        <span class="white-text"></span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <router-link class="btn-flat waves-effect waves-light auth-submit white-text" to="/">
            <i class="material-icons">arrow_back</i> Выйти
          </router-link>
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
<!--      <li>-->
<!--        <router-link class="waves-effect waves-blue pointer" to="/sites">Найти рабочего</router-link>-->
<!--      </li>-->
    </ul>

    <main class="app-content">
      <div class="app-page">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainLayout.vue'
}
</script>

<style scoped>
  .btn-flat {
    margin: 0;
  }
</style>
