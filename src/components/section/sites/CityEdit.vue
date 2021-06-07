<template>
  <div id="app-edit">
    <PopupDeleteWrapper
      :hidePopupStatus="popupRemoveHidden"
      @close-popup="popupRemoveToggle"
      @delete-element="removeCity(editedCity)"
      :header="`Удаление города ${editedCity.name}`"
    >
      <template #popup-delete-content>
        После нажатия на иконку корзины будет удалён город <b>{{editedCity.name}}</b>
      </template>
    </PopupDeleteWrapper>

    <AppEditWrapper :header="'Редактор города: ' + editedCity.name">
      <template #nav-buttons>
        <AppButtonIcon icon="delete" title="Удалить город" @button-click="popupRemoveToggle"/>
        <AppButtonIcon icon="save" title="Сохранить и выйти" @button-click="saveEditedCity(editedCity)"/>
        <AppButtonIcon icon="location_city" title="Вернуться к городам" @button-click="editorExit"/>
      </template>

      <template #edit-section>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="import_contacts" header-text="Основные данные"/>

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
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="chrome_reader_mode" header-text="Заметки"/>

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
      </template>
    </AppEditWrapper>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapMutations } from 'vuex'

import AppEditWrapper from '@/components/edit/AppEditWrapper'
import AppHeaderIcon from '@/components/AppHeaderIcon'
import AppNotesList from '@/components/edit/AppNotesList'
import AppLineText from '@/components/AppLineText'
import AppNumbers from '@/components/AppNumbers'
import AppButtonIcon from '@/components/AppButtonIcon'
import PopupDeleteWrapper from '@/components/popups/PopupDeleteWrapper'

export default {
  name: 'CityEdit',

  components: {
    AppEditWrapper,
    AppHeaderIcon,
    AppButtonIcon,
    AppLineText,
    AppNumbers,
    AppNotesList,
    PopupDeleteWrapper
  },

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

  created () {
    this.SET_SITES_FROM_LOCAL_STORAGE()
    this.editedCity = this.sites[this.$route.params.id]
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
  }
}
</script>
