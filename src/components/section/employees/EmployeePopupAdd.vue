<template>
  <PopupAddWrapper
    :hidden="popupHidden"
    header="Добавление сотрудника"
    @popup-close="$emit('popupToggle')"
    @popup-add="createEmployee()"
  >
    <template #popup-add-content>
      <AppLineText
        inputID="input-email"
        label="Почта: "
        maxLength="20"
        v-model="email"
      />
    </template>
  </PopupAddWrapper>
</template>

<script>
import PopupAddWrapper from '@/components/popups/PopupAddWrapper'
import AppLineText from '@/components/AppLineText'
import { mapGetters } from 'vuex'

export default {
  name: 'EmployeePopupAdd',

  components: {
    PopupAddWrapper,
    AppLineText
  },

  props: {
    popupHidden: Boolean,
    employees: Object
  },

  data () {
    return {
      email: '',
      firstNote: 'Сотрудник был создан'
    }
  },

  computed: {
    ...mapGetters([
      'authEmployee'
    ])
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

    createEmployee () {
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
        city: '',
        duty: 'Сотрудник',
        access: 'employee',
        settings: {
          autoUpdate: 5000
        },
        history: [{
          date: `[Дата: ${new Date().toLocaleDateString()} Время: ${new Date().toLocaleTimeString()}]`,
          info: 'Сотрудник создан '
        }]
      }

      this.$emit('addEmployee', newEmployee)

      this.email = ''
    }
  }
}
</script>
