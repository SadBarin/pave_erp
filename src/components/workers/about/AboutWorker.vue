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

    <section>
      <h4>ФИО</h4>
      <h6>Имя: <span>{{worker.name}}</span></h6>
      <h6>Фамилия: <span>{{worker.surname}}</span></h6>
      <h6>Отчество: <span>{{worker.patronymic}}</span></h6>

      <h4>Личные данные</h4>
      <h6>День рождение: <span>{{worker.birthday}}</span></h6>
      <h6>Возраст: <span>{{worker.age}}</span></h6>
      <h6>Пол: <span>{{worker.sex}}</span></h6>
      <h6>Национальность: <span>{{worker.nationality}}</span></h6>
      <h6>Мед.книжка: <span>{{worker.medicalBook}}</span></h6>
      <h6>Образование: <span>{{worker.education}}</span></h6>
      <h6>ВУЗ: <span>{{worker.university}}</span></h6>

      <h4>Паспортные данные</h4>
      <h6>Номер паспорта: <span>{{worker.passportID}}</span></h6>

      <h4>Банковские данные</h4>
      <h6>Номер счёта: <span>{{worker.accountNumberCard}}</span></h6>
      <h6>Банк: <span>{{worker.bank}}</span></h6>

      <h4>Контакнтые данные</h4>
      <h6>Город: <span>{{worker.city}}</span></h6>
      <h6>Мобильный телефон: <span>{{worker.mobilePhone}}</span></h6>
      <h6>Мобильный телефон: <span>{{worker.homePhone}}</span></h6>

      <h4>Рабочие данные</h4>
      <h6>Профессия: <span>{{worker.professions}}</span></h6>
      <h6>Ночная смена: <span>{{worker.nightShift}}</span></h6>
      <h6>Проверка МВД: <span>{{worker.checkMVD}}</span></h6>
      <h6>Уволен: <span>{{worker.fired}}</span></h6>

      <h4>Системные данные</h4>
      <h6>Идентификационный номер: <span>{{worker.id}}</span></h6>
      <h6>Сейчас редактируется: <span>{{worker.edited}}</span></h6>
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

</style>
