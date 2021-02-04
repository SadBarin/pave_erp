<template>
  <div class="container-page">
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3>Настройки</h3>
      </div>
    </div>

    <div class="info-content">
      <div>
        <h5>Локальные настройки <a class="tooltipped" data-position="right" data-tooltip="Настройки применяются только для пользователя"><i class="material-icons">info</i></a></h5>
        <h6>Автообновление страниц через: <span><input class="info-input" type="number"> мс.</span></h6>
      </div>
      <div>
        <h5>Глобальные настройки <a class="tooltipped" data-position="right" data-tooltip="Настройки применяются для всей системы"><i class="material-icons">info</i></a></h5>
        <h6>
          <router-link class="pointer" to="/sites">
            <i class="material-icons">location_city</i>
            Настроить города
          </router-link>
        </h6>
        <h6>
          <router-link class="pointer" to="/employees">
            <i class="material-icons">group</i>
            Настроить сотрудников
          </router-link>
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'

export default {
  name: 'Settings.vue',
  mounted () {
    const tooltip = document.querySelectorAll('.tooltipped')
    tooltip.forEach((element) => {
      M.Tooltip.init(element)
    })
  }
}
</script>
