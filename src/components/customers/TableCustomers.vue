<template>
<div>
  <Popup
    v-if="popupShow"
    @yes="removeWorker(worker)"
    @no="popupHidden()"
    :popup-toast="`Клиент был удалён!`"
  >
    <template #title-popup>
      Удалить?
    </template>

    <template #text-info-popup>
      Клиент <b>{{worker.surname}} {{worker.name}} будет удалён</b>
    </template>
  </Popup>

  <table>
    <tr>
      <th>Наименование</th>
      <th>Телефон</th>
      <th>Сайт</th>
      <th>Почта</th>
      <th>Адрес</th>
      <th>Менеджер</th>
      <th>Состояние</th>
    </tr>
    <tr v-for="worker in workers" :key="worker.value">
        <td>{{worker.name}}</td>
        <td>{{worker.number}}</td>
        <td>{{worker.site}}</td>
        <td>{{worker.email}}</td>
        <td>{{worker.address}}</td>
        <td>{{worker.manager}}</td>
        <td>{{worker.status}}</td>
        <td>
          <div class="flex-center">
            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Просмотреть"
                         :to="{name : 'customerAbout', params: {id: worker.id}}"
            >
              <i class="material-icons">remove_red_eye</i>
            </router-link>

            <router-link class="btn-transparent transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                         title="Редактировать"
                         :to="{name : 'customerEdit', params: {id: worker.id}}"
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
  name: 'TableCustomers',
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
  }
}
</script>
