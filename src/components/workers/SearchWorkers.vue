<template>
  <div id="search">
    <Popup
      v-if="popupShow"
      v-on:yes="removeWorker(worker)"
      v-on:no="popupHidden"
      v-bind:popup-title="'Удалить рабочего?'"
      v-bind:popup-toast="'Рабочий был удалён'"
    />

    <div class="page-title flex-between-center">
      <h3>Поиск рабочих</h3>

      <button
        class="btn waves-effect waves-light auth-submit blue darken-1"
        v-on:click="searchAll()"
      >
        <i class="material-icons">search</i> Поиск
      </button>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form>
              <div>
                <ul id="tabs-swipe" class="tabs flex-center">
                  <li class="tab"><a class="active flex-center" href="#search-swipe-1"><i class="material-icons">account_box</i>ФИО</a></li>
                  <li class="tab"><a class="flex-center" href="#search-swipe-2"><i class="material-icons">assignment</i>Личные данные</a></li>
                  <li class="tab"><a class="flex-center" href="#search-swipe-3"><i class="material-icons">local_phone</i>Контактные данные</a></li>
                  <li class="tab"><a class="flex-center" href="#search-swipe-4"><i class="material-icons">rate_review</i>Рабочие данные</a></li>
                </ul>

<!--                <ul id="tabs-swipe" class="tabs flex-center">-->
<!--                  <li class="tab"><a class="active" href="#search-swipe-1">ФИО</a></li>-->
<!--                  <li class="tab"><a href="#search-swipe-2">Личные данные</a></li>-->
<!--                  <li class="tab"><a href="#search-swipe-3">Контактные данные</a></li>-->
<!--                  <li class="tab"><a href="#search-swipe-4">Рабочие данные</a></li>-->
<!--                </ul>-->
                <div id="search-swipe-1" class="tabs-content">
                  <div class="flex-column-center">
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

                <div id="search-swipe-2" class="tabs-content">
                  <div class="flex-column-center">
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

                <div id="search-swipe-3" class="tabs-content">
                  <div class="flex-column-center">
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

                <div id="search-swipe-4" class="tabs-content">
                  <div class="flex-column-center">
                    <div class="input-field editor-input">
                      <select class="browser-default editor-select"
                              v-model="searchInput.professions"
                      >
                        <option class="editor-option" selected value="">Не отмечено</option>
                        <option class="editor-option" v-for="(profession) of searchingProfessions()" :key="profession">
                          {{ profession }}
                        </option>
                      </select>
                      <label class="active">Профессия</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col s12 black-text">
                <h4>Найдено</h4>

                <TableWorkers
                  v-if="workers.length"
                  v-bind:workers="searchWorkers"
                  @popup-visibility="popupVisibility"
                  @edited-worker-status="editedWorkerStatus"
                />
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
import Popup from '@/components/Popup'
import TableWorkers from '@/components/workers/list/TableWorkers'

export default {
  name: 'SearchWorkers',
  components: { Popup, TableWorkers },
  data () {
    return {
      workers: [],
      sites: [],
      popupShow: false,
      worker: '',

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
    popupVisibility (id) {
      this.popupShow = true
      this.worker = id
    },

    popupHidden () {
      this.popupShow = false
    },

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
      this.popupHidden()
      this.searchWorkers = this.workers
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

    const tabs = document.querySelectorAll('.tabs')
    tabs.forEach((element) => {
      M.Tabs.init(element)
    })
  }
}
</script>

<style scoped>
</style>
