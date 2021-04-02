<template>
  <div id="app-sites">
    <div class="app-sites-top-panel">
      <div class="app-sites-header">
        <AppHeaderIcon header-level="3" material-icon="" header-text="Список городов"/>
        <AppButtonIcon material-icon="autorenew" @button-click="updateCity"/>
      </div>

      <LineTextAdd
        @add-city="addCity"
        line-text-label="Добавить город: "
        line-text-placeholder="Название нового города"
      />
    </div>

    <div class="app-sites-content">
      <ListSites
        :sites="sites"
        @remove-city="removeCity"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

import AppHeaderIcon from '@/components/AppHeaderIcon'
import AppButtonIcon from '@/components/AppButtonIcon'
import LineTextAdd from '@/components/LineTextAdd'
import ListSites from '@/components/sites/list/SitesList'

export default {
  name: 'Sites',

  components: { AppHeaderIcon, AppButtonIcon, ListSites, LineTextAdd },

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

    removeCity (id) {
      firebase.database().ref('/sites/' + id).remove()
        .then(() => {
          console.log('Город удалён 🗑️')
          this.SET_SITES_FROM_SERVER()
        })
    },

    addCity (city) {
      const name = city[0].toUpperCase() + city.substring(1)

      const newCity = {
        id: Date.now(),
        name,
        notes: [],
        notesCount: 5
      }

      firebase.database().ref('/sites/' + newCity.id).set(newCity)
        .then(() => {
          console.log('Город добавлен ➕')
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

<style scoped>
  #app-sites .app-sites-top-panel {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    margin: 1.6rem 0 2.7rem 0;
  }

  #app-sites .app-sites-header {
    display: flex;
    align-items: flex-end;

    margin-left: -1rem;
  }

  .app-sites-header > *:first-child {
    margin-right: 2rem;
  }
</style>
