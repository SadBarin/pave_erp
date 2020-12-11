<template>
  <div id="search">
    <div class="page-title editor-title">
      <h3>Поиск рабочих</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form class="editor-form">
              <ul class="collapsible black-text form-content editor-form-content">
                <li class="editor-card blue white-text active">
                  <div class="collapsible-header blue darken-2"><i class="material-icons">account_box</i>ФИО</div>

                  <div class="collapsible-body blue">
                    <div class="input-field editor-input">
                      <input
                        id="name"
                        type="text"
                        v-model.trim="searchName"
                      >
                      <label class="active" for="name">Имя</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="surname"
                        type="text"
                        v-model.trim="searchSurname"
                      >
                      <label class="active" for="surname">Фамилия</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="patronymic"
                        type="text"
                        v-model.trim="searchPatronymic"
                      >
                      <label class="active" for="patronymic">Отчество</label>
                    </div>
                  </div>
                </li>

<!--                <li class="editor-card blue darken-1 white-text">-->
<!--                  <div class="collapsible-header blue darken-1"><i class="material-icons">assignment</i>Личные данные</div>-->
<!--                  <div class="collapsible-body blue">-->
<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="birthday"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="birthday">Дата Рождения</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <select-->
<!--                        class="browser-default editor-select"-->
<!--                        id="sex"-->
<!--                      >-->
<!--                        <option class="editor-option" value="1">Мужской</option>-->
<!--                        <option class="editor-option" value="2">Женский</option>-->
<!--                      </select>-->
<!--                      <label class="active">Биологический Пол</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="nationality"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="nationality">Национальность</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="medicalBook"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="medicalBook">Медицинская Книга</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="education"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="education">Образование</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="university"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="university">ВУЗ</label>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </li>-->

<!--                <li class="editor-card blue darken-1 white-text">-->
<!--                  <div class="collapsible-header blue darken-1"><i class="material-icons">book</i>Паспортные данные</div>-->
<!--                  <div class="collapsible-body blue">-->
<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="passportID"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="PassportID">Номер Паспорта</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="passportDate"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="passportDate">Дата Выдачи Паспорта</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="passportIssued"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="passportIssued">Кем выдан</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="registration"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="registration">Прописка</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="address"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="address">Адрес</label>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </li>-->

<!--                <li class="editor-card blue darken-1 white-text">-->
<!--                  <div class="collapsible-header blue darken-1"><i class="material-icons">credit_card</i>Банковские данные</div>-->
<!--                  <div class="collapsible-body blue">-->
<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="nameCard"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="nameCard">Имя Держателя Карты</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="surnameCard"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="surnameCard">Фамилия Держателя Карты</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="accountNumberCard"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="accountNumberCard">Номер Карты</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <select-->
<!--                        class="browser-default editor-select"-->
<!--                        id="bank"-->
<!--                      >-->
<!--                        <option class="editor-option" value="1">СберБанк</option>-->
<!--                        <option class="editor-option" value="2">Банк ВТБ</option>-->
<!--                        <option class="editor-option" value="3">Газпромбанк</option>-->
<!--                        <option class="editor-option" value="4">Национальный Клиринговый Центр</option>-->
<!--                        <option class="editor-option" value="5">Альфа-Банк</option>-->
<!--                        <option class="editor-option" value="6">Россельхозбанк</option>-->
<!--                        <option class="editor-option" value="7">Московский Кредитный Банк</option>-->
<!--                        <option class="editor-option" value="8">Банк «Открытие»</option>-->
<!--                        <option class="editor-option" value="9">Совкомбанк</option>-->
<!--                        <option class="editor-option" value="10">Росбанк</option>-->
<!--                        <option class="editor-option" value="11">Тинькофф Банк</option>-->
<!--                      </select>-->
<!--                      <label class="active">Банк</label>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </li>-->

<!--                <li class="editor-card blue darken-1 white-text">-->
<!--                  <div class="collapsible-header blue darken-1"><i class="material-icons">local_phone</i>Контактные данные</div>-->
<!--                  <div class="collapsible-body blue">-->
<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="homePhone"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="homePhone">Телефон Домашний</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="mobilePhone"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="mobilePhone">Телефон Мобильный</label>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </li>-->

<!--                <li class="editor-card blue darken-1 white-text">-->
<!--                  <div class="collapsible-header blue darken-1"><i class="material-icons">rate_review</i>Рабочие данные</div>-->
<!--                  <div class="collapsible-body blue">-->
<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="accountNumber"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="accountNumber">Учётный номер</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="number"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="number">Номер</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="previousWork"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="previousWork">Прежняя Работа</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="reasonComing"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="reasonComing">Почему пришел к нам</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="professions"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="professions">Профессии</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <select-->
<!--                        id="nightShift"-->
<!--                        class="browser-default editor-select"-->
<!--                      >-->
<!--                        <option class="editor-option" value="1">Да</option>-->
<!--                        <option class="editor-option" value="2">Нет</option>-->
<!--                      </select>-->
<!--                      <label class="active">Ночная</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <select-->
<!--                        id="checkMVD"-->
<!--                        class="browser-default editor-select"-->
<!--                      >-->
<!--                        <option class="editor-option" value="1">Да</option>-->
<!--                        <option class="editor-option" value="2">Нет</option>-->
<!--                      </select>-->
<!--                      <label class="active">Проверка МВД</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="dateInterview"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="dateInterview">Дата Собеседования</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="uniform"-->
<!--                        type="text"-->
<!--                      >-->
<!--                      <label class="active" for="uniform">Униформа</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <select-->
<!--                        id="fired"-->
<!--                        class="browser-default editor-select"-->
<!--                      >-->
<!--                        <option class="editor-option" value="1">Да</option>-->
<!--                        <option class="editor-option" value="2">Нет</option>-->
<!--                      </select>-->
<!--                      <label class="active">Уволен</label>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </li>-->
              </ul>

              <div class="col s12 black-text">
                <h4 class="title">Найдено:</h4>
                <div>
                  <ListWorkers
                    v-if="searchWorkers.length"
                    v-bind:workers="searchWorkers"
                    @remove-worker="removeWorker"
                  />

                  <table class="search-table">
                    <tr>
                      <th>Имя</th>
                      <th>Фамилия</th>
                      <th>Отчество</th>
                      <th>Пол</th>
                      <th>Возраст</th>
                      <th>Мед.книжка</th>
                      <th>Город</th>
                      <th>Телефон</th>
                      <th>Профессия</th>
                      <th>Действие</th>
                    </tr>
                    <tr>
                      <td>Олег</td>
                      <td>Разин</td>
                      <td>Степанович</td>
                      <td>Мужской</td>
                      <td>38 лет</td>
                      <td>Да</td>
                      <td>Москва</td>
                      <td>7292322323</td>
                      <td>Электрик</td>
                      <td>
                        <button class="btn-flat editor-btn search-button blue darken-2 waves-effect waves-light auth-submit white-text">
                          <i class="material-icons">create</i> Редактировать
                        </button>
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

    <div>
      <button
        class="btn waves-effect waves-light auth-submit blue darken-2"
        v-on:click="searchAll()"
      >
        <i class="material-icons">search</i> Поиск
      </button>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'
import ListWorkers from '@/components/workers/ListWorkers'

export default {
  name: 'SearchWorkers',
  components: { ListWorkers },
  data () {
    return {
      workers: [],

      searchName: '',
      searchSurname: '',
      searchPatronymic: '',
      searchWorkers: ''
    }
  },
  methods: {
    searching (obj, searchObj) {
      return function (key, searchKey) {
        searchObj = obj.filter(worker => worker.name === searchKey || console.log(worker.name))
      }
    },

    searchAll () {
      // const searchingWorkers = this.searching(this.workers, this.searchWorkers)
      // searchingWorkers('name', this.searchName)

      if (this.searchName !== '') {
        this.searchWorkers = this.workers.filter(worker => worker.name === this.searchName)
      }

      if (this.searchSurname !== '') {
        this.searchWorkers = this.workers.filter(worker => worker.surname === this.searchSurname)
      }

      if (this.searchPatronymic !== '') {
        this.searchWorkers = this.workers.filter(worker => worker.patronymic === this.searchPatronymic)
      }

      if (this.searchWorkers.length === 0) {
        M.toast({ html: 'Ничего не найдено.' })
      }
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

  .editor-title{
    display: flex;
    align-items: center;
    justify-content: start;
  }

  .editor-form,
  .editor-form-content,
  .editor-card-content {
    color: white !important;

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    flex-wrap: wrap;
  }

  .row .col.s12 {
    padding: 0;
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

  .search-table, td, th {
    text-align: center;
  }

  .editor-btns {
    width: 100%;
    margin-top: 18px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .editor-btn {
    margin: 0 auto;
  }

  #search .workers_section {
    height: auto;
    width: auto;

    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
