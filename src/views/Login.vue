<template>
  <form class="card auth-card" @submit.prevent="submitLogin">
    <div class="card-content">
      <h4 class="card-title">Вход в систему</h4>

      <div class="margin-fix">
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
                <input type="checkbox" class="filled-in" v-model="clearOldData"/>
                <span class="collapsible-label black-text">Удалить предыдущие данные</span>
              </label>
              <br>

              <label v-show="clearOldData">
                <input type="checkbox" class="filled-in" v-model="addNewData"/>
                <span class="collapsible-label black-text">Добавить города, сотрудников и рабочих</span>
              </label>
              <br>
            </div>
          </li>
        </ul>
      </div>
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Login',

  data () {
    return {
      email: 'admin@admin.com',
      password: 'admin2021best',

      clearOldData: true,
      addNewData: true
    }
  },

  computed: {
    ...mapGetters([
      'additionalWorkers',
      'additionalEmployees',
      'additionalSites',

      'sites',
      'employees',
      'workers',
      'dataThisEmployee'
    ])
  },

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) }
  },

  methods: {
    ...mapMutations([
      'SET_SITES',
      'SET_EMPLOYEES',
      'SET_WORKERS',
      'SET_DATA_AUTH'
    ]),

    updateAllCollection () {
      this.SET_SITES()
      this.SET_EMPLOYEES()
      this.SET_WORKERS()
      this.SET_DATA_AUTH()
    },

    authEmployee () {
      for (const employee of this.employees) {
        if (this.email === employee.email && this.password === employee.password) {
          this.SET_DATA_AUTH(employee)
          M.toast({ html: `Добро пожаловать, ${employee.surname} ${employee.name}!` })

          return true
        }
      }

      return false
    },

    addNewElement (predicate) {
      if (predicate) {
        localStorage.clear()

        console.groupCollapsed('Добавление единиц 📃')
        console.log('Прошлые записи удалены 🗑')

        this.SET_EMPLOYEES(this.additionalEmployees)
        console.log('Сотрудники добавлены 🧍')

        if (this.addNewData) {
          this.SET_SITES(this.additionalSites)
          this.SET_WORKERS(this.additionalWorkers)

          console.log('Новые единицы добавлены 😉')
        }

        console.groupEnd()
      }
    },

    async submitLogin () {
      // For validations
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.addNewElement(this.clearOldData)

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)

        if (this.authEmployee()) {
          await this.$router.push('/workers')
        } else {
          M.toast({ html: 'Ошибка входа!' })
          console.log('Попытка входа ⚠')
        }
      } catch (e) {

      }
    }
  },

  mounted () {
    const collapsible = document.querySelectorAll('.collapsible')
    collapsible.forEach((element) => {
      M.Collapsible.init(element)
    })

    this.updateAllCollection()

    try {
      if (this.dataThisEmployee.length === 0) {
        console.log('Первый вход 🔛')
      } else {
        this.clearOldData = false
      }
    } catch (e) {}
  }
}
</script>

<style>
#app .auth-card {
  width: 30rem;
}
</style>
