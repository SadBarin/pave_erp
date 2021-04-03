<template>
  <div id="app-edit">
    <div class="edit-top-panel">
      <AppHeaderIcon header-level="3" material-icon="business_center" :header-text="'Редактор клиента: ' + editedCustomer.name"/>

      <div class="edit-nav-buttons">
        <AppButtonIcon material-icon="save" title="Сохранить и выйти" @button-click="saveEditedCustomer(editedCustomer)"/>
        <AppButtonIcon material-icon="business_center" title="Вернуться к клиентам" @button-click="editorExit"/>
      </div>
    </div>

    <section class="edit-section">
      <div class="edit-block">
        <AppHeaderIcon header-level="4" material-icon="import_contacts" header-text="Основные данные"/>

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
        <AppHeaderIcon header-level="4" material-icon="chrome_reader_mode" header-text="Заметки"/>

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
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

import AppHeaderIcon from '@/components/AppHeaderIcon'
import AppButtonIcon from '@/components/AppButtonIcon'
import AppNumbers from '@/components/AppNumbers'
import AppLineText from '@/components/AppLineText'
import AppNotesList from '@/components/edit/AppNotesList'

export default {
  name: 'EditorWorkers',

  components: { AppHeaderIcon, AppButtonIcon, AppNumbers, AppLineText, AppNotesList },

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

<style scoped>
  #app-edit .edit-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  #app-edit .edit-top-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #app-edit .edit-top-panel:first-child {
    margin: 1.6rem 0 2.7rem 0;
  }

  #app-edit .edit-block-content {
    margin-top: 1rem;
  }

  #app-edit .edit-nav-buttons {
    display: flex;
    align-items: center;
  }

  #app-edit .edit-nav-buttons > * {
    margin-right: 1rem;
  }
</style>
