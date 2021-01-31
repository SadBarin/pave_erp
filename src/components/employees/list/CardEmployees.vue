<template>
  <div class="row">
    <Popup
      v-if="popupShow"
      v-on:yes="$emit('remove-employee', employee.id)"
      v-on:no="popupHidden"
      v-bind:popup-toast="`${employee.surname} ${employee.name} ${(employee.sex === 'Женский')? ' была удалена' : ' был удалён!'}`"
    >
      <template v-slot:title-popup>
        Удалить?
      </template>

      <template v-slot:text-info-popup>
        {{employee.sex | sexDelete }} <b>{{employee.surname}} {{employee.name}}</b>
      </template>
    </Popup>

    <div class="col s12">
      <div class="card-panel blue darken-1 white-text">
        <div class="card-content dark-text card-line">
          <div class="info-container">
            <h6><i class="material-icons">email</i> Почта: {{employee.email}}</h6>
            <h6><i class="material-icons">person</i> Сотрудник: {{employee.surname}} {{employee.name}}</h6>
            <h6><i class="material-icons">location_city</i> Город: {{employee.city}}</h6>
            <p v-if="employee.edited" class="card-report">
              <i class="material-icons">report</i> Карточка сейчас редактируется другим сотрудником
            </p>
          </div>
          <div class="flex-column-center">
            <router-link class="btn-floating transparent darken-1 waves-effect waves-light auth-submit white-text"
                    title="Редактировать" :to="{name : 'employeeEdit', params: {id: employee.id}}"
            >
              <i class="material-icons">create</i>
            </router-link>

            <button class="btn-floating transparent darken-1 waves-effect waves-light auth-submit white-text"
                    title="Удалить"
                    v-if="!employee.edited"
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
  name: 'CardEmployees',
  components: {
    Popup
  },
  props: {
    employee: {
      type: Object
    },
    index: Number
  },
  data () {
    return {
      employees: [],

      popupShow: false
    }
  },
  methods: {
    popupVisibility () {
      this.popupShow = true
    },

    popupHidden () {
      this.popupShow = false
    },

    editedEmployeeStatus () {
      if (localStorage.getItem('employees')) {
        try {
          this.employees = JSON.parse(localStorage.getItem('employees'))
        } catch (e) {
          localStorage.removeItem('employees')
        }
      }

      const index = this.employees.findIndex((element) => element.id === this.employee.id)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.employees[index].edited = true
      this.saveEmployees()
      this.$router.push('/employees/editor')
    },

    saveEmployees () {
      const parsed = JSON.stringify(this.employees)
      localStorage.setItem('employees', parsed)
    }
  },
  filters: {
    sexDelete (sex) {
      if (sex === 'Женский') {
        return 'При нажатии кнопки "да" будет удалена работница '
      } else {
        return 'При нажатии кнопки "да" будет удалён рабочий '
      }
    }
  },
  mounted () {
    if (localStorage.getItem('employees')) {
      try {
        this.employees = JSON.parse(localStorage.getItem('employees'))
      } catch (e) {
        localStorage.removeItem('employees')
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

.flex-center {
  display: flex;
  justify-content: flex-end;
}
</style>
