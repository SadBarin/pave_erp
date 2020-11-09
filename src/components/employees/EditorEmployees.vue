<template>
  <div>
    <div class="page-title">
      <h3>Редактор сотрудника</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12 m6">
          <div>
            <form>
              <div class="input-field input-field-blue">
                <input type="text" id="email">
                <label for="email">Почта</label>
              </div>

              <div class="input-field">
                <input type="password" id="password">
                <label for="password">Пароль</label>
              </div>

              <div class="input-field">
                <select class="select">
                  <option value="1">Самара</option>
                  <option value="2">Казань</option>
                  <option value="3">Москва</option>
                  <option value="4">Ульяновск</option>
                  <option value="5">Набережные Челны</option>
                  <option value="6">Красноярск</option>
                  <option value="7">Оренбург</option>
                </select>
                <label>Город</label>
              </div>

              <div class="input-field">
                <select class="select">
                  <option value="1">Сотрудник</option>
                  <option value="2">Админ</option>
                </select>
                <label>Доступ</label>
              </div>

              <div class="input-field">
                <select class="select">
                  <option value="1">Красный</option>
                  <option value="2">Зелёный</option>
                  <option value="3">Синий</option>
                  <option value="4">Розовый</option>
                  <option value="5">Фиолетовый</option>
                  <option value="6">Жёлтый</option>
                  <option value="7">Оранжевый</option>
                </select>
                <label>Цвет Карточки</label>
              </div>

              <div class="button-container">
                <button type="submit"
                        class="btn waves-effect waves-light auth-submit blue darken-1"
                >
                  Редактировать
                </button>

                <router-link type="submit"
                             class="btn waves-effect waves-light auth-submit blue darken-1" to="/employees"
                >
                  Вернуться назад
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

export default {
  name: 'addEmployees.vue',
  mounted () {
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })
  }
}
</script>

<style scoped>
</style>
