<template>
  <form @submit.prevent="submitEmployee" class="button-container" >
    <div class="input-field input-field-blue">
      <input type="text"
             id="name"
             v-model.trim="name"
             :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}">
      <label for="name">Имя</label>
      <small
        class="helper-text invalid"
        v-if="$v.name.$dirty && !$v.name.required"
      >
        Введите имя
      </small>
      <small
        class="helper-text invalid"
        v-else-if="$v.name.$dirty && !$v.name.minLength"
      >
        Имя должно содержать не менее {{$v.name.$params.minLength.min}} символов.
      </small>
    </div>

    <button class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" type="submit">Добавить сотрудника</button>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AddCardEmployees',
  data () {
    return {
      name: ''
    }
  },
  validations: {
    name: { required, minLength: minLength(2) }
  },
  methods: {
    submitEmployee () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.name.trim()) {
        const newEmployee = {
          id: Date.now(),
          name: this.name,
          city: 'Москва'
        }

        this.$emit('add-employee', newEmployee)
        this.name = ''
      }
    }
  }
}
</script>

<style scoped>
.button-container {
  display: flex;
  align-items: center;
}

.button-container .input-field {
  margin-right: 30px;
}
</style>
