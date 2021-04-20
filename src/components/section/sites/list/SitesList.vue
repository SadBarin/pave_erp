<template>
  <section class="sites-items-container">
    <CityItem
      v-for="city of sites"
      :key="city.id"
      :city="city"
      @remove-city="$emit('remove-city', city.id)"
    />
  </section>
</template>

<script>
import CityItem from './CityItem'

export default {
  name: 'ListSites',

  components: { CityItem },

  props: { sites: Object }
}
</script>

<style scoped>
  .sites-items-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: min-content;
    grid-gap: 0.1rem 1rem;
  }
</style>
