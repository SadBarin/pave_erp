<template>
  <div id="app-edit">
    <AppEditWrapper :header="'Редактор клиента: ' + editedCustomer.name">
      <template #nav-buttons>
        <CustomerNavigation :customer="editedCustomer" @save-customer="saveEditedCustomer(editedCustomer)"/>
      </template>

      <template #edit-section>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="import_contacts" header-text="Основные данные"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-city"
              label="Название клиента: "
              maxLength="20"
              v-model="editedCustomer.name"
            />
          </div>
        </div>

        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="chrome_reader_mode" header-text="Заметки"/>

          <div class="edit-block-content">
            <AppNumbers
              inputID="input-note-count"
              label="Заметок в списке:  "
              minValue="0"
              maxValue="35"
              maxLength="3"
              v-model="editedCustomer.notesCount"
            />

            <AppLineText
              placeholder="Введите новую заметку"
              inputID="input-note"
              label="Новая Заметка: "
              maxLength="35"
              v-model="note"
            />

            <AppNotesList :notes-list="editedCustomer.notes" :notes-count="editedCustomer.notesCount"/>
          </div>
        </div>
      </template>
    </AppEditWrapper>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

import AppEditWrapper from '@/components/edit/AppEditWrapper'
import CustomerNavigation from './CustomerNavigation'
import AppNumbers from '@/components/AppNumbers'
import AppLineText from '@/components/AppLineText'
import AppNotesList from '@/components/edit/AppNotesList'
import AppHeaderIcon from '../../AppHeaderIcon'

export default {
  name: 'EditorWorkers',

  components: {
    AppEditWrapper,
    CustomerNavigation,
    AppNumbers,
    AppLineText,
    AppNotesList,
    AppHeaderIcon
  },

  data () {
    return {
      editedCustomer: '',
      note: ''
    }
  },

  computed: {
    ...mapGetters([
      'customers'
    ])
  },

  created () {
    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
    this.editedCustomer = this.customers[this.$route.params.id]
  },

  methods: {
    ...mapMutations([
      'SET_CUSTOMERS_FROM_SERVER',
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE'
    ]),

    editorExit () {
      this.$router.push('/customers')
    },

    saveEditedCustomer (customer) {
      if (this.note.length) {
        try {
          this.editedCustomer.notes.push(`${new Date().toLocaleDateString()}: ${this.note}`)
        } catch (error) {
          this.editedCustomer.notes = []
          this.editedCustomer.notes.push(`${new Date().toLocaleDateString()}: ${this.note}`)
        }
      }

      firebase.database().ref('customers/' + customer.id).set(customer)
        .then(() => {
          this.SET_CUSTOMERS_FROM_SERVER()
          this.editorExit()
        })
    }
  }
}
</script>
