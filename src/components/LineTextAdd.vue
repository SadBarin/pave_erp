<template>
  <div id="line-text-add">
    <div>
      <AppLineText
        :label="lineTextLabel"
        :placeholder="lineTextPlaceholder"
        inputID="input-add"
        maxLength="35"
        v-model="name"
      />
    </div>

    <AppButtonIcon material-icon="add" @button-click="submitElement"/>
  </div>
</template>

<script>
import AppLineText from '@/components/AppLineText'
import AppButtonIcon from '@/components/AppButtonIcon'

export default {
  name: 'LineTextAdd',

  props: {
    lineTextLabel: String,
    lineTextPlaceholder: String
  },

  components: { AppLineText, AppButtonIcon },

  data () {
    return {
      name: ''
    }
  },

  methods: {
    submitElement () {
      this.$emit('add-city', this.name)
      this.name = ''
    }
  }
}
</script>

<style scoped>
  #line-text-add {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
