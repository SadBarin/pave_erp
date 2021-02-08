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
      password: 'admin2021best'
    }
  },

  computed: {
    ...mapGetters([
      'sites',
      'employees',
      'workers'
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
      'SET_WORKERS'
    ]),

    async submitLogin () {
      // For validations
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        await this.$router.push('/workers')
      } catch (e) {
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
  }
}
</script>

<style>
#app .auth-card {
  width: 30rem;
}
</style>
