<template>
  <div>
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3 class="right-margin-big">Подразделения {{currentCustomer.name}}</h3>

        <div class="flex-center">
          <button class="btn-transparent transparent btn-page-title blue-text text-darken-1"
                  title="Обновить страницу"
                  @click="updateCustomers"
          ><i class="material-icons middle-material-icons">autorenew</i>
          </button>
        </div>
      </div>

      <SubdivisionAdd
        @add-element="addCustomer"
        placeholder="Добавить новое подразделение"
      />
    </div>

    <section>
      <TableSubdivisions
        @remove-customer="removeCustomer"
        :customers="customerSubdivisions"
        :customerId="customerId"
      />
    </section>
  </div>
</template>

<script>
import TableSubdivisions from '@/components/customers/subdivisions/CustomerSubdivisionsTable'
import SubdivisionAdd from '@/components/InputAdd'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'CustomerSubdivisions',

  components: { TableSubdivisions, SubdivisionAdd },

  computed: {
    ...mapGetters([
      'customers',
      'authEmployee'
    ]),

    customerId () {
      return String(this.$route.params.id)
    },

    currentCustomer () {
      return this.customers[this.customerId]
    },

    customerSubdivisions () {
      return this.currentCustomer.subdivisions
    }
  },

  created () {
    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
  },

  methods: {
    ...mapMutations([
      'SET_CUSTOMERS_FROM_SERVER',
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE',
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE'
    ]),

    removeCustomer (id) {
      // eslint-disable-next-line eqeqeq
      if (id == 0) {
        // eslint-disable-next-line no-undef
        M.toast({ html: 'Главное подразделение нельзя удалять!' })
      } else {
        firebase.database().ref('/customers/' + this.customerId + '/subdivisions/' + id).remove()
          .then(() => {
            this.SET_CUSTOMERS_FROM_SERVER()
            console.log('Подразделение удалёно 🗑️')
          })
      }
    },

    addCustomer (name) {
      // Body New Customer
      const newSubdivision = {
        id: Date.now(),
        name,
        contractNumber: '',
        contractDate: '',
        number: '',
        fax: '',
        site: '',
        email: '',
        address: this.authEmployee.city,
        notes: ['Новое подразделение'],
        manager: this.authEmployee.surname + ' ' + this.authEmployee.name,
        status: 'Действующий'
      }

      firebase.database().ref('/customers/' + this.customerId + '/subdivisions/' + newSubdivision.id).set(newSubdivision)
        .then(() => {
          this.SET_CUSTOMERS_FROM_SERVER()
          console.log('Подразделение добавлено ➕')
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
