<template>
  <div id="app-sites">
    <AppPopupWrapper :hidden="popupHidden">
      <h3>Меню добавление города</h3>

      <LineTextAdd
        @add-city="addCity"
        line-text-label="Название: "
        line-text-placeholder="Например Москва"
      />
    </AppPopupWrapper>

    <AppTopPanel header="Список городов">
      <template #nav-buttons>
        <AppButtonIcon icon="autorenew" title="Обновить города" @button-click="updateCity"/>
        <AppButtonIcon icon="add" title="Добавить города" @button-click="popupHidden = false"/>
      </template>
    </AppTopPanel>

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

import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'
import LineTextAdd from '@/components/LineTextAdd'
import ListSites from '@/components/sites/list/SitesList'
import AppPopupWrapper from '@/components/AppPopupWrapper'

export default {
  name: 'Sites',

  components: { AppTopPanel, AppButtonIcon, ListSites, LineTextAdd, AppPopupWrapper },

  data () {
    return {
      popupHidden: true
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
          this.popupHidden = true
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
  }

  #app-sites .app-sites-header h3 {
    margin: 0 2rem 0 0;
  }

  #app-sites .app-sites-nav-buttons {
    display: flex;
  }
</style>
