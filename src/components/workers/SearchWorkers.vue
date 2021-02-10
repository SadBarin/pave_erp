<template>
  <div id="search">
    <div class="page-title flex-between-center">
      <h3>Поиск рабочих</h3>

      <button
        class="btn waves-effect waves-light auth-submit blue darken-1"
        @click="searchAll"
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

                <div id="search-swipe-1" class="tabs-content">
                  <div class="flex-column-center">
                    <div class="input-field editor-input flex-center">
                      <label class="editor-label active" for="name">Имя</label>
                      <input
                        id="name"
                        type="text"
                        v-model.trim="searchInput.name"
                      >
                    </div>

                    <div class="input-field editor-input flex-center">
                      <label class="editor-label" for="surname">Фамилия</label>
                      <input
                        id="surname"
                        type="text"
                        v-model.trim="searchInput.surname"
                      >
                    </div>

                    <div class="input-field editor-input flex-center">
                      <label class="editor-label" for="patronymic">Отчество</label>
                      <input
                        id="patronymic"
                        type="text"
                        v-model.trim="searchInput.patronymic"
                      >
                    </div>
                  </div>
                </div>

                <div id="search-swipe-2" class="tabs-content">
                  <div class="flex-column-center">
                    <div class="input-field editor-input flex-center">
                      <label class="editor-label" for="age">Возраст</label>
                      <input
                        id="age"
                        type="number"
                        v-model.trim="searchInput.age"
                      >
                    </div>

                    <div class="input-field editor-input flex-center">
                      <label class="editor-label">Пол</label>
                      <select
                        class="browser-default editor-select"
                        id="sex"
                        v-model.trim="searchInput.sex"
                      >
                        <option class="editor-option" selected value="">Не отмечено</option>
                        <option class="editor-option" value="Мужской">Мужской</option>
                        <option class="editor-option" value="Женский">Женский</option>
                      </select>
                    </div>

                    <div class="input-field editor-input flex-center">
                      <label class="editor-label">Мед. Книга</label>
                      <select
                        class="browser-default editor-select"
                        id="medicalBook"
                        v-model.trim="searchInput.medicalBook"
                      >
                        <option class="editor-option" selected value="">Не отмечено</option>
                        <option class="editor-option" value="Есть">Есть</option>
                        <option class="editor-option" value="Отсутствует">Отсутствует</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div id="search-swipe-3" class="tabs-content">
                  <div class="flex-column-center">
                    <div class="input-field editor-input flex-center">
                      <label class="editor-label">Город</label>
                      <select class="browser-default editor-select"
                              v-model="searchInput.city"
                      >
                        <option class="editor-option" selected value="">Не отмечено</option>
                        <option class="editor-option" v-for="(city) of sites" :key="city.value">
                          {{ city.name }}
                        </option>
                      </select>
                    </div>

                    <div class="input-field editor-input flex-center">
                      <label class="editor-label" for="mobilePhone">Тел. Моб.</label>
                      <input
                        id="mobilePhone"
                        type="tel"
                        v-model.trim="searchInput.mobilePhone"
                      >
                    </div>
                  </div>
                </div>

                <div id="search-swipe-4" class="tabs-content">
                  <div class="flex-column-center">
                    <div class="input-field editor-input flex-center">
                      <label class="editor-label">Профессия</label>
                      <select class="browser-default editor-select"
                              v-model="searchInput.professions"
                      >
                        <option class="editor-option" selected value="">Не отмечено</option>
                        <option class="editor-option" v-for="(profession) of searchingProfessions()" :key="profession">
                          {{ profession }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col s12 black-text">
                <h4>Найдено</h4>

                <TableWorkers
                  @remove-worker="removeWorker"
                  :workers="workers"
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
import TableWorkers from '@/components/workers/TableWorkers'
import popupMixin from '@/mixins/popupMixin'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'SearchWorkers',
  components: { TableWorkers },
  mixins: [popupMixin],
  data () {
    return {
      updateTimeout: 60000,

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

      searchWorkers: []
    }
  },
  computed: {
    ...mapGetters([
      'sites',
      'workers'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_WORKERS_FROM_LOCAL_STORAGE'
    ]),

    searching (obj) {
      // return function (key, searchKey) {
      //   if (searchKey !== '') {
      //     return obj.filter(worker => worker[key].toLowerCase() === searchKey.toLowerCase())
      //   }
      // }
    },

    searchAll () {
      // let bufferWorkers = this.workers
      //
      // for (const input in this.searchInput) {
      //   const searchingWorkers = this.searching(bufferWorkers)
      //
      //   const workers = searchingWorkers(input, this.searchInput[input])
      //   if (workers !== undefined) {
      //     bufferWorkers = workers
      //   }
      // }
      //
      // this.searchWorkers = bufferWorkers
      //
      // this.searchingProfessions()
    },

    searchingProfessions () {
      // const professionsList = []
      // this.workers.forEach((worker) => {
      //   if (professionsList.indexOf(worker.professions) === -1) {
      //     professionsList.push(worker.professions)
      //   }
      // })
      //
      // return professionsList
    },

    removeWorker (id) {
      firebase.database().ref('/workers/' + id).remove()
        .then(() => {
          console.log('Рабочий удалён 🗑️')
        })
    }
  },
  mounted () {
    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.searchWorkers = this.workers

    const tabs = document.querySelectorAll('.tabs')
    tabs.forEach((element) => {
      M.Tabs.init(element)
    })
  }
}
</script>

<style scoped>
  #app .editor-input {
    width: 50%;
    justify-content: space-between;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .editor-select {
    width: 80%;
  }

  #app .editor-input input {
    width: 80%;
    height: 2rem;
    transform: none;
  }

  #app .editor-label {
    position: initial;
    transform: translateY(0px);
  }

  #app .editor-input>label:not(.label-icon).active {
    color: var(--main-blue);
    transform: translateY(0px);
  }
</style>
