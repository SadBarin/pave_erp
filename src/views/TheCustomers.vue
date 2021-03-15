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

      <InputAdd
        @add-element="addCustomer"
        placeholder="Добавить нового клиента"
      />
    </div>

    <section>
      <TableWorkers
        @remove-customer="removeCustomer"
        :customers="customers"
      />
    </section>
  </div>
</template>

<script>
import InputAdd from '@/components/InputAdd'
import TableWorkers from '@/components/customers/CustomersTable'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'Customers',

  components: { InputAdd, TableWorkers },

  computed: {
    ...mapGetters([
      'customers',
      'authEmployee'
    ])
  },

  created () {
    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
  },

  methods: {
    ...mapMutations([
      'SET_CUSTOMERS_FROM_SERVER',
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE',
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE'
    ]),

    removeCustomer (id) {
      firebase.database().ref('/customers/' + id).remove()
        .then(() => {
          this.SET_CUSTOMERS_FROM_SERVER()
          console.log('Клиент удалён 🗑️')
        })
    },

    addCustomer (name) {
      // Body New Customer
      const newCustomer = {
        id: Date.now(),
        name,
        note: 'Новый клиент',
        subdivisions: {
          0: {
            id: '0',
            name: 'Главное подразделение',
            contractNumber: '',
            contractDate: '',
            number: '',
            fax: '',
            site: '',
            email: '',
            note: 'Главное подразделение клиента',
            address: this.authEmployee.city,
            manager: this.authEmployee.surname + ' ' + this.authEmployee.name,
            status: 'Действующий'
          }
        }
      }

      firebase.database().ref('/customers/' + newCustomer.id).set(newCustomer)
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
  }
}
</script>
