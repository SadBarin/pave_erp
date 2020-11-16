<template>
  <div>
    <div class="page-title">
      <h3>Настройка города "{{ editedSites }}"</h3>
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
                    v-model.trim="editedSitesName"
                    :class="{invalid: ($v.editedSitesName.$dirty && !$v.editedSitesName.required) || ($v.editedSitesName.$dirty && !$v.editedSitesName.minLength)}"
                  >
                  <label for="city" class="active">Город</label>
                  <small
                    class="helper-text invalid"
                    v-if="$v.editedSitesName.$dirty && !$v.editedSitesName.required"
                  >
                    Введите город
                  </small>
                  <small
                    class="helper-text invalid"
                    v-else-if="$v.editedSitesName.$dirty && !$v.editedSitesName.minLength"
                  >
                    Город должен содержать не менее {{$v.editedSitesName.$params.minLength.min}} символов.
                  </small>
                </div>
              </div>

              <div class="button-container">
                <button type="submit"
                        class="btn waves-effect waves-light auth-submit blue darken-1"
                        v-on:click="editorName"
                >
                  <i class="material-icons">create</i> Редактировать
                </button>

                <button type="submit"
                             class="btn waves-effect waves-light auth-submit blue darken-1"
                             v-on:click="editorExit"
                >
                  <i class="material-icons">arrow_back</i> Вернуться назад
                </button>
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
      editedSitesName: '',
      countEmployees: '',

      sites: [{ id: 1, cityName: 'Минск', edited: true }],
      employees: [{ id: 1, email: 'admin@admin.by', name: 'Админ', city: 'Гомель' }]
    }
  },
  computed: {
    editedSites: function () {
      const cityName = this.sites.filter(city => city.edited !== false)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.editedSitesName = cityName[0].cityName
      return cityName[0].cityName
    }
  },
  validations: {
    editedSitesName: { required, minLength: minLength(2) }
  },
  methods: {
    validateSites () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
    },

    editorExit () {
      const city = this.sites.filter(city => city.edited !== false)
      const index = this.sites.findIndex((element) => element.id === city[0].id)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.sites[index].edited = false
      this.saveSites()
      this.$router.push('/sites')
    },

    editorName () {
      const city = this.sites.filter(city => city.edited !== false)
      const index = this.sites.findIndex((element) => element.id === city[0].id)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.sites[index].cityName = this.editedSitesName

      this.employees.forEach((employee) => {
        if (employee.city === this.sites[index].cityName) {
          this.countEmployees++
        }
      })

      this.sites[index].employees = this.countEmployees

      this.editorExit()
    },

    saveSites () {
      const parsed = JSON.stringify(this.sites)
      localStorage.setItem('sites', parsed)
    }
  },
  mounted () {
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })

    if (localStorage.getItem('sites')) {
      try {
        this.sites = JSON.parse(localStorage.getItem('sites'))
      } catch (e) {
        localStorage.removeItem('sites')
      }
    }

    if (localStorage.getItem('employees')) {
      try {
        this.employees = JSON.parse(localStorage.getItem('employees'))
      } catch (e) {
        localStorage.removeItem('employees')
      }
    }
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
