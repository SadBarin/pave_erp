<template>
  <div class="app-main-layout" id="blue-layout">
    <nav class="navbar blue darken-1 ">
      <div class="navbar-left">
        <span class="white-text"></span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger white-text" href="#" data-target="dropdown">ВАША ПОЧТА</a>
        </li>
      </ul>
    </nav>

    <ul class="sidenav app-sidenav open">
      <li>
        <router-link class="waves-effect waves-blue pointer" to="/sites">Города</router-link>
      </li>
      <li>
        <router-link class="waves-effect waves-blue pointer" to="/addEmployees">Сотрудники</router-link>
      </li>
      <li>
        <router-link class="waves-effect waves-blue pointer" to="/addWorkers">Рабочие</router-link>
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

</style>
