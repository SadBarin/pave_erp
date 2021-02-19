<template>
  <section class="sites-container">
    <CardSites
      class="city"
      v-for="city of sites"
      :key="city.id"
      :city="city"
      @remove-city="removeCity"
    />
  </section>
</template>

<script>
import CardSites from '@/components/sites/list/CardSites'
export default {
  name: 'ListSites',
  components: { CardSites },
  props: ['sites'],
  methods: {
    removeCity (id) {
      this.$emit('remove-city', id)
    }
  }
}
</script>

<style scoped>
  .city {
    width: 32%;
    height: fit-content;
    margin-left: 0;
  }

  .sites-container {
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
  }
</style>
