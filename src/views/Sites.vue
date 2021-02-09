<template>
  <div class="container-page">
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3 class="right-margin-big">Список городов</h3>

        <div class="flex-center">
          <button class="btn-transparent transparent btn-page-title blue-text text-darken-1"
                  @click="updateCity"
          ><i class="material-icons middle-material-icons">autorenew</i>
          </button>
        </div>
      </div>

      <AddCardSites
        @add-city="addCity"
        :sites="sites"
      />
    </div>

    <div>
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
import AddCardSites from '@/components/sites/AddCardSites'
import ListSites from '@/components/sites/list/ListSites'

export default {
  name: 'Sites',
  components: { ListSites, AddCardSites },
  data () {
    return {
      show: true
    }
  },
  computed: {
    ...mapGetters([
      'sites'
    ])
  },
  methods: {
    ...mapMutations([
      'ADD_CITY',
      'REMOVE_CITY',
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
      firebase.database().ref('/sites/' + city.id).set(city)
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
  },
  mounted () {
    this.SET_SITES_FROM_LOCAL_STORAGE()
  }
}
</script>
