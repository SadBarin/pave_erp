<template>
  <div>
    <template v-if="overlayShow">
      <div class="popup-overlay">
        <form class="card auth-card popup">
          <div class="card-content">
            <span class="card-title">Выйти?<br></span>
          </div>

          <div class="card-action btn-popup">
            <button
              type="submit"
              class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
              v-on:click="editorExit(sites)"
            >
              <i class="material-icons">check</i> Да
            </button>

            <button
              type="submit"
              class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
              v-on:click="overlayHidden"
            >
              <i class="material-icons">clear</i> Нет
            </button>
          </div>
        </form>
      </div>
    </template>

    <div class="page-title">
      <h3>Редактор города "{{ editedSitesName }}"</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form @submit.prevent="validate">
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
                <button
                  class="btn waves-effect waves-light auth-submit blue darken-1"
                  v-on:click="editorCollection(sites)"
                >
                  <i class="material-icons">create</i> Редактировать
                </button>

                <button
                  class="btn waves-effect waves-light auth-submit blue darken-1"
                  v-on:click="overlayVisibility"
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
      overlayShow: false,

      editedSitesName: '',
      countEmployees: '0',

      sites: [{}],
      employees: [{}]
    }
  },
  validations: {
    editedSitesName: { required, minLength: minLength(2) }
  },
  methods: {
    overlayVisibility () {
      this.overlayShow = true
    },

    overlayHidden () {
      this.overlayShow = false
    },

    validate () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
    },

    searchIndex (collection) {
      const object = collection.filter(element => element.edited !== false)
      return collection.findIndex((element) => element.id === object[0].id)
    },

    editorExit (collection) {
      collection[this.searchIndex(collection)].edited = false
      this.saveCollection(this.sites, 'sites')
      this.$router.push('/sites')
    },

    outputCollection (collection, additionalCollection) {
      this.editedSitesName = collection[this.searchIndex(collection)].cityName
    },

    editorCollection (collection, additionalCollection) {
      collection[this.searchIndex(collection)].cityName = this.editedSitesName

      this.employees.forEach((employee) => {
        if (employee.city === this.sites[this.searchIndex(collection)].cityName) {
          this.countEmployees++
        }
      })

      this.sites[this.searchIndex(collection)].employees = this.countEmployees

      this.editorExit(collection)
    },

    saveCollection (collection, collectionName) {
      const parsed = JSON.stringify(collection)
      localStorage.setItem(collectionName, parsed)
    }
  },
  mounted () {
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

    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })

    this.outputCollection(this.sites)
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
