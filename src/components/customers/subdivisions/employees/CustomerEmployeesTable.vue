<template>
  <div>
    <Popup
      v-if="popupShow"
      @yes="removeCustomer(customer)"
      @no="popupHidden()"
      :popup-toast="`Клиент был удалён!`"
    >
      <template #title-popup>
        Удалить?
      </template>

      <template #text-info-popup>
        Клиент <b>{{customer.name}}</b> будет удалён
      </template>
    </Popup>

    <table>
      <tr>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Отчество</th>
        <th>Должность</th>
        <th>Почта</th>
      </tr>
      <tr v-for="customer in customers" :key="customer.value">
        <td>
          <div class="parent-clip-text">
            <p class="clip-text" :title="customer.name">{{customer.name}}</p>
          </div>
        </td>

        <td>
          <div class="parent-clip-text">
            <p class="clip-text" :title="customer.name">{{customer.surname}}</p>
          </div>
        </td>

        <td>
          <div class="parent-clip-text">
            <p class="clip-text" :title="customer.name">{{customer.patronymic}}</p>
          </div>
        </td>

        <td>
          <div class="parent-clip-text">
            <p class="clip-text" :title="customer.name">{{customer.post}}</p>
          </div>
        </td>

        <td>
          <div class="parent-clip-text">
            <p class="clip-text" :title="customer.name">{{customer.email}}</p>
          </div>
        </td>

        <td>
          <div class="flex-center btns-collection">
            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Просмотреть"
                         :to="{name : 'subdivisionAboutEmployee', params: {id: customerId, subId: subId, empId: customer.id}}"
            >
              <i class="material-icons">remove_red_eye</i>
            </router-link>

            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Редактировать"
                         :to="{name : 'subdivisionEditEmployee', params: {id: customerId, subId: subId, empId: customer.id}}"
            >
              <i class="material-icons">create</i>
            </router-link>

            <button class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                    title="Удалить"
                    v-if="!customer.edited"
                    @click="popupVisibility(customer); setCustomer(customer)"
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
import popupMixin from '@/mixins/popupMixin'

export default {
  name: 'CustomerEmployeesTable',

  mixins: [popupMixin],

  props: { customers: Object },

  data () {
    return {
      customer: ''
    }
  },

  computed: {
    subId () {
      return this.$route.params.subId
    },

    customerId () {
      return this.$route.params.id
    },

    empId () {
      return this.$route.params.empId
    }
  },

  methods: {
    setCustomer (customer) {
      this.customer = customer
    },

    removeCustomer (customer) {
      this.$emit('remove-customer', customer.id)
      this.popupHidden()
    }
  }
}
</script>

<style scoped>

</style>
