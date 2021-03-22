<template>
  <div>
    <div class="page-title flex-between-center">
      <h3 class="title-clip">Информация о рабочем <br> "{{ worker.surname }} {{ worker.name }}"</h3>
      <NavWorker :worker="worker"/>
    </div>

    <section class="info-content">
      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">account_box</i> ФИО</h5>
        <h6 v-if="worker.name !== '' || null ">Имя:
          <wbr>
          <span>{{ worker.name }}</span></h6>
        <h6 v-if="worker.surname !== '' || null ">Фамилия:
          <wbr>
          <span>{{ worker.surname }}</span></h6>
        <h6 v-if="worker.patronymic !== '' || null ">Отчество:
          <wbr>
          <span>{{ worker.patronymic }}</span></h6>
      </div>

      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">assignment</i> Личные данные</h5>
        <h6 v-if="worker.birthday !== '' || null ">День рождение:
          <wbr>
          <span>{{ worker.birthday }}</span></h6>
        <h6 v-if="worker.age !== '' || null ">Возраст:
          <wbr>
          <span>{{ worker.age }}</span></h6>
        <h6 v-if="worker.sex !== '' || null ">Пол:
          <wbr>
          <span>{{ worker.sex }}</span></h6>
        <h6 v-if="worker.nationality !== '' || null ">Национальность:
          <wbr>
          <span>{{ worker.nationality }}</span></h6>
        <h6 v-if="worker.medicalBook !== '' || null ">Мед.книжка:
          <wbr>
          <span>{{ worker.medicalBook }}</span></h6>
        <h6 v-if="worker.education !== '' || null ">Образование:
          <wbr>
          <span>{{ worker.education }}</span></h6>
        <h6 v-if="worker.university !== '' || null ">ВУЗ:
          <wbr>
          <span>{{ worker.university }}</span></h6>
      </div>

      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">book</i> Паспортные данные</h5>
        <h6 v-show="worker.UploadPassport !== undefined || ''">Скан:
          <wbr>
          <span><a v-bind:href="worker.UploadPassport" target="_blank">Открыть паспорт</a></span></h6>
        <h6 v-if="worker.passportID !== '' || null ">Номер паспорта:
          <wbr>
          <span>{{ worker.passportID }}</span></h6>
        <h6 v-if="worker.passportDate !== '' || null ">Дата выдачи паспорта:
          <wbr>
          <span>{{ worker.passportDate }}</span></h6>
        <h6 v-if="worker.passportIssued !== '' || null ">Кем выдан:
          <wbr>
          <span>{{ worker.passportIssued }}</span></h6>
        <h6 v-if="worker.registration !== '' || null ">Прописка:
          <wbr>
          <span>{{ worker.registration }}</span></h6>
        <h6 v-if="worker.address !== '' || null ">Адрес:
          <wbr>
          <span>{{ worker.address }}</span></h6>
      </div>

      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">account_balance_wallet</i> Банковские данные</h5>
        <h6 v-if="worker.nameCard !== '' || null ">Имя держателя карты:
          <wbr>
          <span>{{ worker.nameCard }}</span></h6>
        <h6 v-if="worker.surnameCard !== '' || null ">Фамилия держателя карты:
          <wbr>
          <span>{{ worker.surnameCard }}</span></h6>
        <h6 v-if="worker.patronymicCard !== '' || null ">Отчество держателя карты:
          <wbr>
          <span>{{ worker.patronymicCard }}</span></h6>
        <h6 v-if="worker.accountNumberCard !== '' || null ">Номер счёта:
          <wbr>
          <span>{{ worker.accountNumberCard }}</span></h6>
        <h6 v-if="worker.bank !== '' || null ">Банк:
          <wbr>
          <span>{{ worker.bank }}</span></h6>
      </div>

      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">local_phone</i> Контактные данные</h5>
        <h6 v-if="worker.city !== '' || null ">Город:
          <wbr>
          <span>{{ worker.city }}</span></h6>
        <h6 v-if="worker.mobilePhone !== '' || null ">Осн. мобильный телефон:
          <wbr>
          <span><a :href="'tel:' + worker.mobilePhone">{{ worker.mobilePhone }}</a></span></h6>
        <h6 v-if="worker.mobilePhoneAdditional != '' || null">Доп. мобильный телефон:
          <wbr>
          <span><a :href="'tel:' + worker.mobilePhone">{{ worker.mobilePhoneAdditional }}</a></span></h6>
        <h6 v-if="worker.mobilePhoneStanby != '' || null">Зап. мобильный телефон:
          <wbr>
          <span><a :href="'tel:' + worker.mobilePhone">{{ worker.mobilePhoneStandby }}</a></span></h6>
        <h6 v-if="worker.homePhone !== '' || null ">Домашний телефон:
          <wbr>
          <span>{{ worker.homePhone }}</span></h6>
      </div>

      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">rate_review</i> Рабочие данные</h5>
        <h6>Учётный номер:
          <wbr>
          <span>{{ worker.accountNumber }}</span></h6>
        <h6>Прежняя работа:
          <wbr>
          <span>{{ worker.previousWork }}</span></h6>
        <h6>Почему пришёл к нам:
          <wbr>
          <span>{{ worker.reasonComing }}</span></h6>
        <h6>Профессия 1:
          <wbr>
          <span>{{ worker.professions }}</span></h6>
        <h6 v-if="worker.professionsSecond != null">Профессия 2:
          <wbr>
          <span>{{ worker.professionsSecond }}</span></h6>
        <h6 v-if="worker.professionsThird != null">Профессия 3:
          <wbr>
          <span>{{ worker.professionsThird }}</span></h6>
        <h6>Ночная смена:
          <wbr>
          <span>{{ worker.nightShift }}</span></h6>
        <h6>Проверка МВД:
          <wbr>
          <span>{{ worker.checkMVD }}</span></h6>
        <h6>Дата собеседования:
          <wbr>
          <span>{{ worker.dateInterview }}</span></h6>
        <h6>Униформа:
          <wbr>
          <span>{{ worker.uniform }}</span></h6>
        <h6>Уволен:
          <wbr>
          <span>{{ worker.fired }}</span></h6>
      </div>

      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">assessment</i> Системные данные</h5>
        <h6 v-if="worker.id !== '' || null ">Идентификационный номер:
          <wbr>
          <span>{{ worker.id }}</span></h6>
        <h6>Сколько раз редактировался:
          <wbr>
          <span>{{ worker.editedCount }}</span></h6>
        <h6>История редактирования:
          <wbr>
          <span>
            <router-link title="История редактирования"
                         :to="{name : 'workerHistory', params: {id: worker.id}}">
            Просмотреть
            </router-link>
          </span>
        </h6>
        <h6>Календарь работника:
          <wbr>
          <span>
            <router-link title="Календарь"
                         :to="{name : 'workerCalendar', params: {id: worker.id}}">
              Просмотреть
            </router-link>
        </span>
        </h6>
      </div>

      <div class="margin-fix w20rem">
        <h5 class="flex-start-center big-margin-bottom"><i class="material-icons">photo</i> Фото рабочего</h5>
        <p v-show="worker.UploadImage === undefined">Загрузите фото рабочего в редакторе</p>
        <img v-bind:src="worker.UploadImage" width="200rem">
      </div>

      <div class="margin-fix w20rem">
        <h5 class="flex-start-center"><i class="material-icons">comment</i> Примечания</h5>
        <h6 v-if="worker.notes !== '' || null">
          <p v-for="(note, i) in worker.notes" :key="i">
            {{ note }}
          </p>
        </h6>

        <h6 v-show="worker.uploadImageNote !== undefined || ''">Изображение:
          <wbr>
          <span><a v-bind:href="worker.uploadImageNote" target="_blank">Открыть</a></span></h6>
      </div>
    </section>
  </div>
</template>

<script>
import NavWorker from '@/components/workers/WorkerNav'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AboutWorker',

  components: { NavWorker },

  filters: {
    booleanToWord: function (boolean) {
      return (boolean === true) ? 'Да' : 'Нет'
    }
  },

  data () {
    return {
      worker: ''
    }
  },

  computed: {
    ...mapGetters([
      'workers'
    ]),

    notes () {
      try {
        return this.worker.notes.slice(-5)
      } catch (e) {
        return ['К сожалению примечания не поддерживаются']
      }
    }
  },

  created () {
    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.worker = this.workers[this.$route.params.id]
  },

  methods: {
    ...mapMutations([
      'SET_WORKERS_FROM_LOCAL_STORAGE'
    ])
  }
}
</script>
