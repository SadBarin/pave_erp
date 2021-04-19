<template>
  <div>
    <div class="page-title flex-between-center">
      <h3 class="title-clip">Информация о подразделении <br> "{{customer.name}}"</h3>

      <div class="editor-btns">
        <router-link class="btn btn-hover pointer blue darken-1"
                     :to="{name : 'customerSubdivisions', params: {id: customerId}}"
        >
          <i class="material-icons">domain</i> К подразделениям
        </router-link>

        <router-link class="btn btn-hover pointer blue darken-1"
                     to="/customers"
        >
          <i class="material-icons">business_center</i> К Клиентам
        </router-link>
      </div>
    </div>

    <section class="info-content">
      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">business_center</i> Договоры</h5>
        <h6 v-if="customer.contractNumber !== '' || null ">Номер договора: <span>{{customer.contractNumber}}</span></h6>
        <h6 v-if="customer.contractDate !== '' || null ">Дата договора: <span>{{customer.contractDate}}</span></h6>
      </div>

      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">comment</i> Примечание</h5>

        <h6 v-if="customer.notes !== '' || null">
          <p v-for="(note, i) in customer.notes" :key="i">
            {{ note }}
          </p>
        </h6>

        <h6 v-show="customer.uploadImageNote !== undefined || ''">Изображение: <span><a v-bind:href="customer.uploadImageNote" target="_blank">Открыть</a></span></h6>
      </div>

      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">local_phone</i> Контакты</h5>
        <h6 v-if="customer.number !== '' || null ">Номер: <span><a :href="'tel:' + customer.number">{{customer.number}}</a></span></h6>
        <h6 v-if="customer.fax !== '' || null ">Факс: <span>{{customer.fax}}</span></h6>
        <h6 v-if="customer.email !== '' || null ">Почта: <span><a :href="'mailto:' + customer.email">{{customer.email}}</a></span></h6>
        <h6 v-if="customer.site !== '' || null ">Сайт: <span><a target="_blank" :href="customer.site">{{customer.site}}</a></span></h6>
        <h6 v-if="customer.address !== '' || null ">Адрес: <span>{{customer.address}}</span></h6>
      </div>

      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">assessment</i> Системная информация</h5>
        <h6 v-if="customer.name !== '' || null ">Наименование: <span>{{customer.name}}</span></h6>
        <h6 v-if="customer.manager !== '' || null ">Менеджер: <span>{{customer.manager}}</span></h6>
        <h6 v-if="customer.status !== '' || null ">Состояние:
          <span v-if="customer.status === 'Действующий'" class="green-text">{{customer.status}}</span>
          <span v-else class="red-text">{{customer.status}}</span>
        </h6>
        <h6 v-if="customer.id !== '' || null ">Идентификационный номер: <span>{{customer.id}}</span></h6>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CustomerSubdivisionAbout',

  filters: {
    booleanToWord: function (boolean) {
      return (boolean === true) ? 'Да' : 'Нет'
    }
  },

  data () {
    return {
      customer: ''
    }
  },

  computed: {
    ...mapGetters([
      'customers'
    ]),

    subId () {
      return this.$route.params.subId
    },

    customerId () {
      return this.$route.params.id
    }
  },

  created () {
    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
    this.customer = this.customers[this.customerId].subdivisions[this.subId]
  },

  methods: {
    ...mapMutations([
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE'
    ])
  }
}
</script>
