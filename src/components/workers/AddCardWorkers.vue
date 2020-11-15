<template>
  <form @submit.prevent="submitWorkers" class="button-container" >
    <div class="input-field input-field-blue">
      <input type="text"
             id="worker"
             v-model.trim="name"
             :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
      >
      <label for="worker">Рабочий</label>
      <small
        class="helper-text invalid"
        v-if="$v.name.$dirty && !$v.name.required"
      >
        Введите рабочего
      </small>
      <small
        class="helper-text invalid"
        v-else-if="$v.name.$dirty && !$v.name.minLength"
      >
        Имя рабочего должно содержать не менее {{$v.name.$params.minLength.min}} символов.
      </small>
    </div>

    <button class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" type="submit">
      <i class="material-icons">add</i> Добавить рабочего
    </button>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AddCardSWorkers',
  data () {
    return {
      name: ''
    }
  },
  validations: {
    name: { required, minLength: minLength(2) }
  },
  methods: {
    submitWorkers () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.name.trim()) {
        const newWorker = {
          id: Date.now(),
          name: this.name,
          edited: false
        }

        this.$emit('add-worker', newWorker)
        this.name = ''
      }
    }
  }
}
</script>

<style scoped>
.button-container .btn-flat {
  margin-left: 30px;
}
</style>
