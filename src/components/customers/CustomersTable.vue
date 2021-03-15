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
      <th>Наименование</th>
      <th>Телефон</th>
      <th>Сайт</th>
      <th>Почта</th>
      <th>Адрес</th>
    </tr>
    <tr v-for="customer in customers" :key="customer.value">
        <td>
          <div class="parent-clip-text">
            <p class="clip-text" :title="customer.name">{{customer.name}}</p>
          </div>
        </td>
        <td><a :href="'tel:' + customer.number" title="Позвонить">{{customer.subdivisions['0'].number}}</a></td>
        <td>
          <div class="parent-clip-text">
            <a class="clip-text" :title="customer.site" target="_blank" :href="customer.site">{{customer.subdivisions['0'].site}}</a>
          </div>
        </td>
        <td>
          <div class="parent-clip-text">
            <a class="clip-text" :href="'mailto:' + customer.email" :title="'Написать на почту: ' + customer.email">{{customer.subdivisions['0'].email}}</a>
          </div>
        </td>
        <td>
          <div class="parent-clip-text">
            <p class="clip-text" :title="customer.address">{{customer.subdivisions['0'].address}}</p>
          </div>
        </td>
        <td>
          <div class="flex-center btns-collection">
            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Подразделения"
                         :to="{name : 'customerSubdivisions', params: {id: customer.id}}"
            >
              <i class="material-icons">domain</i>
            </router-link>

            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Просмотреть"
                         :to="{name : 'customerAbout', params: {id: customer.id}}"
            >
              <i class="material-icons">remove_red_eye</i>
            </router-link>

            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Редактировать"
                         :to="{name : 'customerEdit', params: {id: customer.id}}"
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
  name: 'TableCustomers',

  mixins: [popupMixin],

  props: { customers: Object },

  data () {
    return {
      customer: ''
    }
  },

  created () {
    console.log(this.customers)
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
