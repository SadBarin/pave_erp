<template>
  <section>
    <CardSites
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
