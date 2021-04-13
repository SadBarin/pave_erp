<template>
  <div id="app-edit">
    <PopupRemove
      :popupHidden="popupRemoveHidden"
      @close="popupRemoveToggle"
      @delete="removeCity(editedCity)"
      :header="`Удаление города ${editedCity.name}`"
    >
      <template #popup-content>
        После нажатия на иконку корзины будет удалён город <b>{{editedCity.name}}</b>
      </template>
    </PopupRemove>

    <AppTopPanel :header="'Редактор города: ' + editedCity.name">
      <template #nav-buttons>
        <AppButtonIcon icon="delete" title="Удалить город" @button-click="popupRemoveToggle"/>
        <AppButtonIcon icon="save" title="Сохранить и выйти" @button-click="saveEditedCity(editedCity)"/>
        <AppButtonIcon icon="location_city" title="Вернуться к городам" @button-click="editorExit"/>
      </template>
    </AppTopPanel>

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

import AppTopPanel from '@/components/AppTopPanel'
import AppHeaderIcon from '@/components/AppHeaderIcon'
import AppNotesList from '@/components/edit/AppNotesList'
import AppLineText from '@/components/AppLineText'
import AppNumbers from '@/components/AppNumbers'
import AppButtonIcon from '@/components/AppButtonIcon'
import PopupRemove from '@/components/PopupRemove'

export default {
  name: 'Sites',

  components: { AppTopPanel, AppHeaderIcon, AppButtonIcon, AppLineText, AppNumbers, AppNotesList, PopupRemove },

  data () {
    return {
      popupRemoveHidden: true,
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

    popupRemoveToggle () {
      this.popupRemoveHidden = !this.popupRemoveHidden
    },

    removeCity (city) {
      this.popupRemoveToggle()
      this.editorExit()

      firebase.database().ref('/sites/' + city.id).remove()
        .then(() => {
          console.log('Город удалён 🗑️')
          this.SET_SITES_FROM_SERVER()
        })
    },

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
    grid-auto-rows: min-content;
    grid-row-gap: 2rem
  }

  #app-edit .edit-top-panel h3{
    margin: 0;
  }

  #app-edit .edit-block-content {
    margin-top: 1rem;
  }
</style>
