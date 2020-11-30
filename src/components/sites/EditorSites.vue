<template>
  <div>
    <Popup
      v-if="popupShow"
      v-on:yes="editorExit(sites)"
      v-on:no="popupHidden"
      v-bind:popup-title="'Выйти?'"
    />

    <div class="page-title editor-title">
      <h3>Редактор города "{{ editedSitesName }}"</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form class="editor-form" @submit.prevent="validate">
              <div class="form-content editor-form-content">
                <div class="card editor-card blue darken-1 white-text">
                  <div class="card-content editor-card-content">
                    <span class="card-title">Общее</span>

                    <div class="editor-input input-field">
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
                </div>

                <div class="card editor-card red darken-1 white-text" v-if="coincidence">
                  <div class="card-content editor-card-content">
                    <span class="card-title error-title">Ошибка!</span>

                    <div>
                      <p>Проверьте правильность заполнения формы</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="editor-btns">
                <button
                  class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
                  type="submit"
                  v-on:click="editorCollection(sites)"
                >
                  <i class="material-icons">create</i> Редактировать
                </button>

                <button
                  class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
                  v-on:click.prevent="popupVisibility"
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
      validateCheck: true,
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
    validate () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      for (const city of this.sites) {
        if (city.cityName.toString().toLowerCase() === this.editedSitesName.toString().toLowerCase() || this.$v.$invalid) {
          this.coincidence = true
          this.validateCheck = false
          break
        } else {
          this.coincidence = false
          this.validateCheck = true
        }
      }
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
  .editor-title{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .editor-form,
  .editor-form-content,
  .editor-card-content {
    color: white !important;

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .editor-card {
    width: 100%;
  }

  .editor-input {
    width: 50%;
  }

  .editor-input input {
    color: rgba(255, 255, 255, 0.9);
  }

  .editor-input label {
    color: white;
  }

  input:not([type]),
  input[type=text]:not(.browser-default),
  input[type=password]:not(.browser-default),
  input[type=email]:not(.browser-default),
  input[type=url]:not(.browser-default),
  input[type=time]:not(.browser-default),
  input[type=date]:not(.browser-default),
  input[type=datetime]:not(.browser-default),
  input[type=datetime-local]:not(.browser-default),
  input[type=tel]:not(.browser-default),
  input[type=number]:not(.browser-default),
  input[type=search]:not(.browser-default),
  textarea.materialize-textarea {
    border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  }

  input.invalid:not([type]),
  input.invalid:not([type]):focus,
  input.invalid[type=text]:not(.browser-default),
  input.invalid[type=text]:not(.browser-default):focus,
  input.invalid[type=password]:not(.browser-default),
  input.invalid[type=password]:not(.browser-default):focus,
  input.invalid[type=email]:not(.browser-default),
  input.invalid[type=email]:not(.browser-default):focus,
  input.invalid[type=url]:not(.browser-default),
  input.invalid[type=url]:not(.browser-default):focus,
  input.invalid[type=time]:not(.browser-default),
  input.invalid[type=time]:not(.browser-default):focus,
  input.invalid[type=date]:not(.browser-default),
  input.invalid[type=date]:not(.browser-default):focus,
  input.invalid[type=datetime]:not(.browser-default),
  input.invalid[type=datetime]:not(.browser-default):focus,
  input.invalid[type=datetime-local]:not(.browser-default),
  input.invalid[type=datetime-local]:not(.browser-default):focus,
  input.invalid[type=tel]:not(.browser-default),
  input.invalid[type=tel]:not(.browser-default):focus,
  input.invalid[type=number]:not(.browser-default),
  input.invalid[type=number]:not(.browser-default):focus,
  input.invalid[type=search]:not(.browser-default),
  input.invalid[type=search]:not(.browser-default):focus,
  textarea.materialize-textarea.invalid,
  textarea.materialize-textarea.invalid:focus,
  .select-wrapper.invalid>input.select-dropdown,
  .select-wrapper.invalid>input.select-dropdown:focus {
    border: none;
  }

  /* label focus color */
  #blue-layout .input-field input:focus + label {
    color: white;
  }
  /* label underline focus color */
  #blue-layout .input-field input:focus {
    border-bottom: 1px solid white;
    box-shadow: 0 1px 0 0 white;
  }

  .input-field .helper-text {
    color: rgba(255, 255, 255, 0.7)
  }

  #blue-layout .editor-select {
    border: none;
    border-bottom: 1px solid white;
    padding: 0;

    text-align-last: center;
    text-align: center;

    margin-top: 10px;

    cursor: pointer;
  }

  #blue-layout .editor-select .invalid {
    border: none;
    border-bottom: 1px solid #F44336;
  }

  #blue-layout small .invalid {
    border: none !important;
  }

  .editor-option {
    margin-left: 15px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .editor-select:focus {
    outline: none !important;
  }

  .editor-btns {
    width: 50%;
    margin-top: 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .editor-btn {
    width: 48%;
  }
</style>
