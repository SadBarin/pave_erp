<template>
  <form @submit.prevent="addCity" class="flex-center" >
    <div class="input-field margin-fix right-margin-little">
      <input
        class="input-add"
        type="text"
        id="city"
        placeholder="Название нового города"
        v-model.trim="cityName"
        :class="{invalid: ($v.cityName.$dirty && !$v.cityName.required) || ($v.cityName.$dirty && !$v.cityName.minLength)}"
      >
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

    <button class="btn-transparent transparent btn-page-title blue-text text-darken-1" title="Добавить новый город" type="submit">
      <i class="material-icons big-material-icons">add</i>
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
  props: { sites: Object },
  validations: {
    cityName: { required, minLength: minLength(2) }
  },
  methods: {
    createNewCity () {
      if (this.cityName && !this.coincidence) {
        // Capitalize City Name
        this.cityName = this.cityName[0].toUpperCase() + this.cityName.substring(1)

        // Body New City
        const newCity = {
          id: Date.now(),
          name: this.cityName
        }

        this.$emit('add-city', newCity)
        this.cityName = ''
      }
    },

    addCity () {
      // For validations
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.createNewCity()
    }
  }
}
</script>
