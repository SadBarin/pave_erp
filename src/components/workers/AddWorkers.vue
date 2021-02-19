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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AddCardSWorkers',
  data () {
    return {
      number: '',
      coincidence: false
    }
  },
  computed: {
    ...mapGetters([
      'employees',
      'authEmployee'
    ])
  },
  props: ['workers'],
  directives: { mask },
  validations: {
    number: { required, minLength: minLength(7) }
  },
  methods: {
    ...mapMutations([
      'SET_EMPLOYEES_FROM_LOCAL_STORAGE'
    ]),

    createWorker () {
      if (this.number.trim() && !this.coincidence) {
        // Body New Worker
        const newWorker = {
          id: Date.now(),
          name: 'Новый',
          surname: 'Рабочий ',
          patronymic: '',
          accountNumber: Date.now(),
          nameCard: 'Новый',
          surnameCard: 'Рабочий',
          patronymicCard: '',
          accountNumberCard: '',
          bank: 'СберБанк',
          age: '',
          sex: 'Мужской',
          city: this.authEmployee.city,
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
          editedCount: 0,
          history: [{
            date: `[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}]`,
            info: 'Работник создан сотрудником ',
            employee: {
              name: `${this.authEmployee.surname} ${this.authEmployee.name}`,
              id: this.authEmployee.id
            }
          }],
          calendar: [{}]
        }

        this.$emit('add-worker', newWorker)
        this.number = ''

        // this.$router.push(`/workers/edit/worker${newWorker.id}`)
      }
    },

    submitWorkers () {
      // For validations
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.createWorker()
    }
  },
  mounted () {
    this.SET_EMPLOYEES_FROM_LOCAL_STORAGE()
  }
}
</script>
