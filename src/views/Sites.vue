<template>
  <div>
    <div class="page-title">
      <h3>Настройка города</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Добавить город</h4>
            </div>

            <form>
              <div class="input-field">
                <input type="text" id="city">
                <label for="city">Город</label>
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

              <button type="submit"
                      class="btn waves-effect waves-light auth-submit blue darken-1"
              >
                Добавить город
              </button>
            </form>
          </div>
        </div>

        <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Удалить город</h4>
            </div>

            <form>
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

              <button type="submit"
                      class="btn waves-effect waves-light auth-submit red darken-1"
              >
                Удалить
              </button>
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
  name: 'Sites',
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
