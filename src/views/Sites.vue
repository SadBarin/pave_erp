<template>
  <div>
    <div class="page-title">
      <h3>Список городов</h3>

      <AddCardSites
        @add-city="addCity"
      />
    </div>

    <div>
      <ListSites
        v-if="sites.length"
        v-bind:sites="sites"
        @remove-city="removeCity"
      />
      <p v-else>Городов не осталось!</p>
    </div>
  </div>
</template>

<script>
import AddCardSites from '@/components/sites/AddCardSites'
import ListSites from '@/components/sites/ListSites'
export default {
  name: 'Sites',
  components: { ListSites, AddCardSites },
  methods: {
    removeCity (id) {
      this.sites = this.sites.filter(city => city.id !== id)
      this.saveSites()
    },

    addCity (city) {
      this.sites.push(city)
      this.saveSites()
    },

    saveSites () {
      const parsed = JSON.stringify(this.sites)
      localStorage.setItem('sites', parsed)
    }
  },
  data () {
    return {
      sites: [
        { id: 1, cityName: 'Минск', edited: false }
      ]
    }
  },
  mounted () {
    if (localStorage.getItem('sites')) {
      try {
        this.sites = JSON.parse(localStorage.getItem('sites'))
      } catch (e) {
        localStorage.removeItem('sites')
      }
    }
  }
}
</script>

<style scoped>
  .page-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
