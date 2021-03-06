<template>
  <div class="container-page">
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3>Настройки</h3>
      </div>
    </div>

    <div class="info-content">
      <div>
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
import { mapGetters } from 'vuex'

export default {
  name: 'Settings.vue',

  created () {
    const tooltip = document.querySelectorAll('.tooltipped')
    tooltip.forEach((element) => {
      M.Tooltip.init(element)
    })
  },

  computed: {
    ...mapGetters([
      'authEmployee'
    ])
  }
}
</script>

<style scoped>
  h3 {
    margin-bottom: 0px !important;
  }
</style>
