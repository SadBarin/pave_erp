<template>
  <form @submit.prevent="submitEmployee" class="button-container" >
    <div class="input-field input-field-blue">
      <input
        class="input-add"
        id="email"
        type="text"
        v-model.trim="email"
        :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
      >
      <label for="email">Почта</label>
      <small
        class="helper-text invalid"
        v-if="$v.email.$dirty && !$v.email.required"
      >Введите email сотрудника</small>
      <small
        class="helper-text invalid"
        v-else-if="$v.email.$dirty && !$v.email.email"
      >Введите правильно email
      </small>
    </div>

    <button class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" type="submit">
      <i class="material-icons">add</i> Добавить сотрудника
    </button>
  </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'AddCardEmployees',
  data () {
    return {
      email: ''
    }
  },
  validations: {
    email: { email, required }
  },
  methods: {
    submitEmployee () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.email.trim()) {
        const newEmployee = {
          id: Date.now(),
          email: this.email,
          password: '',
          name: 'Новый',
          surname: 'Сотрудник',
          patronymic: '',
          homePhone: '',
          mobilePhone: '',
          city: 'Отсутствует',
          duty: '',
          access: false,
          edited: false
        }

        this.$emit('add-employee', newEmployee)
        this.email = ''
      }
    }
  }
}
</script>

<style scoped>
.button-container .input-field {
  margin-right: 30px;
}
</style>
