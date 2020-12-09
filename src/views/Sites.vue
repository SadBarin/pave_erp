<template>
  <div class="container-page">
    <div class="page-title">
      <div class="title-container">
        <h3>Список городов</h3>

        <div class="title-btn-container">
          <button class="btn-floating btn-title blue darken-1 waves-effect waves-circle waves-light"
                  onclick="M.toast({html: 'Города обновлены'})"
                  v-on:click="updateCollection('sites')"
          ><i class="material-icons">autorenew</i>
          </button>
        </div>
      </div>

      <AddCardSites
        @add-city="addCity"
      />
    </div>

    <div>
      <ListSites
        v-if="sites.length"
        :sites="sites"
        @remove-city="removeCity"
      />
      <div v-else class="empty-list">
        <h5 class="empty-list-title"><i class="material-icons">mood_bad</i> Городов не осталось!</h5>
        <p>Добавьте город, чтобы начать работать над ним.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AddCardSites from '@/components/sites/AddCardSites'
import ListSites from '@/components/sites/ListSites'
export default {
  name: 'Sites',
  components: { ListSites, AddCardSites },
  data () {
    return {
      sites: [
        { id: 1, cityName: 'Самара', employees: 0, edited: false },
        { id: 2, cityName: 'Казань', employees: 0, edited: false },
        { id: 3, cityName: 'Москва', employees: 0, edited: false },
        { id: 4, cityName: 'Ульяновск', employees: 0, edited: false },
        { id: 5, cityName: 'Набережные Челны', employees: 0, edited: false },
        { id: 6, cityName: 'Красноярск', employees: 0, edited: false },
        { id: 7, cityName: 'Оренбург', employees: 0, edited: false }
      ],

      updateTimeout: 60000
    }
  },
  methods: {
    removeCity (id) {
      this.sites = this.sites.filter(city => city.id !== id)
    },

    addCity (city) {
      this.sites.push(city)
      this.saveCollection(this.sites, 'sites')
    },

    saveCollection (collection, collectionName) {
      const parsed = JSON.stringify(collection)
      localStorage.setItem(collectionName, parsed)
    },

    updateCollection (collectionName) {
      if (localStorage.getItem(collectionName)) {
        try {
          this.sites = JSON.parse(localStorage.getItem(collectionName))
        } catch (e) {
          localStorage.removeItem(collectionName)
        }
      }
    }
  },
  mounted () {
    this.saveCollection(this.sites, 'sites')
    this.updateCollection('sites')
    setInterval(() => this.updateCollection('sites'), this.updateTimeout)
  }
}
</script>
