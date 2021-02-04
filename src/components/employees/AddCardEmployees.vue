<template>
  <form @submit.prevent="submitEmployee" class="flex-center" >
    <div class="input-field margin-fix right-margin-little">
      <input
        class="input-add"
        id="email"
        type="text"
        placeholder="Почта нового рабочего"
        v-model.trim="email"
        :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
      >
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

    <button class="btn-transparent transparent btn-page-title blue-text text-darken-1" title="Добавить нового сотрудника" type="submit">
      <i class="material-icons big-material-icons">add</i>
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
      coincidence: false
    }
  },
  props: ['employees'],
  validations: {
    email: { email, required }
  },
  methods: {
    getPassword () {
      let password = ''
      const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()@_+='

      for (let i = 0; i < 10; i++) {
        password += symbols.charAt(Math.floor(Math.random() * symbols.length))
      }

      return password
    },

    searchSimilar () {
      for (const employee of this.employees) {
        if (employee.email === undefined) continue
        if (employee.email.toString().toLowerCase() === this.email.toString().toLowerCase()) {
          this.coincidence = true
          break
        } else {
          this.coincidence = false
        }
      }
    },

    createNewEmployee () {
      if (this.email.trim() && !this.coincidence) {
        // Body New Employee
        const newEmployee = {
          id: Date.now(),
          email: this.email,
          password: this.getPassword(),
          name: 'Сотрудник',
          surname: 'Новый',
          patronymic: '',
          sex: 'Мужской',
          homePhone: '',
          mobilePhone: '',
          city: this.dataThisEmployee.city,
          duty: 'Сотрудник',
          access: 'employee',
          edited: false
        }

        this.$emit('add-employee', newEmployee)
        this.email = ''

        this.$router.push(`/employees/edit/employee${newEmployee.id}`)
      }
    },

    submitEmployee () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.searchSimilar()
      this.createNewEmployee()
    }
  },
  mounted () {
    if (localStorage.getItem('dataThisEmployee')) {
      try {
        this.dataThisEmployee = JSON.parse(localStorage.getItem('dataThisEmployee'))
      } catch (e) {
        localStorage.removeItem('dataThisEmployee')
      }
    }
  }
}
</script>
