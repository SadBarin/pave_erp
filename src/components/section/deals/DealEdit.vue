<template>
  <div id="app-edit">
    <PopupDeleteWrapper
      :hidePopupStatus="popupRemoveHidden"
      @close-popup="popupRemoveToggle"
      @delete-element="removeDeal(editedDeal)"
      :header="`Удаление сделки ${editedDeal.name}`"
    >
      <template #popup-delete-content>
        После нажатия на иконку корзины будет удалёна сделка <b>{{editedDeal.name}}</b>
      </template>
    </PopupDeleteWrapper>

    <AppEditWrapper :header="'Редактор сделок: ' + editedDeal.name">
      <template #nav-buttons>
        <AppButtonIcon icon="delete" size="1.8rem" title="Удалить" @button-click="popupRemoveToggle"/>
        <AppButtonIcon icon="save" size="1.8rem" title="Сохранить и выйти" @button-click="saveEditedDeal(editedDeal)"/>
        <AppButtonIcon icon="description" title="История" size="1.8rem" @button-click="$router.push({name : 'dealHistory', params: {id: editedDeal.id}})"/>
        <AppButtonIcon icon="attach_money" size="1.8rem" title="Вернуться" @button-click="editorExit"/>
      </template>

      <template #edit-section>
        <div class="edit-block">
          <AppHeaderIcon class="edit-block-header" header-level="4" material-icon="import_contacts" header-text="Основные данные"/>

          <div class="edit-block-content">
            <AppLineText
              inputID="input-city"
              label="Название: "
              maxLength="20"
              v-model="editedDeal.name"
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
              v-model="editedDeal.notesCount"
            />

            <AppLineText
              placeholder="Введите новую заметку"
              inputID="input-note"
              label="Новая Заметка: "
              maxLength="35"
              v-model="note"
            />

            <AppNotesList :notes-list="editedDeal.notes" :notes-count="editedDeal.notesCount"/>
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
  name: 'DealEdit',

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
      editedDeal: '',
      note: '',

      historyElement: {
        date: `[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}]`,
        info: 'Сделка просматривалась ',
        employee: {
          name: 'Неизвестный пользователь',
          id: 0
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'deals',
      'employees',
      'authEmployee'
    ])
  },

  created () {
    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
    this.SET_DEALS_FROM_LOCAL_STORAGE()

    this.editedDeal = this.deals[this.$route.params.id]
    this.historyElement.employee = {
      name: `${this.authEmployee.surname} ${this.authEmployee.name}`,
      id: this.authEmployee.id
    }
  },

  methods: {
    ...mapMutations([
      'SET_DEALS_FROM_SERVER',
      'SET_DEALS_FROM_LOCAL_STORAGE',
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE'
    ]),

    popupRemoveToggle () {
      this.popupRemoveHidden = !this.popupRemoveHidden
    },

    removeDeal (deal) {
      this.popupRemoveToggle()
      this.editorExit()

      firebase.database().ref('/deals/' + deal.id).remove()
        .then(() => {
          console.log('Сделка удалёна 🗑️')
          this.SET_DEALS_FROM_SERVER()
        })
    },

    editorExit () {
      this.$router.push('/deals')
    },

    saveNewNote () {
      if (this.note.length) {
        try {
          this.editedDeal.notes.push(`${new Date().toLocaleDateString()}: ${this.note}`)
        } catch (error) {
          this.editedDeal.notes = []
          this.editedDeal.notes.push(`${new Date().toLocaleDateString()}: ${this.note}`)
        }
      }
    },

    getNewHistoryElement (info) {
      const localHistoryElement = this.historyElement
      localHistoryElement.info = info

      return localHistoryElement
    },

    saveEditedDeal (deal) {
      this.saveNewNote()

      deal.history.push(this.getNewHistoryElement('Сделка была изменена'))

      firebase.database().ref('/deals/' + deal.id).set(deal)
        .then(() => {
          this.SET_DEALS_FROM_SERVER()
          this.editorExit()
          // eslint-disable-next-line no-undef
          M.toast({ html: 'Данные сохранены!' })
        })
    }
  }
}
</script>
