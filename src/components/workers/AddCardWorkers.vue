<template>
  <form @submit.prevent="submitWorkers" class="button-container" >
    <div class="input-field input-field-blue">
      <input
        class="input-add"
        type="text"
        id="worker"
        v-model.trim="number"
        :class="{invalid: ($v.number.$dirty && !$v.number.required) || ($v.number.$dirty && !$v.number.numeric) || ($v.number.$dirty && !$v.number.minLength)}"
      >
      <label for="worker">Номер рабочего</label>
      <small
        class="helper-text invalid"
        v-if="$v.number.$dirty && !$v.number.numeric || $v.number.$dirty && !$v.number.required"
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

    <button class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" type="submit">
      <i class="material-icons">add</i> Добавить рабочего
    </button>
  </form>
</template>

<script>
import { required, numeric, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AddCardSWorkers',
  data () {
    return {
      number: '',
      coincidence: false,
      workers: [{}]
    }
  },
  validations: {
    number: { required, numeric, minLength: minLength(7) }
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
          number: Date.now(),
          nameCard: '',
          surnameCard: '',
          patronymicCard: '',
          accountNumberCard: '',
          bank: '',
          birthday: '',
          sex: '',
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
.button-container .btn-flat {
  margin-left: 30px;
}
</style>
