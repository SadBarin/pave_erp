<template>
  <div>
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3 class="right-margin-big">Список клиентов</h3>

        <div class="flex-center">
          <button class="btn-transparent transparent btn-page-title blue-text text-darken-1"
                  title="Обновить страницу"
                  @click="updateCustomers"
          ><i class="material-icons middle-material-icons">autorenew</i>
          </button>
        </div>
      </div>

      <AddCustomer
        @add-customer="addCustomer"
        :сustomers="customers"
      />
    </div>

    <section>
      <TableWorkers
        @remove-worker="removeCustomer"
        :workers="customers"
      />
    </section>
  </div>
</template>

<script>
import AddCustomer from '@/components/customers/AddCustomer'
import TableWorkers from '@/components/customers/TableCustomers'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'Customers',
  components: { AddCustomer, TableWorkers },
  data () {
    return {
      updateTimeout: 60000
    }
  },
  computed: {
    ...mapGetters([
      'customers'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_CUSTOMERS_FROM_SERVER',
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE'
    ]),

    removeCustomer (id) {
      firebase.database().ref('/customers/' + id).remove()
        .then(() => {
          this.SET_CUSTOMERS_FROM_SERVER()
          console.log('Клиент удалён 🗑️')
        })
    },

    addCustomer (customer) {
      firebase.database().ref('/customers/' + customer.id).set(customer)
        .then(() => {
          this.SET_CUSTOMERS_FROM_SERVER()
          console.log('Клиент добавлен ➕')
        })
    },

    updateCustomers () {
      this.SET_CUSTOMERS_FROM_SERVER()
      // eslint-disable-next-line no-undef
      M.toast({ html: 'Наши клиенты обновлены' })
    }
  },
  mounted () {
    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
  }
}
</script>

<style scoped>

</style>
