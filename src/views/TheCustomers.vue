<template>
  <div>
    <CustomerPopupAdd
      :popupHidden="popupAddHidden"
      @add-customer="addCustomer"
      @popup-toggle="popupAddToggle"
    />

    <AppTopPanel header="Список клиентов">
      <template #nav-buttons>
        <AppButtonIcon icon="autorenew" title="Обновить страницу" @button-click="updateCustomers"/>
        <AppButtonIcon icon="add" title="Добавить клиентов" @button-click="popupAddToggle"/>
      </template>
    </AppTopPanel>

    <section>
      <CustomersTable
        @remove-customer="removeCustomer"
        :customers="customers"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

import CustomerPopupAdd from '../components/section/customers/CustomerPopupAdd'
import CustomersTable from '../components/section/customers/CustomersTable'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'

export default {
  name: 'Customers',

  components: {
    CustomerPopupAdd,
    AppTopPanel,
    AppButtonIcon,
    CustomersTable
  },

  data () {
    return {
      popupAddHidden: true
    }
  },

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

    popupAddToggle () {
      this.popupAddHidden = !this.popupAddHidden
    },

    removeCustomer (id) {
      firebase.database().ref('/customers/' + id).remove()
        .then(() => {
          this.SET_CUSTOMERS_FROM_SERVER()
          console.log('Клиент удалён 🗑️')
        })
    },

    addCustomer (name) {
      console.log(name)

      this.popupAddToggle()

      const newCustomer = {
        id: Date.now(),
        name,
        notes: [`${new Date().toLocaleDateString()}: Клиент создан`],
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
            status: 'Действующий',
            notes: [`${new Date().toLocaleDateString()}: Главное подразделение`]
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
