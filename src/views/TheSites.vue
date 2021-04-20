<template>
  <div id="app-sites">
    <CityPopupAdd
      :hidden="popupAddHidden"
      @add-city="addCity"
      @popup-toggle="popupAddToggle"
    />

    <AppTopPanel header="Список городов">
      <template #nav-buttons>
        <AppButtonIcon icon="add" size="1.8rem" title="Добавить города" @button-click="popupAddToggle"/>
      </template>
    </AppTopPanel>

    <div class="app-sites-content">
      <SitesList
        :sites="sites"
        @remove-city="removeCity"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'
import SitesList from '../components/section/sites/list/SitesList'
import CityPopupAdd from '../components/section/sites/CityPopupAdd'

export default {
  name: 'Sites',

  components: {
    AppTopPanel,
    AppButtonIcon,
    SitesList,
    CityPopupAdd
  },

  data () {
    return {
      popupAddHidden: true
    }
  },

  computed: {
    ...mapGetters([
      'sites'
    ])
  },

  created () {
    this.SET_SITES_FROM_LOCAL_STORAGE()
  },

  methods: {
    ...mapMutations([
      'SET_SITES_FROM_LOCAL_STORAGE',
      'SET_SITES_FROM_SERVER'
    ]),

    popupAddToggle () {
      this.popupAddHidden = !this.popupAddHidden
    },

    removeCity (id) {
      firebase.database().ref('/sites/' + id).remove()
        .then(() => {
          console.log('Город удалён 🗑️')
          this.SET_SITES_FROM_SERVER()
        })
    },

    addCity (city) {
      city.name = city.name[0].toUpperCase() + city.name.substring(1)

      firebase.database().ref('/sites/' + city.id).set(city)
        .then(() => {
          console.log('Город добавлен ➕')
          this.popupAddHidden = true
          this.SET_SITES_FROM_SERVER()
        })
    },

    updateCity () {
      this.SET_SITES_FROM_SERVER()
      // eslint-disable-next-line no-undef
      M.toast({ html: 'Города обновлены' })
    }
  }
}
</script>
