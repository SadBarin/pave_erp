<template>
  <div id="search">
    <div class="page-title flex-center">
      <h3>Поиск рабочих</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form>
              <ul class="collapsible black-text form-content editor-form-content">

                <li class="editor-card blue white-text">
                  <div class="collapsible-header blue darken-1"><i class="material-icons">account_box</i>ФИО</div>
                  <div class="collapsible-body blue">

                    <div class="collapsible-body-container">

                      <div class="input-field editor-input">
                        <input
                          id="name"
                          type="text"
                          v-model.trim="searchInput.name"
                        >
                        <label class="active" for="name">Имя</label>
                      </div>

                      <div class="input-field editor-input">
                        <input
                          id="surname"
                          type="text"
                          v-model.trim="searchInput.surname"
                        >
                        <label class="active" for="surname">Фамилия</label>
                      </div>

                      <div class="input-field editor-input">
                        <input
                          id="patronymic"
                          type="text"
                          v-model.trim="searchInput.patronymic"
                        >
                        <label class="active" for="patronymic">Отчество</label>
                      </div>

                    </div>

                  </div>
                </li>

                <li class="editor-card blue white-text">
                  <div class="collapsible-header blue darken-1"><i class="material-icons">assignment</i>Личные данные</div>
                  <div class="collapsible-body blue">

                    <div class="collapsible-body-container">

                      <div class="input-field editor-input">
                        <input
                          id="age"
                          type="number"
                          v-model.trim="searchInput.age"
                        >
                        <label class="active" for="age">Возраст</label>
                      </div>

                      <div class="input-field editor-input">
                        <select
                          class="browser-default editor-select"
                          id="sex"
                          v-model.trim="searchInput.sex"
                        >
                          <option class="editor-option" selected value="">Не отмечено</option>
                          <option class="editor-option" value="Мужской">Мужской</option>
                          <option class="editor-option" value="Женский">Женский</option>
                        </select>
                        <label class="active">Пол</label>
                      </div>

                      <div class="input-field editor-input">
                        <select
                          class="browser-default editor-select"
                          id="medicalBook"
                          v-model.trim="searchInput.medicalBook"
                        >
                          <option class="editor-option" selected value="">Не отмечено</option>
                          <option class="editor-option" value="Есть">Есть</option>
                          <option class="editor-option" value="Отсутствует">Отсутствует</option>
                        </select>
                        <label class="active">Медицинская Книга</label>
                      </div>

                    </div>

                  </div>
                </li>

                <li class="editor-card blue white-text">
                  <div class="collapsible-header blue darken-1"><i class="material-icons">local_phone</i>Контактные данные</div>
                  <div class="collapsible-body blue">

                    <div class="collapsible-body-container">
                      <div class="input-field editor-input">
                        <select class="browser-default editor-select"
                                v-model="searchInput.city"
                        >
                          <option class="editor-option" selected value="">Не отмечено</option>
                          <option class="editor-option" v-for="(city) of sites" :key="city.cityName">
                            {{ city.cityName }}
                          </option>
                        </select>
                        <label class="active">Город</label>
                      </div>

                      <div class="input-field editor-input">
                        <input
                          id="mobilePhone"
                          type="tel"
                          v-model.trim="searchInput.mobilePhone"
                        >
                        <label class="active" for="mobilePhone">Телефон Мобильный</label>
                      </div>
                    </div>

                  </div>
                </li>

                <li class="editor-card blue white-text">
                  <div class="collapsible-header blue darken-1"><i class="material-icons">rate_review</i>Рабочие данные</div>
                  <div class="collapsible-body blue">

                    <div class="collapsible-body-container">
                      <div class="input-field editor-input">
                        <select class="browser-default editor-select"
                                v-model="searchInput.professions"
                        >
                          <option class="editor-option" selected value="">Не отмечено</option>
                          <option class="editor-option" v-for="(profession) of searchingProfessions()" :key="profession">
                            {{ profession }}
                          </option>
                        </select>
                        <label class="active">Профессии</label>
                      </div>
                    </div>

                  </div>
                </li>

              </ul>

              <div class="col s12 black-text">
                <h4 class="page-title">Найдено</h4>
                <div>
                  <table class="search-table">
                    <tr>
                      <th>Фамилия</th>
                      <th>Имя</th>
                      <th>Отчество</th>
                      <th>Пол</th>
                      <th>Возраст</th>
                      <th>Мед.книжка</th>
                      <th>Город</th>
                      <th>Телефон</th>
                      <th>Профессия</th>
                      <th></th>
                    </tr>
                    <tr v-for="worker in searchWorkers" :key="worker">
                      <td>{{worker.surname}}</td>
                      <td>{{worker.name}}</td>
                      <td>{{worker.patronymic}}</td>
                      <td>{{worker.sex}}</td>
                      <td>{{worker.age}}</td>
                      <td>{{worker.medicalBook}}</td>
                      <td>{{worker.city}}</td>
                      <td>{{worker.mobilePhone}}</td>
                      <td>{{worker.professions}}</td>
                      <td>
                        <div class="flex-center">
                          <button class="btn-transparent transparent waves-effect auth-submit blue-text text-darken-1"
                                  v-on:click.prevent="editedWorkerStatus(worker.id)"
                          >
                            <i class="material-icons">create</i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <div class="flex-center editor-btns">
      <button
        class="btn waves-effect waves-light auth-submit blue darken-1"
        v-on:click="searchAll()"
      >
        <i class="material-icons">search</i> Поиск
      </button>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'

export default {
  name: 'SearchWorkers',
  data () {
    return {
      workers: [],
      sites: [],

      searchInput: {
        name: '',
        surname: '',
        patronymic: '',
        age: '',
        city: '',
        mobilePhone: '',
        professions: '',
        sex: '',
        medicalBook: ''
      },

      searchWorkers: ''
    }
  },
  methods: {
    searching (obj) {
      return function (key, searchKey) {
        if (searchKey !== '') {
          return obj.filter(worker => worker[key].toLowerCase() === searchKey.toLowerCase())
        }
      }
    },

    searchAll () {
      let bufferWorkers = this.workers

      for (const input in this.searchInput) {
        const searchingWorkers = this.searching(bufferWorkers)

        const workers = searchingWorkers(input, this.searchInput[input])
        if (workers !== undefined) {
          bufferWorkers = workers
        }
      }

      this.searchWorkers = bufferWorkers

      try {
        if (this.searchWorkers.length === 0) {
          M.toast({ html: 'Ничего не найдено!' })
        } else {
          M.toast({ html: `Найдено: ${this.searchWorkers.length}` })
        }
      } catch (e) {

      }

      this.searchingProfessions()
    },

    searchingProfessions () {
      const professionsList = []
      this.workers.forEach((worker) => {
        if (professionsList.indexOf(worker.professions) === -1) {
          professionsList.push(worker.professions)
        }
      })

      return professionsList
    },

    editedWorkerStatus (id) {
      const index = this.workers.findIndex((element) => element.id === id)
      this.workers[index].edited = true
      this.saveCollection(this.workers, 'workers')
      this.$router.push('/workers/editor')
    },

    removeWorker (id) {
      this.workers = this.workers.filter(worker => worker.id !== id)
      this.saveCollection(this.workers, 'workers')
    },

    addWorker (worker) {
      this.workers.push(worker)
      this.saveCollection(this.workers, 'workers')
    },

    saveCollection (collection, collectionName) {
      const parsed = JSON.stringify(collection)
      localStorage.setItem(collectionName, parsed)
    },

    updateCollection (collectionName) {
      if (localStorage.getItem(collectionName)) {
        try {
          this.workers = JSON.parse(localStorage.getItem(collectionName))
        } catch (e) {
          localStorage.removeItem(collectionName)
        }
      }
    }
  },
  mounted () {
    this.updateCollection('workers')
    this.searchWorkers = this.workers

    if (localStorage.getItem('sites')) {
      try {
        this.sites = JSON.parse(localStorage.getItem('sites'))
      } catch (e) {
        localStorage.removeItem('sites')
      }
    }

    const collapsible = document.querySelectorAll('.collapsible')
    collapsible.forEach((element) => {
      M.Collapsible.init(element)
    })
  }
}
</script>

<style scoped>
  .app-content section {
    height: 70vh;

    overflow-y: auto;

    padding-bottom: 15px;
  }

  .page-title {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .collapsible-header,
  .collapsible-body-container{
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .collapsible-body-container {
    flex-direction: column;
  }

  /*.editor-form-content {*/
  /*  color: white !important;*/

  /*  width: 100%;*/

  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  align-items: flex-start;*/
  /*  justify-content: center;*/
  /*  flex-wrap: wrap;*/
  /*}*/

  .row .col.s12 {
    padding: 0;
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

  /* label focus color */
  #app .input-field input:focus + label {
    color: white;
  }
  /* label underline focus color */
  #app .input-field input:focus {
    border-bottom: 1px solid white;
    box-shadow: 0 1px 0 0 white;
  }

  .input-field .helper-text {
    color: rgba(255, 255, 255, 0.7)
  }

  #app small .invalid {
    border: none !important;
  }

  .search-table, td, th {
    text-align: center;
  }

  .editor-btns {
    margin-top: 1rem;
  }
</style>
