<template>
  <div class="row">
    <Popup
      v-if="popupShow"
      v-on:yes="$emit('remove-city', city.id)"
      v-on:no="popupHidden"
      v-bind:popup-toast="`Город ${city.cityName} был удалён!`"
    >
      <template v-slot:title-popup>
        Удалить?
      </template>

      <template v-slot:text-info-popup>
        После нажатия кнопки "да" будет удалён город <b>{{city.cityName}}</b>
      </template>
    </Popup>

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
          <div class="flex-column-center">
            <router-link class="btn-floating transparent darken-2 waves-effect waves-light auth-submit white-text"
                    title="Новый редактор" :to="{name : 'cityEdit', params: {id: city.id}}"
            >
              <i class="material-icons">create</i>
            </router-link>

            <button class="btn-floating transparent darken-2 waves-effect waves-light auth-submit white-text"
                    title="Удалить"
                    v-if="!city.edited"
                    v-on:click="popupVisibility"
            >
              <i class="material-icons">delete</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Popup from '@/components/Popup'
export default {
  name: 'CardSites',
  components: {
    Popup
  },
  props: {
    city: {
      type: Object
    },
    index: Number
  },
  data () {
    return {
      sites: [],
      employees: [],

      popupShow: false,
      countEmployees: 0
    }
  },
  methods: {
    popupVisibility () {
      this.popupShow = true
    },

    popupHidden () {
      this.popupShow = false
    },

    amountEmployees () {
      try {
        const index = this.sites.findIndex((element) => element.id === this.city.id)

        this.employees.forEach((employee) => {
          if (employee.city === this.sites[index].cityName) {
            this.countEmployees++
          }
        })

        this.sites[index].employees = this.countEmployees
      } catch (e) {}

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

  .flex-center {
    display: flex;
    justify-content: flex-end;
  }
</style>
