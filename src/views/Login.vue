<template>
  <form class="card auth-card" @submit.prevent="submitLogin">
    <div class="card-content">
      <span class="card-title">Вход в систему</span>

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
          Пароль должен содержать не менее {{$v.password.$params.minLength.min}} символов.
        </small>
      </div>

      <ul class="collapsible black-text form-content">
        <li class="white-text">
          <div class="collapsible-header blue darken-1"><i class="material-icons">clear_all</i>Дополнительные функции входа</div>
          <div class="collapsible-body white black-text">
            <label>
              <input type="checkbox" class="filled-in" v-model="localStorageClear"/>
              <span class="collapsible-label">Удалить LocalStorage?</span>
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
      password: 'admin2020',
      localStorageClear: false
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) }
  },
  methods: {
    submitLogin () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.localStorageRemove()

      this.$router.push('/sites')

      M.toast({ html: 'Вы вошли в систему' })
    },

    localStorageRemove () {
      if (this.localStorageClear) {
        localStorage.clear()
      }
    }
  },
  mounted () {
    const collapsible = document.querySelectorAll('.collapsible')
    collapsible.forEach((element) => {
      M.Collapsible.init(element)
    })
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
