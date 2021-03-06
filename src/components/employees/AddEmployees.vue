<template>
  <form @submit.prevent="submitEmployee" class="flex-center" >
    <div class="input-field margin-fix right-margin-little">
      <input
        class="input-add"
        id="email"
        type="text"
        maxlength="35"
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddCardEmployees',
  data () {
    return {
      email: '',
      coincidence: false
    }
  },
  props: { employees: Object },
  computed: {
    ...mapGetters([
      'authEmployee'
    ])
  },
  validations: {
    email: { email, required }
  },
  methods: {
    ...mapActions([
      'registerEmployees'
    ]),

    getPassword () {
      let password = ''
      const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()@_+='

      for (let i = 0; i < 10; i++) {
        password += symbols.charAt(Math.floor(Math.random() * symbols.length))
      }

      return password
    },

    // searchSimilar () {
    //   for (const employee of this.employees) {
    //     if (employee.email === undefined) continue
    //     if (employee.email.toString().toLowerCase() === this.email.toString().toLowerCase()) {
    //       this.coincidence = true
    //       break
    //     } else {
    //       this.coincidence = false
    //     }
    //   }
    // },

    async createEmployee () {
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
          city: this.authEmployee.city,
          duty: 'Сотрудник',
          access: 'employee',
          settings: {
            autoUpdate: 5000
          },
          history: [{
            date: `[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}]`,
            info: 'Сотрудник создан сотрудником ',
            employee: {
              name: `${this.authEmployee.surname} ${this.authEmployee.name}`,
              id: this.authEmployee.id
            }
          }]
        }

        this.$emit('add-employee', newEmployee)

        this.email = ''
      }
    },

    submitEmployee () {
      // For validations
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.createEmployee()
    }
  }
}
</script>
