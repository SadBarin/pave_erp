<template>
<div>
  <AppTableWrapper>
    <template #table-content>
      <PopupDeleteWrapper
        :hidePopupStatus="popupRemoveHidden"
        @close-popup="popupRemoveToggle"
        @delete-element="removeEmployee(employee.id)"
        :header="`Удаление сотрудника ${employee.surname} ${employee.name}`"
      >
        <template #popup-delete-content>
          После нажатия кнопки "да" будет удалён сотрудник {{employee.surname}} {{employee.name}}!
        </template>
      </PopupDeleteWrapper>

      <AppTableWrapperRow>
        <template #row-content>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Почта</th>
          <th>Номер</th>
          <th>Город</th>
          <th>Должность</th>
          <th></th>
        </template>
      </AppTableWrapperRow>

      <template v-for="(element) in employees">
        <AppTableWrapperRow :key="element.id"
                            @db-click="$router.push({name : 'employeeEdit', params: {id: element.id}})">
          <template #row-content>
            <td :title="element.surname">{{element.surname}}</td>
            <td :title="element.name">{{element.name}}</td>

            <td>
              <a :href="'mailto:' + element.email"
                 :title="'Написать на почту: ' + element.email">
                {{element.email}}
              </a>
            </td>

            <td>
              <a :href="'tel:' + element.number"
                 title="Позвонить">
                {{element.mobilePhone}}
              </a>
            </td>

            <td :title="element.city">{{element.city}}</td>
            <td :title="element.duty">{{element.duty}}</td>

            <td class="row-action">
<!--              <AppButtonIcon icon="description" title="История" size="1.2rem" @button-click="$router.push({name : 'employeeHistory', params: {id: element.id}})"/>-->
              <AppButtonIcon icon="create" title="Редактировать" size="1.2rem" @button-click="$router.push({name : 'employeeEdit', params: {id: element.id}})"/>
              <AppButtonIcon icon="delete" title="Удалить" size="1.2rem" @button-click="popupRemoveToggle(element); employee = element"/>
            </td>
          </template>
        </AppTableWrapperRow>
      </template>
    </template>
  </AppTableWrapper>
</div>
</template>

<script>
import PopupDeleteWrapper from '../../popups/PopupDeleteWrapper'
import AppTableWrapper from '../../table/AppTableWrapper'
import AppTableWrapperRow from '../../table/AppTableWrapperRow'
import AppButtonIcon from '../../AppButtonIcon'

export default {
  name: 'TableEmployees',

  components: {
    PopupDeleteWrapper,
    AppButtonIcon,
    AppTableWrapper,
    AppTableWrapperRow
  },

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

    removeEmployee (id) {
      this.popupRemoveToggle()
      this.$emit('remove-employee', id)
    }
  }
}
</script>
