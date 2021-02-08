<template>
  <form @submit.prevent="submitWorkers" class="flex-center" >
    <div class="input-field margin-fix right-margin-little">
      <input
        class="input-add"
        type="tel"
        id="worker"
        v-model.trim="number"
        v-mask="'+7 (###) ###-##-##'"
        placeholder="Номер нового рабочего"
        :class="{invalid: ($v.number.$dirty && !$v.number.required) || ($v.number.$dirty && !$v.number.minLength)}"
      >
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

    <button class="btn-transparent transparent btn-page-title blue-text text-darken-1" title="Добавить нового рабочего" type="submit">
      <i class="material-icons big-material-icons">add</i>
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
          accountNumber: Date.now(),
          nameCard: 'Новый',
          surnameCard: 'Рабочий',
          patronymicCard: '',
          accountNumberCard: '',
          bank: 'СберБанк',
          age: '',
          sex: 'Мужской',
          city: this.dataThisEmployee.city,
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
          nightShift: 'Нет',
          checkMVD: 'Да',
          dateInterview: '',
          uniform: '',
          fired: 'Нет',
          edited: false,
          editedCount: 0
        }

        this.$emit('add-worker', newWorker)
        this.number = ''

        this.$router.push(`/workers/edit/worker${newWorker.id}`)
      }
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
