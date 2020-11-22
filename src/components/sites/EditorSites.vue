<template>
  <div>
    <Popup
      v-if="popupShow"
      v-on:yes="editorExit(sites)"
      v-on:no="popupHidden"
      v-bind:popup-title="'Выйти?'"
    />

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
                    v-on:change="validate"
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
                  <small
                    class="helper-text invalid"
                    v-else-if="coincidence"
                  >
                    Город уже есть
                  </small>
                </div>
              </div>

              <div class="button-container">
                <button
                  class="btn waves-effect waves-light auth-submit blue darken-1"
                  type="submit"
                  v-on:click="editorCollection(sites)"
                >
                  <i class="material-icons">create</i> Редактировать
                </button>

                <button
                  class="btn waves-effect waves-light auth-submit blue darken-1"
                  v-on:click="popupVisibility"
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
import Popup from '@/components/Popup'
import M from 'materialize-css'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Sites',
  components: {
    Popup
  },
  data () {
    return {
      popupShow: false,
      coincidence: false,

      editedSitesName: '',
      countEmployees: '0',
      validateCheck: true,

      sites: [{}],
      employees: [{}]
    }
  },
  validations: {
    editedSitesName: { required, minLength: minLength(2) }
  },
  methods: {
    validate () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      // for (const city of this.sites) {
      //   if (city.cityName.toString().toLowerCase() === this.editedSitesName.toString().toLowerCase() || this.$v.$invalid) {
      //     this.coincidence = true
      //     this.validateCheck = false
      //     break
      //   } else {
      //     this.coincidence = false
      //     this.validateCheck = true
      //   }
      // }
    },

    popupVisibility () {
      this.popupShow = true
    },

    popupHidden () {
      this.popupShow = false
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
      if (this.validateCheck) {
        collection[this.searchIndex(collection)].cityName = this.editedSitesName

        this.employees.forEach((employee) => {
          if (employee.city === this.sites[this.searchIndex(collection)].cityName) {
            this.countEmployees++
          }
        })

        this.sites[this.searchIndex(collection)].employees = this.countEmployees

        this.editorExit(collection)
      }
    },

    saveCollection (collection, collectionName) {
      const parsed = JSON.stringify(collection)
      localStorage.setItem(collectionName, parsed)
    },

    updateCollection (collectionName) {
      if (localStorage.getItem(collectionName)) {
        try {
          this.sites = JSON.parse(localStorage.getItem(collectionName))
        } catch (e) {
          localStorage.removeItem(collectionName)
        }
      }
    }
  },
  mounted () {
    this.updateCollection('sites')

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
