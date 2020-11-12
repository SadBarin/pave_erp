<template>
  <div>
    <div class="page-title">
      <h3>Список городов</h3>

      <AddCardSites
        @add-city="addCity"
      />
    </div>

    <section>
      <ListSites
        v-if="sites.length"
        v-bind:sites="sites"
        @remove-city="removeCity"
      />
      <p v-else>Городов не осталось!</p>
    </section>
  </div>
</template>

<script>
import AddCardSites from '@/components/sites/AddCardSites'
import ListSites from '@/components/sites/ListSites'
export default {
  name: 'EditorSites',
  components: { ListSites, AddCardSites },
  methods: {
    removeCity (id) {
      this.sites = this.sites.filter(city => city.id !== id)
    },

    addCity (city) {
      this.sites.push(city)
    }
  },
  data () {
    return {
      sites: [
        { id: 1, cityName: 'Магадан' },
        { id: 2, cityName: 'Москва' },
        { id: 3, cityName: 'Камчатка' },
        { id: 4, cityName: 'Владивосток' }
      ]
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
