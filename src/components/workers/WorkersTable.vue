<template>
<div>
  <Popup
    v-if="popupShow"
    @yes="removeWorker(worker)"
    @no="popupHidden()"
    :popup-toast="`Рабочий ${worker.surname} ${worker.name} был удалён!'`"
  >
    <template #title-popup>
      Удалить?
    </template>

    <template #text-info-popup>
      После нажатия кнопки "да" будет удалён <b>{{worker.surname}} {{worker.name}}</b>!
    </template>
  </Popup>

  <table>
    <tr>
      <th>Фамилия</th>
      <th>Имя</th>
      <th>Отчество</th>
      <th>Возраст</th>
      <th>Мед.книжка</th>
      <th>Город</th>
      <th>Телефон</th>
      <th>Профессия</th>
      <th></th>
    </tr>
    <tr v-for="worker in workers" :key="worker.value" :class="worker.fired === 'Нет' ? '' : 'opacity-5'">
        <td>{{worker.surname}}</td>
        <td>{{worker.name}}</td>
        <td>{{worker.patronymic}}</td>
        <td>{{worker.age}}</td>
        <td>
          <div v-if="worker.medicalBookStatus === 'Просрочена'" class="red-text darken-1">{{worker.medicalBookStatus}}</div>
          <div v-else>{{worker.medicalBookStatus}}</div>
        </td>
        <td>{{worker.city}}</td>
        <td><a :href="'tel:' + worker.mobilePhone" title="Позвонить">{{worker.mobilePhone}}</a></td>
        <td>{{worker.professions}}</td>
        <td>
          <div class="flex-center btns-collection" v-if="worker">
            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                    title="Просмотреть"
                     v-if="worker"
                    :to="{name: 'workerAbout', params: {id: worker.id}}"
            >
              <i class="material-icons">remove_red_eye</i>
            </router-link>

            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Календарь"
                         :to="{name : 'workerCalendar', params: {id: worker.id}}"
            >
              <i class="material-icons">date_range</i>
            </router-link>

            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="История редактирования"
                         :to="{name : 'workerHistory', params: {id: worker.id}}"
            >
              <i class="material-icons">description</i>
            </router-link>

            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                    title="Редактировать"
                    :to="{name : 'workerEdit', params: {id: worker.id}}"
            >
              <i class="material-icons">create</i>
            </router-link>

            <button class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                    title="Удалить"
                    v-if="!worker.edited"
                    @click="popupVisibility(worker); setWorker(worker)"
            >
              <i class="material-icons">delete</i>
            </button>
          </div>
        </td>
      </tr>
  </table>
</div>
</template>

<script>
import popupMixin from '@/mixins/popupMixin'

export default {
  name: 'TableWorkers',
  mixins: [popupMixin],
  props: { workers: Object },
  data () {
    return {
      worker: ''
    }
  },
  methods: {
    setWorker (worker) {
      this.worker = worker
    },

    removeWorker (worker) {
      this.$emit('remove-worker', worker.id)
      this.popupHidden()
    }
  }
}
</script>
