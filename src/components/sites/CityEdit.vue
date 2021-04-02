<template>
  <div id="app-edit">
    <div class="edit-top-panel">
      <AppHeaderIcon header-level="3" material-icon="location_city" :header-text="'Редактор города: ' + editedCity.name"/>

      <div class="edit-nav-buttons">
        <AppButtonIcon material-icon="save" title="Сохранить и выйти" @button-click="saveEditedCity(editedCity)"/>
        <AppButtonIcon material-icon="location_city" title="Вернуться к городам" @button-click="editorExit"/>
      </div>
    </div>

    <section class="edit-section">
      <div class="edit-block">
        <AppHeaderIcon header-level="4" material-icon="import_contacts" header-text="Основные данные"/>

        <div class="edit-block-content">
          <AppLineText
            inputID="input-city"
            label="Название города: "
            maxLength="20"
            v-model="editedCity.name"
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
            v-model="editedCity.notesCount"
          />

          <AppLineText
            placeholder="Введите новую заметку"
            inputID="input-note"
            label="Новая Заметка: "
            maxLength="35"
            v-model="note"
          />

          <AppNotesList :notes-list="editedCity.notes" :notes-count="editedCity.notesCount"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapMutations } from 'vuex'

import AppNotesList from '@/components/AppNotesList'
import AppLineText from '@/components/AppLineText'
import AppNumbers from '@/components/AppNumbers'
import AppHeaderIcon from '@/components/AppHeaderIcon'
import AppButtonIcon from '@/components/AppButtonIcon'

export default {
  name: 'Sites',

  components: { AppButtonIcon, AppLineText, AppNumbers, AppHeaderIcon, AppNotesList },

  data () {
    return {
      editedCity: '',
      note: ''
    }
  },

  computed: {
    ...mapGetters([
      'sites'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_SITES_FROM_SERVER',
      'SET_SITES_FROM_LOCAL_STORAGE'
    ]),

    editorExit () {
      this.$router.push('/sites')
    },

    saveEditedCity (city) {
      if (this.note.length) {
        try {
          this.editedCity.notes.push(`${new Date().toLocaleDateString()}: ${this.note}`)
        } catch (error) {
          this.editedCity.notes = []
          this.editedCity.notes.push(`${new Date().toLocaleDateString()}: ${this.note}`)
        }
      }

      firebase.database().ref('/sites/' + city.id).set(city)
        .then(() => {
          this.SET_SITES_FROM_SERVER()
          this.editorExit()
          // eslint-disable-next-line no-undef
          M.toast({ html: 'Данные сохранены!' })
        })
    }
  },

  mounted () {
    this.SET_SITES_FROM_LOCAL_STORAGE()
    this.editedCity = this.sites[this.$route.params.id]
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
