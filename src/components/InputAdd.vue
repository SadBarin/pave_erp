<template>
  <form @submit.prevent="submitElement" class="flex-center" >
    <div class="input-field margin-fix right-margin-little">
      <input
        class="input-add"
        type="text"
        maxlength="50"
        v-model.trim="name"
        :placeholder="placeholder"
      >
    </div>

    <button class="btn-transparent transparent btn-page-title blue-text text-darken-1" type="submit">
      <i class="material-icons big-material-icons">add</i>
    </button>
  </form>
</template>

<script>
export default {
  name: 'InputAdd',

  props: { placeholder: String },

  data () {
    return {
      name: ''
    }
  },

  methods: {
    submitElement () {
      this.$emit('add-element', this.name)
      this.name = ''
    }
  }
}
</script>
