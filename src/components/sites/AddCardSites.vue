<template>
  <form @submit.prevent="submitSites" class="button-container" >
    <div class="input-field input-field-blue input-field-add">
      <input
        class="input-add"
        type="text"
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
        Город должен содержать не менее {{$v.cityName.$params.minLength.min}} символов
      </small>
      <small
        class="helper-text invalid"
        v-else-if="coincidence"
      >
        Город уже есть
      </small>
    </div>

    <button class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" type="submit">
      <i class="material-icons">add</i> Добавить город
    </button>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AddCardSites',
  data () {
    return {
      cityName: '',
      coincidence: false,

      sites: [{}]
    }
  },
  validations: {
    cityName: { required, minLength: minLength(2) }
  },
  methods: {
    submitSites () {
      if (localStorage.getItem('sites')) {
        try {
          this.sites = JSON.parse(localStorage.getItem('sites'))
        } catch (e) {
          localStorage.removeItem('sites')
        }
      }

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      for (const city of this.sites) {
        if (city.cityName === undefined) continue
        if (city.cityName.toString().toLowerCase() === this.cityName.toString().toLowerCase()) {
          this.coincidence = true
          break
        } else {
          this.coincidence = false
        }
      }

      if (this.cityName.trim() && !this.coincidence) {
        this.cityName = this.cityName[0].toUpperCase() + this.cityName.substring(1)

        const newCity = {
          id: Date.now(),
          cityName: this.cityName,
          employees: 0,
          edited: false
        }

        this.$emit('add-city', newCity)
        this.cityName = ''
      }
    }
  }
}
</script>

<style scoped>
  .button-container .btn-flat {
    margin-left: 30px;
  }
</style>
