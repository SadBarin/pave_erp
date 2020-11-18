<template>
  <div class="row">
    <template v-if="overlayShow">
      <div class="popup-overlay">
        <form class="card auth-card popup">
          <div class="card-content">
            <span class="card-title">Удалить элемент? <br></span>
            <span class="popup-subtitle">Город: {{city.cityName}}</span>
          </div>

          <div class="card-action btn-popup">
            <button type="submit"
                    class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
                    v-on:click="$emit('remove-city', city.id)"
            >
              <i class="material-icons">check</i> Да
            </button>

            <button type="submit"
                    class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
                    v-on:click="overlayHidden"
            >
              <i class="material-icons">clear</i> Нет
            </button>
          </div>
        </form>
      </div>
    </template>

    <div class="col s12">
      <div class="card-panel blue darken-1 white-text">
        <div class="card-content dark-text card-line">
          <div class="info-container">
            <h6><i class="material-icons">location_city</i> Город: {{city.cityName}}</h6>
            <h6><i class="material-icons">group</i> Количество сотрудников: {{city.employees}}</h6>
            <p class="card-report"
               v-if="city.edited"
            >
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
                    v-on:click="overlayVisibility"
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
      type: Object
    },
    index: Number
  },
  data () {
    return {
      sites: [{}],
      employees: [{}],

      overlayShow: false,
      countEmployees: 0
    }
  },
  methods: {
    overlayVisibility () {
      this.overlayShow = true
    },

    overlayHidden () {
      this.overlayShow = false
    },

    editedCityStatus () {
      const index = this.sites.findIndex((element) => element.id === this.city.id)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.sites[index].edited = true
      this.saveSites()
      this.$router.push('/sites/editor')
    },

    amountEmployees () {
      const index = this.sites.findIndex((element) => element.id === this.city.id)

      this.employees.forEach((employee) => {
        if (employee.city === this.sites[index].cityName) {
          this.countEmployees++
        }
      })

      this.sites[index].employees = this.countEmployees

      this.saveSites()
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

    if (localStorage.getItem('employees')) {
      try {
        this.employees = JSON.parse(localStorage.getItem('employees'))
      } catch (e) {
        localStorage.removeItem('employees')
      }
    }

    this.amountEmployees()
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
