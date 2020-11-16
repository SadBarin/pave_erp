<template>
  <div class="row">
    <div class="col s12">
      <div class="card-panel blue darken-1 white-text">
        <div class="card-content dark-text card-line">
          <div class="info-container">
            <h6><i class="material-icons">location_city</i> Город: {{city.cityName}}</h6>
            <h6><i class="material-icons">group</i> Количество сотрудников: {{city.employees}}</h6>
            <p v-if="city.edited" class="card-report">
              <i class="material-icons">report</i> Карточка сейчас редактируется другим сотрудником
            </p>
          </div>
          <div class="button-container">
            <button class="btn-flat waves-effect waves-light auth-submit white-text"
                         v-on:click="editedCityStatus"
                         v-if="!city.edited"
            >
              <i class="material-icons">create</i> Редактировать
            </button>
            <router-link class="btn-flat waves-effect waves-light auth-submit blue-text text-lighten-3"
                         to="/sites/editor"
                         v-if="city.edited"
            >
              <i class="material-icons">border_color</i> Редактировать принудительно
            </router-link>

            <button class="btn-flat waves-effect waves-light auth-submit white-text"
                    v-if="!city.edited"
                    v-on:click="$emit('remove-city', city.id)"
            >
              <i class="material-icons">delete</i> Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSites',
  props: {
    city: {
      type: Object,
      required: true
    },
    index: Number
  },
  data () {
    return {
      sites: [
        { id: 1, cityName: 'Минск', employees: 0, edited: false }]
    }
  },
  methods: {
    editedCityStatus () {
      const index = this.sites.findIndex((element) => element.id === this.city.id)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.sites[index].edited = true
      this.saveSites()
      this.$router.push('/sites/editor')
    },

    saveSites () {
      const parsed = JSON.stringify(this.sites)
      localStorage.setItem('sites', parsed)
    }
  },
  mounted () {
    if (localStorage.getItem('sites')) {
      try {
        this.sites = JSON.parse(localStorage.getItem('sites'))
      } catch (e) {
        localStorage.removeItem('sites')
      }
    }
  }
}
</script>

<style scoped>
  .row .col {
    padding: 0;
  }

  .card-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .info-container {
    width: 50%;
  }

  h6, .card-report {
    display: flex;
    align-items: center;
  }

  h6 .material-icons,
  .card-report .material-icons {
    margin-right: 10px;
  }

  .card-report {
    margin: 20px 0 0;
  }

  .btn-flat {
    margin-left: 10px;
  }

  .button-container {
    display: flex;
    justify-content: end;
  }
</style>
