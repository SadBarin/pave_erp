<template>
  <div class="container-page">
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3>Список городов</h3>

        <div class="flex-center">
          <button class="btn-floating btn-page-title blue darken-1 waves-effect waves-circle waves-light"
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
import ListSites from '@/components/sites/list/ListSites'

export default {
  name: 'Sites',
  components: { ListSites, AddCardSites },
  data () {
    return {
      sites: [{}],

      updateTimeout: 60000
    }
  },
  methods: {
    removeCity (id) {
      this.sites = this.sites.filter(city => city.id !== id)
      this.saveCollection(this.sites, 'sites')
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
    this.updateCollection('sites')
    setInterval(() => this.updateCollection('sites'), this.updateTimeout)
  }
}
</script>
