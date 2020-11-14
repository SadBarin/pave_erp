<template>
  <div>
    <div class="page-title">
      <h3>Редактор рабочего</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form>
              <div class="form-content">
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
                  <input type="text" id="accountNumber">
                  <label for="accountNumber">Учётный номер</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="number">
                  <label for="number">Номер</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="nameCard">
                  <label for="nameCard">Имя Держателя Карты</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="surnameCard">
                  <label for="surnameCard">Фамилия Держателя Карты</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="patronymicCard">
                  <label for="patronymicCard">Отчество Держателя Карты</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="accountNumberCard">
                  <label for="accountNumberCard">Номер Счёта</label>
                </div>

                <div class="input-field">
                  <select class="select">
                    <option value="1">СберБанк</option>
                    <option value="2">Банк ВТБ</option>
                    <option value="3">Газпромбанк</option>
                    <option value="4">Национальный Клиринговый Центр</option>
                    <option value="5">Альфа-Банк</option>
                    <option value="6">Россельхозбанк</option>
                    <option value="7">Московский Кредитный Банк</option>
                    <option value="8">Банк «Открытие»</option>
                    <option value="9">Совкомбанк</option>
                    <option value="10">Росбанк</option>
                    <option value="11">Тинькофф Банк</option>
                  </select>
                  <label>Банк</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" class="datepicker" id="birthday">
                  <label for="birthday">Дата Рождения</label>
                </div>

                <div class="input-field">
                  <select class="select">
                    <option value="1">Мужской</option>
                    <option value="2">Женский</option>
                  </select>
                  <label>Биологический Пол</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="nationality">
                  <label for="nationality">Национальность</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="number" id="PassportID">
                  <label for="PassportID">Номер Паспорта</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" class="datepicker" id="passportDate">
                  <label for="passportDate">Дата Выдачи Паспорта</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="passportIssued">
                  <label for="passportIssued">Кем выдан</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="registration">
                  <label for="registration">Прописка</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="Address">
                  <label for="Address">Адрес</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="tel" id="homePhone">
                  <label for="homePhone">Телефон Домашний</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="tel" id="mobilePhone">
                  <label for="mobilePhone">Телефон Мобильный</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="medicalBook">
                  <label for="medicalBook">Медицинская Книга</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="education">
                  <label for="education">Образование</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="university">
                  <label for="university">ВУЗ</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="previousWork">
                  <label for="previousWork">Прежняя Работа</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="reasonComing">
                  <label for="reasonComing">Почему пришел к нам</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="professions">
                  <label for="professions">Профессии</label>
                </div>

                <div class="input-field">
                  <select class="select">
                    <option value="1">Да</option>
                    <option value="2">Нет</option>
                  </select>
                  <label>Ночная</label>
                </div>

                <div class="input-field">
                  <select class="select">
                    <option value="1">Да</option>
                    <option value="2">Нет</option>
                  </select>
                  <label>Проверка МВД</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" class="datepicker" id="dateInterview">
                  <label for="dateInterview">Дата Собеседования</label>
                </div>

                <div class="input-field input-field-blue">
                  <input type="text" id="uniform">
                  <label for="uniform">Униформа</label>
                </div>

                <div class="input-field">
                  <select class="select">
                    <option value="1">Да</option>
                    <option value="2">Нет</option>
                  </select>
                  <label>Уволен</label>
                </div>
              </div>

              <div class="button-container">
                <button type="submit"
                        class="btn waves-effect waves-light auth-submit blue darken-1"
                >
                  <i class="material-icons">create</i> Редактировать
                </button>

                <router-link type="submit"
                             class="btn waves-effect waves-light auth-submit blue darken-1" to="/workers"
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

export default {
  name: 'AddWorkers',
  mounted () {
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })
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
