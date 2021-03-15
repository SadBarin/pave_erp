<template>
  <div>
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3 class="right-margin-big">Сотрудники подразделения</h3>

        <div class="flex-center">
          <button class="btn-transparent transparent btn-page-title blue-text text-darken-1"
                  title="Обновить страницу"
                  @click="updateCustomers"
          ><i class="material-icons middle-material-icons">autorenew</i>
          </button>
        </div>
      </div>

      <EmployeeAdd
        @add-element="addEmployee"
        placeholder="Добавить нового сотрудника"
      />
    </div>

    <section>
      <CustomerEmployeesTable
        @remove-customer="removeEmployee"
        :customers="subdivisionEmployees"
      />
    </section>
  </div>
</template>

<script>
import CustomerEmployeesTable from '@/components/customers/subdivisions/employees/CustomerEmployeesTable'
import EmployeeAdd from '@/components/InputAdd'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'CustomerEmployees',

  components: { CustomerEmployeesTable, EmployeeAdd },

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
    },

    currentSubdivision () {
      return this.customerSubdivisions[this.$route.params.subId]
    },

    subdivisionEmployees () {
      return this.currentSubdivision.employees
    }
  },

  created () {
    console.log('currentSubDiv: ', this.currentSubdivision)

    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
  },

  methods: {
    ...mapMutations([
      'SET_CUSTOMERS_FROM_SERVER',
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE',
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE'
    ]),

    removeEmployee (id) {
      firebase.database().ref('/customers/' + this.customerId + '/subdivisions/' + this.currentSubdivision.id + '/employees/' + id).remove()
        .then(() => {
          this.SET_CUSTOMERS_FROM_SERVER()
          console.log('Клиент удалён 🗑️')
        })
    },

    addEmployee (name) {
      // Body New Customer
      const newCustomer = {
        id: Date.now(),
        name,
        surname: 'Новый',
        patronymic: 'Сотрудник',
        post: 'Сотрудник',
        email: '',
        number: ''
      }

      firebase.database().ref('/customers/' + this.customerId + '/subdivisions/' + this.currentSubdivision.id + '/employees/' + newCustomer.id).set(newCustomer)
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
