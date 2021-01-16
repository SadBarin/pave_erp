<template>
  <div>
    <div class="page-title flex-between-center">
      <h3>Информация о рабочем "{{worker.surname}} {{worker.name}}"</h3>

      <button class="btn waves-effect waves-blue pointer blue darken-1"
              v-on:click="exitAboutWorker"
      >
        <i class="material-icons">transfer_within_a_station</i> К Рабочим
      </button>
    </div>

    <section class="about-section">
      <div>
        <h5><i class="material-icons">account_box</i> ФИО</h5>
        <h6>Имя: <span>{{worker.name}}</span></h6>
        <h6>Фамилия: <span>{{worker.surname}}</span></h6>
        <h6>Отчество: <span>{{worker.patronymic}}</span></h6>
      </div>

      <div>
        <h5><i class="material-icons">assignment</i> Личные данные</h5>
        <h6>День рождение: <span>{{worker.birthday}}</span></h6>
        <h6>Возраст: <span>{{worker.age}}</span></h6>
        <h6>Пол: <span>{{worker.sex}}</span></h6>
        <h6>Национальность: <span>{{worker.nationality}}</span></h6>
        <h6>Мед.книжка: <span>{{worker.medicalBook}}</span></h6>
        <h6>Образование: <span>{{worker.education}}</span></h6>
        <h6>ВУЗ: <span>{{worker.university}}</span></h6>
      </div>

      <div>
        <h5><i class="material-icons">book</i> Паспортные данные</h5>
        <h6>Номер паспорта: <span>{{worker.passportID}}</span></h6>
      </div>

      <div>
        <h5><i class="material-icons">account_balance_wallet</i> Банковские данные</h5>
        <h6>Номер счёта: <span>{{worker.accountNumberCard}}</span></h6>
        <h6>Банк: <span>{{worker.bank}}</span></h6>
      </div>

      <div>
        <h5><i class="material-icons">local_phone</i> Контактные данные</h5>
        <h6>Город: <span>{{worker.city}}</span></h6>
        <h6>Мобильный телефон: <span>{{worker.mobilePhone}}</span></h6>
        <h6>Мобильный телефон: <span>{{worker.homePhone}}</span></h6>
      </div>

      <div>
        <h5><i class="material-icons">rate_review</i> Рабочие данные</h5>
        <h6>Профессия: <span>{{worker.professions}}</span></h6>
        <h6>Ночная смена: <span>{{worker.nightShift}}</span></h6>
        <h6>Проверка МВД: <span>{{worker.checkMVD}}</span></h6>
        <h6>Уволен: <span>{{worker.fired}}</span></h6>
      </div>

      <div>
        <h5><i class="material-icons">assessment</i> Системные данные</h5>
        <h6>Идентификационный номер: <span>{{worker.id}}</span></h6>
        <h6>Сейчас редактируется: <span>{{worker.edited}}</span></h6>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutWorker',
  props: ['worker'],
  methods: {
    exitAboutWorker () {
      this.$emit('exit-about-worker')
    }
  }
}
</script>

<style scoped>
  .about-section {
    text-align: start;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  .about-section > div {
    margin-right: 5rem
  }
</style>
