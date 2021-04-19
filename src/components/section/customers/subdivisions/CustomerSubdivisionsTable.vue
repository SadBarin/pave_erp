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
        <th>Менеджер</th>
        <th>Статус</th>
      </tr>
      <tr v-for="customer in customers" :key="customer.value" :class="customer.status === 'Действующий' ? '' : 'opacity-5'">
        <td>
          <div class="parent-clip-text">
            <p class="clip-text" :title="customer.name">{{customer.name}}</p>
          </div>
        </td>
        <td><a :href="'tel:' + customer.number" title="Позвонить">{{customer.number}}</a></td>
        <td>
          <div class="parent-clip-text">
            <a class="clip-text" :title="customer.site" target="_blank" :href="customer.site">{{customer.site}}</a>
          </div>
        </td>
        <td>
          <div class="parent-clip-text">
            <a class="clip-text" :href="'mailto:' + customer.email" :title="'Написать на почту: ' + customer.email">{{customer.email}}</a>
          </div>
        </td>
        <td>
          <div class="parent-clip-text">
            <p class="clip-text" :title="customer.address">{{customer.address}}</p>
          </div>
        </td>
        <td>
          <div class="parent-clip-text">
            <p class="clip-text" :title="customer.manager">{{customer.manager}}</p>
          </div>
        </td>
        <td>
          <div v-if="customer.status === 'Действующий'" title="Действующий" class="circle green darken-1"></div>
          <div v-else title="Сотрудничество прервано" class="circle red darken-1"></div>
        </td>
        <td>
          <div class="flex-center btns-collection">
            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Сотрудники"
                         :to="{name : 'subdivisionEmployees', params: {id: customerId, subId: customer.id}}"
            >
              <i class="material-icons">group</i>
            </router-link>

            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Просмотреть"
                         :to="{name : 'customerAboutSubdivision', params: {id: customerId, subId: customer.id}}"
            >
              <i class="material-icons">remove_red_eye</i>
            </router-link>

            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Редактировать"
                         :to="{name : 'customerEditSubdivision', params: {id: customerId, subId: customer.id}}"
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
  name: 'CustomerSubdivisionsTable',

  mixins: [popupMixin],

  props: { customers: Object, customerId: String },

  data () {
    return {
      customer: ''
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
