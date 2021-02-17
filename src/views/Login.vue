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
      <button v-if="!loading" type="submit" class="btn-flat btn-hover blue darken-1 white-text">
        <i class="material-icons">arrow_forward</i> Войти
      </button>

      <div v-else class="btn-flat waves-effect waves-light auth-submit grey darken-1 white-text">
        Входим... <div class="lds-ripple"><div></div><div></div></div>
      </div>
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
      loading: false
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

.flip-enter-active {
  animation: fade-in .5s;
}
.flip-leave-active {
  animation: fade-in .5s reverse;
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 32px;
  height: 32px;
  margin-left: 1rem;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 16px;
    left: 16px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 32px;
    height: 32px;
    opacity: 0;
  }
}

.auth-card {
  background: hsla(0, 0%, 100%, 0.7);
}

.auth-card .card-action {
  background: transparent;
}
</style>
