<template>
  <div>
    <div class="page-title flex-between-center">
      <h3>Информация о рабочем "{{worker.surname}} {{worker.name}}"</h3>

      <div class="editor-btns">
        <router-link class="btn waves-effect waves-blue pointer blue darken-1"
                     :to="{name : 'workerEdit', params: {id: worker.id}}"
        >
          <i class="material-icons">create</i> В редактор
        </router-link>

        <router-link class="btn waves-effect waves-blue pointer blue darken-1"
                     to="/workers"
        >
          <i class="material-icons">transfer_within_a_station</i> К Рабочим
        </router-link>
      </div>
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
        <h6 v-show="worker.UploadPassport !== undefined">Скан: <span><a v-bind:href="worker.UploadPassport" target="_blank">Открыть паспорт</a></span></h6>
        <h6>Номер паспорта: <span>{{worker.passportID}}</span></h6>
        <h6>Дата выдачи паспорта: <span>{{worker.passportDate}}</span></h6>
        <h6>Кем выдан: <span>{{worker.passportIssued}}</span></h6>
        <h6>Прописка: <span>{{worker.registration}}</span></h6>
        <h6>Адрес: <span>{{worker.address}}</span></h6>
      </div>

      <div>
        <h5><i class="material-icons">account_balance_wallet</i> Банковские данные</h5>
        <h6>Имя держателя карты: <span>{{worker.nameCard}}</span></h6>
        <h6>Фамилия держателя карты: <span>{{worker.surnameCard}}</span></h6>
        <h6>Отчество держателя карты: <span>{{worker.patronymicCard}}</span></h6>
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
        <h6>Учётный номер: <span>{{worker.accountNumber}}</span></h6>
        <h6>Прежняя работа: <span>{{worker.previousWork}}</span></h6>
        <h6>Почему пришёл к нам: <span>{{worker.reasonComing}}</span></h6>
        <h6>Профессия: <span>{{worker.professions}}</span></h6>
        <h6>Ночная смена: <span>{{worker.nightShift}}</span></h6>
        <h6>Проверка МВД: <span>{{worker.checkMVD}}</span></h6>
        <h6>Дата собеседования: <span>{{worker.dateInterview}}</span></h6>
        <h6>Униформа: <span>{{worker.uniform}}</span></h6>
        <h6>Уволен: <span>{{worker.fired}}</span></h6>
      </div>

      <div>
        <h5><i class="material-icons">assessment</i> Системные данные</h5>
        <h6>Идентификационный номер: <span>{{worker.id}}</span></h6>
<!--        <h6>Сейчас редактируется: <span>{{worker.edited | booleanToWord}}</span></h6>-->
        <h6>Сколько раз редактировался: <span>{{worker.editedCount}}</span></h6>
      </div>

      <div>
        <h5><i class="material-icons">photo</i> Фото рабочего</h5>
        <p v-show="worker.UploadImage === undefined">Загрузите фото рабочего в редакторе</p>
        <img v-bind:src="worker.UploadImage" width="300rem">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutWorker',
  data () {
    return {
      workers: '',
      worker: ''
    }
  },
  filters: {
    booleanToWord: function (boolean) {
      return (boolean === true) ? 'Да' : 'Нет'
    }
  },
  mounted () {
    if (localStorage.getItem('workers')) {
      try {
        this.workers = JSON.parse(localStorage.getItem('workers'))
      } catch (e) {
        localStorage.removeItem('workers')
      }
    }

    for (const worker of this.workers) {
      // eslint-disable-next-line eqeqeq
      if (worker.id == this.$route.params.id) {
        console.log(worker)
        this.worker = worker
      }
    }
  }
}
</script>

<style scoped>
  .about-section {
    text-align: start;

    width: 100%;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  .about-section > div {
    margin-right: 3rem
  }

  .photo-example {
    margin: 1rem 0rem 1rem 0rem;
  }
</style>
