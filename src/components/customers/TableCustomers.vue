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
      Клиент <b>{{customer.name}} будет удалён</b>
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
    <tr v-for="customer in customers" :key="customer.value" :class="customer.status === 'Действующий' ? '' : 'opacity'">
        <td>{{customer.name}}</td>
        <td>{{customer.number}}</td>
        <td><a title="В целях безопасности, не сообщайте на сторонних сайтах ваших личных данных!" target="_blank" :href="customer.site">{{customer.site}}</a></td>
        <td>{{customer.email}}</td>
        <td>{{customer.address}}</td>
        <td>{{customer.manager}}</td>
        <td>
          <div v-if="customer.status === 'Действующий'" title="Действующий" class="circle green darken-1"></div>
          <div v-else title="Сотрудничество прервано" class="circle red darken-1"></div>
        </td>
        <td>
          <div class="flex-center">
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
  props: ['customers'],
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
  .circle {
    width: 1rem;
    height: 1rem;
    margin: 0 auto;
  }

  .opacity {
    color: grey;
  }
</style>
