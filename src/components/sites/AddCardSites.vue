<template>
  <form @submit.prevent="submitSites" class="button-container" >
    <div class="input-field input-field-blue">
      <input type="text"
             id="city"
             v-model.trim="cityName"
             :class="{invalid: ($v.cityName.$dirty && !$v.cityName.required) || ($v.cityName.$dirty && !$v.cityName.minLength)}"
      >
      <label for="city">Город</label>
      <small
        class="helper-text invalid"
        v-if="$v.cityName.$dirty && !$v.cityName.required"
      >
        Введите город
      </small>
      <small
        class="helper-text invalid"
        v-else-if="$v.cityName.$dirty && !$v.cityName.minLength"
      >
        Город должен содержать не менее {{$v.cityName.$params.minLength.min}} символов.
      </small>
    </div>

    <button class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" type="submit">Добавить город</button>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AddCardSites',
  data () {
    return {
      cityName: ''
    }
  },
  validations: {
    cityName: { required, minLength: minLength(2) }
  },
  methods: {
    submitSites () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

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
