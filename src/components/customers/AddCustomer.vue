<template>
  <form @submit.prevent="submitCustomer" class="flex-center" >
    <div class="input-field margin-fix right-margin-little">
      <input
        class="input-add"
        type="text"
        maxlength="50"
        id="customer"
        v-model.trim="name"
        placeholder="Имя нового клиента"
      >
    </div>

    <button class="btn-transparent transparent btn-page-title blue-text text-darken-1" title="Добавить нового клиента" type="submit">
      <i class="material-icons big-material-icons">add</i>
    </button>
  </form>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AddCustomer',
  data () {
    return {
      name: ''
    }
  },
  props: { customers: Object },
  computed: {
    ...mapGetters([
      'authEmployee'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE'
    ]),

    createCustomer () {
      // Body New Customer
      const newCustomer = {
        id: Date.now(),
        name: this.name,
        contractNumber: '',
        contractDate: '',
        number: '',
        fax: '',
        site: '',
        email: '',
        address: this.authEmployee.city,
        note: 'Новый клиент',
        manager: this.authEmployee.surname + ' ' + this.authEmployee.name,
        status: 'Действующий'
      }

      this.$emit('add-customer', newCustomer)
      this.name = ''

      // this.$router.push(`/customers/edit/customers${newCustomer.id}`)
    },

    submitCustomer () {
      this.createCustomer()
    }
  },
  mounted () {
    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
  }
}
</script>
