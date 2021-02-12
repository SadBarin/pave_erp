<template>
  <div>
    <div class="page-title flex-between-center">
      <h3 class="title-clip">Информация о клиенте <br> "{{customer.name}}"</h3>

      <div class="editor-btns">
        <router-link class="btn waves-effect waves-blue pointer blue darken-1"
                     :to="{name : 'customerEdit', params: {id: customer.id}}"
        >
          <i class="material-icons">create</i> В редактор
        </router-link>

        <router-link class="btn waves-effect waves-blue pointer blue darken-1"
                     to="/customers"
        >
          <i class="material-icons">business_center</i> К Клиентам
        </router-link>
      </div>
    </div>

    <section class="info-content">
      <div class="margin-fix w35rem">
        <h5><i class="material-icons">business_center</i> Договоры</h5>
        <h6>Номер договора: <span>{{customer.contractNumber}}</span></h6>
        <h6>Дата договора: <span>{{customer.contractDate}}</span></h6>
      </div>

      <div class="margin-fix w35rem">
        <h5><i class="material-icons">local_phone</i> Контакты</h5>
        <h6>Номер: <span><a :href="'tel:' + customer.number">{{customer.number}}</a></span></h6>
        <h6>Факс: <span>{{customer.fax}}</span></h6>
        <h6>Почта: <span><a :href="'mailto:' + customer.email">{{customer.email}}</a></span></h6>
        <h6>Сайт: <span><a target="_blank" :href="customer.site">{{customer.site}}</a></span></h6>
        <h6>Адрес: <span>{{customer.address}}</span></h6>
      </div>

      <div class="margin-fix w35rem">
        <h5><i class="material-icons">assessment</i> Системная информация</h5>
        <h6>Наименование: <span>{{customer.name}}</span></h6>
        <h6>Примечание: <span>{{customer.note}}</span></h6>
        <h6>Менеджер: <span>{{customer.manager}}</span></h6>
        <h6>Состояние:
          <span v-if="customer.status === 'Действующий'" class="green-text">{{customer.status}}</span>
          <span v-else class="red-text">{{customer.status}}</span>
        </h6>
        <h6>Идентификационный номер: <span>{{customer.id}}</span></h6>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AboutCustomer',
  data () {
    return {
      customer: ''
    }
  },
  computed: {
    ...mapGetters([
      'customers'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE'
    ])
  },
  filters: {
    booleanToWord: function (boolean) {
      return (boolean === true) ? 'Да' : 'Нет'
    }
  },
  mounted () {
    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
    this.customer = this.customers[this.$route.params.id]
  }
}
</script>
