<template>
  <div class="row">
    <template v-if="overlayShow">
      <div class="popup-overlay">
        <form class="card auth-card popup">
          <div class="card-content">
            <span class="card-title">Удалить элемент? <br></span>
            <span class="popup-subtitle">Сотрудник: {{employee.name}}</span>
          </div>

          <div class="card-action btn-popup">
            <button type="submit"
                    class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
                    v-on:click="$emit('remove-employee', employee.id)"
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
            <h6><i class="material-icons">email</i> Почта: {{employee.email}}</h6>
            <h6><i class="material-icons">person</i> Сотрудник: {{employee.name}} {{employee.surname}} {{employee.patronymic}}</h6>
            <h6><i class="material-icons">location_city</i> Город: {{employee.city}}</h6>
            <p v-if="employee.edited" class="card-report">
              <i class="material-icons">report</i> Карточка сейчас редактируется другим сотрудником
            </p>
          </div>
          <div class="button-container">
            <button class="btn-flat waves-effect waves-light auth-submit white-text"
                    v-on:click="editedEmployeeStatus"
                    v-if="!employee.edited"
            >
              <i class="material-icons">create</i> Редактировать
            </button>
            <router-link class="btn-flat waves-effect waves-light auth-submit blue-text text-lighten-3"
                         to="/employees/editor"
                         v-if="employee.edited"
            >
              <i class="material-icons">border_color</i> Редактировать принудительно
            </router-link>

            <button class="btn-flat waves-effect waves-light auth-submit white-text"
                    v-if="!employee.edited"
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
  name: 'CardEmployees',
  props: {
    employee: {
      type: Object,
      required: true
    },
    index: Number
  },
  data () {
    return {
      employees: [
        { id: 1, employeeName: 'Минск', edited: false }],

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

    editedEmployeeStatus () {
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

.button-container {
  display: flex;
  justify-content: end;
}
</style>
