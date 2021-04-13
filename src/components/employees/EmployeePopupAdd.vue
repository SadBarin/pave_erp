<template>
  <AppPopupWrapper :hidden="popupHidden">
    <AppTopPanel header="Добавление сотрудников">
      <template #nav-buttons>
        <AppButtonIcon icon="close" title="Закрыть окно" @button-click="$emit('popupToggle')"/>
      </template>
    </AppTopPanel>

    <div class="add-city-container">
      <EmployeesAdd
        @add-employee="$emit('addEmployee')"
        :employees="employees"
      />
    </div>
  </AppPopupWrapper>
</template>

<script>
import AppPopupWrapper from '@/components/AppPopupWrapper'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'
import EmployeesAdd from '@/components/employees/EmployeesAdd'

export default {
  name: 'EmployeePopupAdd',

  components: { AppPopupWrapper, AppTopPanel, AppButtonIcon, EmployeesAdd },

  props: {
    popupHidden: Boolean,
    employees: Object
  },

  data () {
    return {
      addedCity: {},
      firstNote: 'Город был создан'
    }
  }
}
</script>

<style scoped>

</style>
