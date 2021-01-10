<template>
  <form @submit.prevent="submitWorkers" class="btn-container" >
    <div class="input-field input-field-blue">
      <input
        class="input-add"
        type="tel"
        id="worker"
        v-model.trim="number"
        v-mask="'+7 (###) ###-##-##'"
        placeholder="+7 ( ) "
        :class="{invalid: ($v.number.$dirty && !$v.number.required) || ($v.number.$dirty && !$v.number.minLength)}"
      >
      <label class="active" for="worker">Номер рабочего</label>
      <small
        class="helper-text invalid"
        v-if="$v.number.$dirty && !$v.number.required"
      >
        Введите номер рабочего
      </small>
      <small
        class="helper-text invalid"
        v-else-if="$v.number.$dirty && !$v.number.minLength"
      >
        Номер должен содержать не менее {{$v.number.$params.minLength.min}} символов.
      </small>
      <small
        class="helper-text invalid"
        v-else-if="coincidence"
      >
        Номер уже есть
      </small>
    </div>

    <button class="btn-floating btn-title blue darken-1 waves-effect waves-circle waves-light" title="Добавить рабочего" type="submit">
      <i class="material-icons">add</i>
    </button>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'

export default {
  name: 'AddCardSWorkers',
  data () {
    return {
      number: '',
      coincidence: false,
      workers: [{}]
    }
  },
  directives: { mask },
  validations: {
    number: { required, minLength: minLength(7) }
  },
  methods: {
    submitWorkers () {
      if (localStorage.getItem('workers')) {
        try {
          this.workers = JSON.parse(localStorage.getItem('workers'))
        } catch (e) {
          localStorage.removeItem('workers')
        }
      }

      console.log(this.number)

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      for (const worker of this.workers) {
        if (worker.mobilePhone === undefined) continue
        if (worker.mobilePhone.toString().toLowerCase() === this.number.toString().toLowerCase()) {
          this.coincidence = true
          break
        } else {
          this.coincidence = false
        }
      }

      if (this.number.trim() && !this.coincidence) {
        const newWorker = {
          id: Date.now(),
          name: 'Новый',
          surname: 'Рабочий',
          patronymic: '',
          accountNumber: '',
          nameCard: '',
          surnameCard: '',
          patronymicCard: '',
          accountNumberCard: '',
          bank: '',
          age: '',
          sex: '',
          city: 'Отсутствует',
          nationality: '',
          passportID: '',
          passportDate: '',
          passportIssued: '',
          registration: '',
          address: '',
          homePhone: '',
          mobilePhone: this.number,
          medicalBook: '',
          education: '',
          university: '',
          previousWork: '',
          reasonComing: '',
          professions: '',
          nightShift: '',
          checkMVD: '',
          dateInterview: '',
          uniform: '',
          fired: '',
          edited: false
        }

        this.$emit('add-worker', newWorker)
        this.number = ''
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
