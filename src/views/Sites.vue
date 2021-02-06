<template>
  <div class="container-page">
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3 class="right-margin-big">Список городов</h3>

        <div class="flex-center">
          <button class="btn-transparent transparent btn-page-title blue-text text-darken-1"
                  onclick="M.toast({html: 'Города обновлены'})"
                  @click="SET_SITES_FROM_SERVER()"
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
import AddCardSites from '@/components/sites/AddCardSites'
import ListSites from '@/components/sites/list/ListSites'
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Sites',
  components: { ListSites, AddCardSites },
  data () {
    return {
      updateTimeout: 50000
    }
  },
  computed: {
    ...mapGetters([
      'sites'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_SITES',
      'SET_SITES_FROM_SERVER'
    ]),

    removeCity (id) {
      const buffer = this.sites.filter(city => city.id !== id)
      console.log('Город удалён 🗑️')
      this.SET_SITES(buffer)
    },

    addCity (city) {
      // const buffer = this.sites
      // buffer.push(city)
      // console.log('Город добавлен ➕')
      // this.SET_SITES(buffer)

      console.log(city)

      // firebase.database().ref('/sites/').set({
      //   city
      // })
    }
  },
  mounted () {
    this.SET_SITES_FROM_SERVER()
    console.log('Sites:', this.sites)
  }
}
</script>
