<template>
<div>
  <Popup
    v-if="popupShow"
    @yes="removeWorker(worker)"
    @no="popupHidden()"
    :popup-toast="`${worker.surname} ${worker.name} ${(worker.sex === 'Женский')? ' была удалена' : ' был удалён!'}`"
  >
    <template #title-popup>
      Удалить?
    </template>

    <template #text-info-popup>
      {{worker.sex | sexMsgDelete }} <b>{{worker.surname}} {{worker.name}}</b>
    </template>
  </Popup>

  <table>
    <tr>
      <th>Фамилия</th>
      <th>Имя</th>
      <th>Отчество</th>
      <th>Пол</th>
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
        <td>{{worker.sex}}</td>
        <td>{{worker.age}}</td>
        <td>{{worker.medicalBook}}</td>
        <td>{{worker.city}}</td>
        <td><a :href="'tel:' + worker.mobilePhone" title="Позвонить">{{worker.mobilePhone}}</a></td>
        <td>{{worker.professions}}</td>
        <td>
          <div class="flex-center">
            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                    title="Просмотреть"
                    :to="{name : 'workerAbout', params: {id: worker.id}}"
            >
              <i class="material-icons">remove_red_eye</i>
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
  props: ['workers'],
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
  },
  mounted () {
    console.log('Workers for:', this.workers)
  }
}
</script>
