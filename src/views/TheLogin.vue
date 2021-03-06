<template>
<div>
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
      <button v-if="!loading" type="submit" class="btn-flat btn-hover blue darken-1 white-text">
        <i class="material-icons">arrow_forward</i> Войти
      </button>

      <div v-else class="btn-flat btn-loading darken-1 white-text">
        Входим... <div class="ripple"><div></div><div></div></div>
      </div>
    </div>
  </form>

  <p class="version">Версия: {{version}}</p>
</div>
</template>

<script>
import M from 'materialize-css'
import { email, required, minLength } from 'vuelidate/lib/validators'
import { mapGetters, mapMutations } from 'vuex'
import packageApp from '../../package.json'

export default {
  name: 'Login',

  data () {
    return {
      email: 'root@root.com',
      password: 'bb%LWz%*W3',
      loading: false,

      version: packageApp.version
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
      this.loading = true

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
        await this.$store.dispatch('login', formData).then(() => {
          setTimeout(() => { this.$router.push('/workers') }, 1000)
        })
      } catch (e) {
        this.loading = false
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

.auth-card {
  background: hsla(0, 0%, 100%, 0.7);
}

.auth-card .card-action {
  background: transparent;
}

#app .version {
  font-size: 1rem;
  opacity: 0.7;

  margin: 0;

  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
</style>
