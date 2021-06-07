<template>
  <AppHistoryWrapper :header='`История изменения сотрудника "${employee.surname} ${employee.name}"`' :element="employee">
    <template #nav-buttons>
      <AppButtonIcon icon="create" size="1.8rem" title="Редактировать" @button-click="$router.push({name : 'employeeEdit', params: {id: employee.id}})"/>
      <AppButtonIcon icon="group" size="1.8rem" title="Вернуться" @button-click="$router.push('/employees')"/>
    </template>
  </AppHistoryWrapper>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import AppHistoryWrapper from '../../AppHistoryWrapper'
import AppButtonIcon from '../../AppButtonIcon'

export default {
  name: 'HistoryEmployees',

  components: {
    AppHistoryWrapper,
    AppButtonIcon
  },

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

  created () {
    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
    this.employee = this.employees[this.$route.params.id]
  },

  methods: {
    ...mapMutations([
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE'
    ])
  }
}
</script>
