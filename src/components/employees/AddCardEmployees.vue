<template>
  <form @submit.prevent="submitEmployee" class="btn-container" >
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
      <small
        class="helper-text invalid"
        v-else-if="coincidence"
      >
        Email уже есть
      </small>
    </div>

    <button class="btn-floating btn-title blue darken-1 waves-effect waves-circle waves-light" type="submit">
      <i class="material-icons">add</i>
    </button>
  </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'AddCardEmployees',
  data () {
    return {
      email: '',
      coincidence: false,
      employees: [{}]
    }
  },
  validations: {
    email: { email, required }
  },
  methods: {
    submitEmployee () {
      if (localStorage.getItem('employees')) {
        try {
          this.employees = JSON.parse(localStorage.getItem('employees'))
        } catch (e) {
          localStorage.removeItem('employees')
        }
      }

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      for (const employee of this.employees) {
        if (employee.email === undefined) continue
        if (employee.email.toString().toLowerCase() === this.email.toString().toLowerCase()) {
          this.coincidence = true
          break
        } else {
          this.coincidence = false
        }
      }

      if (this.email.trim() && !this.coincidence) {
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
.btn-container .btn-floating {
  margin-left: 2rem;
}
</style>
