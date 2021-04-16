<template>
  <PopupAddWrapper
    :hidden="hidden"
    header="Добавить город"
    @popup-close="$emit('popup-toggle')"
    @popup-add="addCity(addedCity)"
  >
    <template #popup-add-content>
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
    </template>
  </PopupAddWrapper>
</template>

<script>
import PopupAddWrapper from '../PopupAddWrapper'
import AppLineText from '../AppLineText'

export default {
  name: 'CityPopupAdd',

  components: {
    PopupAddWrapper,
    AppLineText
  },

  props: { hidden: Boolean },

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
