<template>
  <form class="card auth-card" @submit.prevent="submitLogin">
    <div class="card-content">
      <span class="card-title">Вход в систему</span>

      <div class="input-field input-field-blue">
        <input
               id="email"
               type="text"
               v-model.trim="email"
               :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Почта</label>
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

      <div class="input-field" id="input-field-blue">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
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
    </div>

    <div class="card-action">
      <button type="submit" class="btn waves-effect waves-light auth-submit blue darken-1">
        <i class="material-icons">arrow_forward</i> Войти
      </button>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
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

      this.$router.push('/sites')
    }
  }
}
</script>

<style scoped>

</style>
