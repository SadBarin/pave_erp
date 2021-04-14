<template>
  <AppPopupWrapper :hidden="popupHidden">
    <AppTopPanel header="Добавление города">
      <template #nav-buttons>
        <AppButtonIcon icon="add" title="Добавить город" @button-click="addCity(addedCity)"/>
        <AppButtonIcon icon="close" title="Закрыть окно" @button-click="$emit('popup-toggle')"/>
      </template>
    </AppTopPanel>

    <div class="add-city-container">
      <AppLineText
        inputID="input-city"
        label="Название: "
        maxLength="20"
        v-model="addedCity.name"
      />

      <AppLineText
        inputID="input-first-note"
        label="Заметка: "
        maxLength="30"
        v-model="firstNote"
      />
    </div>
  </AppPopupWrapper>
</template>

<script>
import AppPopupWrapper from '@/components/AppPopupWrapper'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'
import AppLineText from '@/components/AppLineText'

export default {
  name: 'CityPopupAdd',

  components: {
    AppPopupWrapper,
    AppTopPanel,
    AppButtonIcon,
    AppLineText
  },

  props: { popupHidden: Boolean },

  data () {
    return {
      addedCity: {},
      firstNote: 'Город был создан'
    }
  },

  created () {
    this.renewAddedData()
  },

  watch: {
    firstNote: function (note) {
      this.addedCity.notes[0] = note
    }
  },

  methods: {
    renewAddedData () {
      this.addedCity = {
        id: Date.now(),
        name: '',
        notes: ['Город был создан'],
        notesCount: '5'
      }

      this.firstNote = 'Город был создан'
    },

    addCity (city) {
      this.$emit('add-city', city)
      this.renewAddedData()
    }
  }
}
</script>

<style scoped>

</style>
