<template>
  <form class="card auth-card" @submit.prevent="submitLogin">
    <div class="card-content">
      <h4 class="card-title">Вход в систему</h4>

      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email" class="active">Почта</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Введите ваш email</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Введите правильно email
        </small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          autocomplete="on"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password" class="active">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          Введите ваш пароль
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          Пароль должен содержать не менее {{ $v.password.$params.minLength.min }} символов.
        </small>
      </div>

      <ul class="collapsible black-text form-content">
        <li class="white-text">
          <div class="collapsible-header blue darken-1"><i class="material-icons">clear_all</i>Дополнительные функции
            входа
          </div>
          <div class="collapsible-body white black-text">
            <label>
              <input type="checkbox" class="filled-in" v-model="localStorageClear"/>
              <span class="collapsible-label">Удалить предыдущие данные</span>
            </label>
            <br>
            <label v-if="localStorageClear">
              <input type="checkbox" class="filled-in" v-model="addCity"/>
              <span class="collapsible-label">Добавить города</span>
            </label>

            <label v-if="!localStorageClear" title="Доступно только при очистке предыдущих данных">
              <input type="checkbox" class="filled-in" disabled="disabled"/>
              <span class="collapsible-label">Добавить города</span>
            </label>
            <br>
            <label v-if="localStorageClear">
              <input type="checkbox" class="filled-in" v-model="addWorkers"/>
              <span class="collapsible-label">Добавить рабочих</span>
            </label>
            <label v-if="!localStorageClear" title="Доступно только при очистке предыдущих данных">
              <input type="checkbox" class="filled-in" disabled="disabled"/>
              <span class="collapsible-label">Добавить рабочих</span>
            </label>
          </div>
        </li>
      </ul>
    </div>

    <div class="card-action">
      <button type="submit" class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text">
        <i class="material-icons">arrow_forward</i> Войти
      </button>
    </div>
  </form>
</template>

<script>
import M from 'materialize-css'
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      email: 'admin@admin.com',
      password: 'admin2021best',
      localStorageClear: true,
      addCity: true,
      addWorkers: true,

      dataThisEmployee: [],

      sites: [],
      employees: [],
      workers: [],

      additionalSites: [
        { id: 1, cityName: 'Самара', employees: 0, edited: false },
        { id: 2, cityName: 'Казань', employees: 0, edited: false },
        { id: 3, cityName: 'Москва', employees: 0, edited: false },
        { id: 4, cityName: 'Ульяновск', employees: 0, edited: false },
        { id: 5, cityName: 'Набережные Челны', employees: 0, edited: false },
        { id: 6, cityName: 'Красноярск', employees: 0, edited: false },
        { id: 7, cityName: 'Оренбург', employees: 0, edited: false },
        { id: 8, cityName: 'Уфа', employees: 0, edited: false }
      ],

      additionalEmployees: [
        { id: 1, email: 'admin@admin.com', password: 'admin2021best', name: 'Иван', surname: 'Захаров', patronymic: 'Михайлович', sex: 'Мужской', homePhone: '', mobilePhone: '+7 (354) 010-01-11', city: 'Москва', duty: 'Системный администратор', access: 'admin', edited: false }
      ],

      additionalWorkers: [
        { id: 1, name: 'Артём', surname: 'Горбачев', patronymic: 'Михайлович', city: 'Ульяновск', accountNumber: 'test1', mobilePhone: '+7 (354) 823-12-55', nameCard: 'Артём', surnameCard: 'Горбачев', patronymicCard: 'Михайлович', accountNumberCard: '', bank: 'СберБанк', age: '41', birthday: '1980-06-21', sex: 'Мужской', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '2023-03-31', education: '', university: '', previousWork: '', reasonComing: '', professions: 'Электрик', nightShift: 'Нет', checkMVD: 'Да', dateInterview: '', uniform: '', fired: 'Нет', edited: false },
        { id: 2, name: 'Максим', surname: 'Королев', patronymic: 'Дмитриевич', city: 'Ульяновск', accountNumber: 'test2', mobilePhone: '+7 (275) 900-82-40', nameCard: 'Максим', surnameCard: 'Королев', patronymicCard: 'Дмитриевич', accountNumberCard: '', bank: 'СберБанк', age: '51', birthday: '1970-01-31', sex: 'Мужской', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '2022-01-31', education: '', university: '', previousWork: '', reasonComing: '', professions: 'Повар', nightShift: 'Нет', checkMVD: 'Да', dateInterview: '', uniform: '', fired: 'Нет', edited: false },
        { id: 3, name: 'Юрий', surname: 'Гаврилов', patronymic: 'Семёнович', city: 'Ульяновск', accountNumber: 'test3', mobilePhone: '+7 (792) 946-90-57', nameCard: 'Юрий', surnameCard: 'Гаврилов', patronymicCard: 'Семёнович', accountNumberCard: '', bank: 'Тинькофф Банк', age: '36', birthday: '1985-03-11', sex: 'Мужской', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '2021-03-31', education: '', university: '', previousWork: '', reasonComing: '', professions: 'Электрик', nightShift: 'Да', checkMVD: 'Да', dateInterview: '', uniform: '', fired: 'Нет', edited: false },
        { id: 4, name: 'Илья', surname: 'Белов', patronymic: 'Михайлович', city: 'Ульяновск', accountNumber: 'test4', mobilePhone: '+7 (354) 893-02-14', nameCard: 'Илья', surnameCard: 'Белов', patronymicCard: 'Михайлович', accountNumberCard: '', bank: 'СберБанк', age: '21', birthday: '2000-03-31', sex: 'Мужской', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '2027-03-31', education: '', university: '', previousWork: '', reasonComing: '', professions: 'Слесарь', nightShift: 'Нет', checkMVD: 'Да', dateInterview: '', uniform: '', fired: 'Нет', edited: false },
        { id: 5, name: 'Алиса', surname: 'Абрамова', patronymic: 'Макаровна', city: 'Ульяновск', accountNumber: 'test5', mobilePhone: '+7 (648) 129-15-01', nameCard: 'Алиса', surnameCard: 'Абрамова', patronymicCard: 'Макаровна', accountNumberCard: '', bank: 'СберБанк', age: '20', birthday: '2001-03-01', sex: 'Женский', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '', education: '', university: '', previousWork: '', reasonComing: '', professions: 'Программист', nightShift: 'Да', checkMVD: 'Нет', dateInterview: '', uniform: '', fired: 'Нет', edited: false },
        { id: 6, name: 'Максим', surname: 'Попов', patronymic: 'Сергеевич', city: 'Ульяновск', accountNumber: 'test6', mobilePhone: '+7 (354) 123-21-83', nameCard: 'Максим', surnameCard: 'Попов', patronymicCard: 'Сергеевич', accountNumberCard: '', bank: 'СберБанк', age: '22', birthday: '1999-06-01', sex: 'Мужской', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '2022-03-31', education: '', university: '', previousWork: '', reasonComing: '', professions: 'Кассир', nightShift: 'Нет', checkMVD: 'Да', dateInterview: '', uniform: '', fired: 'Нет', edited: false },
        { id: 7, name: 'Майя', surname: 'Дубровина', patronymic: 'Тимуровна', city: 'Самара', accountNumber: 'test7', mobilePhone: '+7 (981) 979-12-25', nameCard: 'Майя', surnameCard: 'Дубровина', patronymicCard: 'Тимуровна', accountNumberCard: '', bank: 'Альфа-Банк', age: '26', birthday: '1995-03-31', sex: 'Женский', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '2028-05-31', education: '', university: '', previousWork: '', reasonComing: '', professions: 'Кассир', nightShift: 'Нет', checkMVD: 'Да', dateInterview: '', uniform: '', fired: 'Нет', edited: false },
        { id: 8, name: 'Степан', surname: 'Азинов', patronymic: 'Михайлович', city: 'Самара', accountNumber: 'test8', mobilePhone: '+7 (986) 979-61-33', nameCard: 'Степан', surnameCard: 'Азинов', patronymicCard: 'Михайлович', accountNumberCard: '', bank: 'Альфа-Банк', age: '28', birthday: '1993-07-01', sex: 'Мужской', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '2029-01-31', education: '', university: '', previousWork: '', reasonComing: '', professions: 'Монтажник', nightShift: 'Нет', checkMVD: 'Да', dateInterview: '', uniform: '', fired: 'Нет', edited: false },
        { id: 9, name: 'Ольга', surname: 'Любровина', patronymic: 'Тимуровна', city: 'Казань', accountNumber: 'test9', mobilePhone: '+7 (980) 970-60-81', nameCard: 'Ольга', surnameCard: 'Любровина', patronymicCard: 'Тимуровна', accountNumberCard: '', bank: 'СберБанк', age: '23', birthday: '1988-12-02', sex: 'Женский', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '2021-03-31', education: '', university: '', previousWork: '', reasonComing: '', professions: 'Слесарь', nightShift: 'Нет', checkMVD: 'Да', dateInterview: '', uniform: '', fired: 'Нет', edited: false },
        { id: 10, name: 'Олег', surname: 'Вишневский', patronymic: 'Арсенович', city: 'Москва', accountNumber: 'test10', mobilePhone: '+7 (995) 975-61-82', nameCard: 'Олег', surnameCard: 'Вишневский', patronymicCard: 'Арсенович', accountNumberCard: '', bank: 'Тинькофф Банк', age: '31', birthday: '1990-03-09', sex: 'Мужской', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '2023-01-01', education: '', university: '', previousWork: '', reasonComing: '', professions: 'Кассир', nightShift: 'Да', checkMVD: 'Да', dateInterview: '', uniform: '', fired: 'Да', edited: false }
      ]
    }
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    localStorageRemove () {
      if (this.localStorageClear) {
        localStorage.clear()
      }
    },

    saveCollection (collection, collectionName) {
      const parsed = JSON.stringify(collection)
      localStorage.setItem(collectionName, parsed)
    },

    addElements (status, collection, collectionName) {
      if (status) {
        this.saveCollection(collection, collectionName)
      }
    },

    authEmployee () {
      for (const employee of this.employees) {
        if (this.email === employee.email && this.password === employee.password) {
          this.addElements(true, employee, 'dataThisEmployee')
          M.toast({ html: `Добро пожаловать, ${employee.surname} ${employee.name}!` })

          return true
        }
      }

      return false
    },

    submitLogin () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.localStorageClear) {
        this.localStorageRemove()
        console.groupCollapsed('Добавление единиц 📃')
        console.log('Прошлые записи удалены 🗑')

        this.addElements(true, this.additionalEmployees, 'employees')
        console.log('Сотрудники добавлены 🧍')

        if (localStorage.getItem('employees')) {
          try {
            this.employees = JSON.parse(localStorage.getItem('employees'))
          } catch (e) {
            localStorage.removeItem('employees')
          }
        }

        if (this.addCity) {
          this.addElements(this.addCity, this.additionalSites, 'sites')
          console.log('Города добавлены 🏙')
        }

        if (this.addWorkers) {
          this.addElements(this.addWorkers, this.additionalWorkers, 'workers')
          console.log('Рабочие добавлены 👷')
        }

        console.log('Новые единицы добавлены 😉')
        console.groupEnd()
      }

      if (this.authEmployee()) {
        this.$router.push('/workers')
      } else {
        M.toast({ html: 'Ошибка входа!' })
        console.log('Попытка входа ⚠')
      }
    }
  },
  mounted () {
    const collapsible = document.querySelectorAll('.collapsible')
    collapsible.forEach((element) => {
      M.Collapsible.init(element)
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

    if (localStorage.getItem('workers')) {
      try {
        this.workers = JSON.parse(localStorage.getItem('workers'))
      } catch (e) {
        localStorage.removeItem('workers')
      }
    }

    if (localStorage.getItem('dataThisEmployee')) {
      try {
        this.dataThisEmployee = JSON.parse(localStorage.getItem('dataThisEmployee'))
      } catch (e) {
        localStorage.removeItem('dataThisEmployee')
      }
    }

    if (this.dataThisEmployee.length !== 0) {
      this.localStorageClear = false
    } else {
      console.log('Первый вход 🔛')
    }
  }
}
</script>

<style>
.auth-card {
  width: 500px;
}

.collapsible-label {
  color: black !important;
}
</style>
