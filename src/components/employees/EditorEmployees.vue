<template>
  <div>
    <div class="page-title">
      <h3>Редактор сотрудника</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form @submit.prevent="validateEmployees">
             <div class="form-content">
               <div class="input-field input-field-blue">
                 <input
                   id="email"
                   type="text"
                   v-model.trim="email"
                   :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                 >
                 <label for="email">Почта</label>
                 <small
                   class="helper-text invalid"
                   v-if="$v.email.$dirty && !$v.email.required"
                 >Введите ваш email</small>
                 <small
                   class="helper-text invalid"
                   v-else-if="$v.email.$dirty && !$v.email.email"
                 >Введите правильно email
                 </small>
               </div>

               <div class="input-field" id="input-field-blue">
                 <input
                   id="password"
                   type="password"
                   v-model.trim="password"
                   :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                 >
                 <label for="password">Пароль</label>
                 <small
                   class="helper-text invalid"
                   v-if="$v.password.$dirty && !$v.password.required"
                 >
                   Введите ваш пароль
                 </small>
                 <small
                   class="helper-text invalid"
                   v-else-if="$v.password.$dirty && !$v.password.minLength"
                 >
                   Пароль должен содержать не менее {{$v.password.$params.minLength.min}} символов.
                 </small>
               </div>

               <div class="input-field input-field-blue">
                 <input type="text" id="name">
                 <label for="name">Имя</label>
               </div>

               <div class="input-field input-field-blue">
                 <input type="text" id="surname">
                 <label for="surname">Фамилия</label>
               </div>

               <div class="input-field input-field-blue">
                 <input type="text" id="patronymic">
                 <label for="patronymic">Отчество</label>
               </div>

               <div class="input-field input-field-blue">
                 <input type="tel" id="homePhone">
                 <label for="homePhone">Телефон Домашний</label>
               </div>

               <div class="input-field input-field-blue">
                 <input type="tel" id="mobilePhone">
                 <label for="mobilePhone">Телефон Мобильный</label>
               </div>

               <div class="input-field">
                 <select class="select">
                   <option value="1">Минск</option>
                 </select>
                 <label>Город</label>
               </div>

               <div class="input-field input-field-blue">
                 <input type="text" id="duty">
                 <label for="duty">Должность</label>
               </div>

               <div class="input-field">
                 <select class="select">
                   <option value="1">Сотрудник</option>
                   <option value="2">Админ</option>
                 </select>
                 <label>Доступ</label>
               </div>
             </div>

              <div class="button-container">
                <button type="submit"
                        class="btn waves-effect waves-light auth-submit blue darken-1"
                >
                  <i class="material-icons">create</i> Редактировать
                </button>

                <router-link class="btn waves-effect waves-light auth-submit blue darken-1" to="/employees"
                >
                  <i class="material-icons">arrow_back</i> Вернуться назад
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import M from 'materialize-css'
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'addEmployees.vue',
  mounted () {
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })
  },
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) }
  },
  methods: {
    validateEmployees () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
    }
  }
}
</script>

<style scoped>
  .row .col {
    padding: 0;
  }

  .btn {
    margin-right: 10px;
  }

  form {
    width: 100%;
  }

  .form-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .input-field {
    width: 48%;
  }
</style>
