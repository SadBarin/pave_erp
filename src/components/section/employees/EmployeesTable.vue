<template>
<div>
  <PopupDeleteWrapper
    :hidePopupStatus="popupRemoveHidden"
    @close-popup="popupRemoveToggle"
    @delete-element="removeEmployee(employee.id)"
    :header="`Удаление сотрудника`"
  >
    <template #popup-delete-content>
      После нажатия кнопки "да" будет удалён сотрудник!
    </template>
  </PopupDeleteWrapper>

  <table>
    <tr>
      <th>Фамилия</th>
      <th>Имя</th>
      <th>Почта</th>
      <th>Номер</th>
      <th>Город</th>
      <th>Должность</th>
    </tr>
    <tr v-for="employee in employees" :key="employee.value">
      <td>
        <div class="parent-clip-text">
          <p class="clip-text" :title="employee.surname">{{employee.surname}}</p>
        </div>
      </td>
      <td>
        <div class="parent-clip-text">
          <p class="clip-text" :title="employee.name">{{employee.name}}</p>
        </div>
      </td>
      <td>
        <div class="parent-clip-text">
          <a class="clip-text" :href="'mailto:' + employee.email" :title="'Написать на почту: ' + employee.email">{{employee.email}}</a>
        </div>
      </td>
      <td><a :href="'tel:' + employee.number" title="Позвонить">{{employee.mobilePhone}}</a></td>
      <td>
        <div class="parent-clip-text">
          <p class="clip-text" :title="employee.city">{{employee.city}}</p>
        </div>
      </td>
      <td>
        <div class="parent-clip-text">
          <p class="clip-text" :title="employee.duty">{{employee.duty}}</p>
        </div>
      </td>
      <td>
        <div class="flex-center btns-collection">
          <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                       title="История редактирования"
                       :to="{name : 'employeeHistory', params: {id: employee.id}}"
          >
            <i class="material-icons">description</i>
          </router-link>

          <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                       title="Редактировать"
                       :to="{name : 'employeeEdit', params: {id: employee.id}}"
          >
            <i class="material-icons">create</i>
          </router-link>

          <button class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                  title="Удалить"
                  @click="popupRemoveToggle(); setEmployee(employee)"
          >
            <i class="material-icons">delete</i>
          </button>
        </div>
      </td>
    </tr>
  </table>
</div>
</template>

<script>
import PopupDeleteWrapper from '@/components/popups/PopupDeleteWrapper'

export default {
  name: 'TableEmployees',

  components: { PopupDeleteWrapper },

  props: { employees: Object },

  data () {
    return {
      employee: '',
      popupRemoveHidden: true
    }
  },

  methods: {
    popupRemoveToggle () {
      this.popupRemoveHidden = !this.popupRemoveHidden
    },

    setEmployee (employee) {
      this.employee = employee
    },

    removeEmployee (id) {
      this.popupRemoveToggle()
      this.$emit('remove-employee', id)
    }
  }
}
</script>
