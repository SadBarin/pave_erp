<template>
  <div>
    <div class="page-title flex-between-center">
      <h3 class="right-margin-big">История редактирования сотрудника<br>{{employee.surname}} {{employee.name}}</h3>

      <div class="editor-btns">
        <router-link class="btn btn-hover pointer blue darken-1"
                     :to="{name : 'employeeEdit', params: {id: employee.id}}"
        >
          <i class="material-icons">create</i> В редактор
        </router-link>

        <router-link
          class="btn btn-hover blue darken-1"
          to="/employees"
        >
          <i class="material-icons">group</i> К сотрудникам
        </router-link>
      </div>
    </div>

    <section>
      <div v-for="(moment, i) of employee.history" :key="i">
        <div class="history-line">
          <p class="history-index">{{i}}:</p>
          <div class="history-moment">
            <span class="history-moment-date">{{moment.date}}</span>
            <p class="history-moment-text">{{moment.info}}</p>
            <router-link title="Перейти к сотруднику"
                         :to="{name : 'employeeEdit', params: {id: moment.employee.id}}"
            >
              {{moment.employee.name}}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'HistoryEmployees',
  data () {
    return {
      employee: ''
    }
  },
  computed: {
    ...mapGetters([
      'employees'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE'
    ])
  },
  mounted () {
    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
    this.employee = this.employees[this.$route.params.id]
  }
}
</script>
