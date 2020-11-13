<template>
  <div>
    <div class="page-title">
      <h3>Настройка города</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form @submit.prevent="validateSites">
              <div class="form-content">
                <div class="input-field">
                  <input
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
                    Город должен содержать не менее {{$v.cityName.$params.minLength.min}} символов.
                  </small>
                </div>
              </div>

              <div class="button-container">
                <button type="submit"
                        class="btn waves-effect waves-light auth-submit blue darken-1"
                >
                  Редактировать
                </button>

                <router-link type="submit"
                             class="btn waves-effect waves-light auth-submit blue darken-1" to="/sites"
                >
                  Вернуться назад
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import M from 'materialize-css'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Sites',
  data () {
    return {
      cityName: ''
    }
  },
  validations: {
    cityName: { required, minLength: minLength(2) }
  },
  methods: {
    validateSites () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
    }
  },
  mounted () {
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })
  }
}
</script>

<style scoped>
  .row .col {
    padding: 0;
  }

  .btn {
    margin-right: 10px;
  }

  form {
    width: 100%;
  }

  .form-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .input-field {
    width: 48%;
  }
</style>
