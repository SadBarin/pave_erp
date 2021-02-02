<template>
  <form @submit.prevent="submitSites" class="flex-center" >
    <div class="input-field">
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

    <button class="btn-floating btn-page-title blue darken-1 waves-effect waves-circle waves-light" title="Добавить город" type="submit">
      <i class="material-icons">add</i>
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
      coincidence: false
    }
  },
  props: ['sites'],
  validations: {
    cityName: { required, minLength: minLength(2) }
  },
  methods: {
    searchSimilar () {
      for (const city of this.sites) {
        if (city.cityName === undefined) continue
        if (city.cityName.toString().toLowerCase() === this.cityName.toString().toLowerCase()) {
          this.coincidence = true
          break
        } else {
          this.coincidence = false
        }
      }
    },

    createNewCity () {
      if (this.cityName && !this.coincidence) {
        // Capitalize City Name
        this.cityName = this.cityName[0].toUpperCase() + this.cityName.substring(1)

        // Body New City
        const newCity = {
          id: Date.now(),
          cityName: this.cityName,
          employees: 0,
          edited: false
        }

        this.$emit('add-city', newCity)
        this.cityName = ''
      }
    },

    submitSites () {
      // For validations
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.searchSimilar()
      this.createNewCity()
    }
  }
}
</script>

<style scoped>
  .btn-floating {
    margin-left: 2rem;
  }
</style>
