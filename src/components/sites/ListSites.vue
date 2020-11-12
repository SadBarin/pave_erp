<template>
  <section>
    <CardSites
      v-for="city of sites"
      :key="city.id"
      v-bind:city="city"
      v-on:remove-city="removeCity"
    />
  </section>
</template>

<script>
import CardSites from '@/components/sites/CardSites'
export default {
  name: 'ListSites',
  components: { CardSites },
  methods: {
    removeCity (id) {
      this.$emit('remove-city', id)
    }
  },
  props: ['sites']
}
</script>

<style scoped>
  .row {
    margin-bottom: 0;
  }
</style>
