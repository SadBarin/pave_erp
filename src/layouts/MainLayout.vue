<template>
  <div class="app-main-layout" id="blue-layout">
    <nav class="navbar blue darken-1 ">
      <div class="navbar-left">
        <span class="white-text">Сегодня 4 ноября 2020 года</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger white-text" href="#" data-target="dropdown">ВАША ПОЧТА</a>
        </li>
      </ul>
    </nav>

    <ul class="sidenav app-sidenav open">
      <li>
        <a href="sites.html" class="waves-effect waves-blue pointer">Города</a>
      </li>
      <li>
        <a href="addEmployees.html" class="waves-effect waves-blue pointer">Пригласить сотрудника</a>
      </li>
      <li>
        <a href="addWorkers.html" class="waves-effect waves-blue pointer">Добавить рабочего</a>
      </li>
      <li>
        <a href="searchWorkers.html" class="waves-effect waves-blue pointer">Найти рабочего</a>
      </li>
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
