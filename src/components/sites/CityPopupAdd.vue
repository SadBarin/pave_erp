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

  components: { AppPopupWrapper, AppTopPanel, AppButtonIcon, AppLineText },

  props: { popupHidden: Boolean },

  data () {
    return {
      addedCity: {}
    }
  },

  created () {
    this.renewAddedCity()
  },

  methods: {
    renewAddedCity () {
      this.addedCity = {
        id: Date.now(),
        name: '',
        notes: [],
        notesCount: 5
      }
    },

    addCity (city) {
      this.$emit('add-city', city)
      this.renewAddedCity()
    }
  }
}
</script>

<style scoped>

</style>
