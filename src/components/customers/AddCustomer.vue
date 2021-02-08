<template>
  <form @submit.prevent="submitCustomer" class="flex-center" >
    <div class="input-field margin-fix right-margin-little">
      <input
        class="input-add"
        type="tel"
        id="customer"
        v-model.trim="number"
        v-mask="'+7 (###) ###-##-##'"
        placeholder="Номер нового клиента"
        :class="{invalid: ($v.number.$dirty && !$v.number.required) || ($v.number.$dirty && !$v.number.minLength)}"
      >
      <small
        class="helper-text invalid"
        v-if="$v.number.$dirty && !$v.number.required"
      >
        Введите номер клиента
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

    <button class="btn-transparent transparent btn-page-title blue-text text-darken-1" title="Добавить нового клиента" type="submit">
      <i class="material-icons big-material-icons">add</i>
    </button>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'

export default {
  name: 'AddCustomer',
  data () {
    return {
      number: '',
      coincidence: false
    }
  },
  props: ['customers'],
  directives: { mask },
  validations: {
    number: { required, minLength: minLength(7) }
  },
  methods: {
    createCustomer () {
      if (this.number.trim() && !this.coincidence) {
        // Body New Customer
        const newCustomer = {
          id: Date.now(),
          name: 'Новый Клиент',
          contractNumber: '',
          contractDate: '',
          number: this.number,
          fax: '',
          site: '',
          email: '',
          address: '',
          note: 'Новый клиент',
          manager: '',
          status: 'Действующий'
        }

        console.log('E3')

        this.$emit('add-customer', newCustomer)
        this.number = ''

        // this.$router.push(`/customers/edit/customers${newCustomer.id}`)
      }
    },

    submitCustomer () {
      console.log('E1')
      // For validations
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      console.log('E2')

      this.createCustomer()
    }
  },
  mounted () {
  }
}
</script>
