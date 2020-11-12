<template>
  <form @submit.prevent="onSubmit" class="button-container" >
    <div class="input-field input-field-blue">
      <input type="text" id="city" v-model="cityName">
      <label for="city">Город</label>
    </div>

    <button class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" type="submit">Добавить город</button>
  </form>
</template>

<script>
export default {
  name: 'AddCardSites',
  data () {
    return {
      cityName: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.cityName.trim()) {
        const newCity = {
          id: Date.now(),
          cityName: this.cityName
        }

        this.$emit('add-city', newCity)
        this.cityName = ''
      }
    }
  }
}
</script>

<style scoped>
  .button-container {
    display: flex;
    align-items: center;
  }

  .button-container .btn-flat {
    margin-left: 30px;
  }
</style>
