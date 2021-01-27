<template>
<div>
  <table v-if="dataThisEmployee.access === 'admin'">
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
    <tr v-for="worker in workers" :key="worker.value">
        <td>{{worker.surname}}</td>
        <td>{{worker.name}}</td>
        <td>{{worker.patronymic}}</td>
        <td>{{worker.sex}}</td>
        <td>{{worker.age}}</td>
        <td>{{worker.medicalBook}}</td>
        <td>{{worker.city}}</td>
        <td>{{worker.mobilePhone}}</td>
        <td>{{worker.professions}}</td>
        <td>
          <div class="flex-center">
            <button class="btn-transparent btn-remove transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                    title="Просмотреть"
                    v-show="eye"
                    v-on:click.prevent="watchAboutWorker(worker)"
            >
              <i class="material-icons">remove_red_eye</i>
            </button>

            <router-link class="btn-transparent transparent waves-effect auth-submit blue-text text-darken-1"
                    title="Редактировать"
                    :to="{name : 'workerEdit', params: {id: worker.id}}"
            >
              <i class="material-icons">create</i>
            </router-link>

            <button class="btn-transparent btn-remove transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                    title="Удалить"
                    v-if="!worker.edited"
                    v-on:click.prevent="popupVisibility(worker)"
            >
              <i class="material-icons">delete</i>
            </button>

          </div>
        </td>
      </tr>
  </table>

  <table v-else>
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
    <tr v-for="worker in workers" :key="worker.value" v-show="worker.city === dataThisEmployee.city">
        <td>{{worker.surname}}</td>
        <td>{{worker.name}}</td>
        <td>{{worker.patronymic}}</td>
        <td>{{worker.sex}}</td>
        <td>{{worker.age}}</td>
        <td>{{worker.medicalBook}}</td>
        <td>{{worker.city}}</td>
        <td>{{worker.mobilePhone}}</td>
        <td>{{worker.professions}}</td>
        <td>
          <div class="flex-center">
            <button class="btn-transparent btn-remove transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                    title="Просмотреть"
                    v-show="eye"
                    v-on:click.prevent="watchAboutWorker(worker)"
            >
              <i class="material-icons">remove_red_eye</i>
            </button>

            <button class="btn-transparent btn-remove transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                    title="Удалить"
                    v-if="!worker.edited"
                    v-on:click.prevent="popupVisibility(worker)"
            >
              <i class="material-icons">delete</i>
            </button>

            <button class="btn-transparent transparent waves-effect auth-submit blue-text text-darken-1"
                    title="Редактировать"
                    v-on:click.prevent="editedWorkerStatus(worker.id)"
            >
              <i class="material-icons">create</i>
            </button>

          </div>
        </td>
      </tr>
  </table>
</div>
</template>

<script>
export default {
  name: 'TableWorkers',
  data () {
    return {
      dataThisEmployee: ''
    }
  },
  methods: {
    popupVisibility (worker) {
      this.$emit('popup-visibility', worker)
    },

    editedWorkerStatus (id) {
      this.$emit('edited-worker-status', id)
    },

    watchAboutWorker (worker) {
      this.$emit('watch-about-worker', worker)
    }
  },
  // eslint-disable-next-line vue/no-dupe-keys
  props: ['workers', 'eye'],
  mounted () {
    if (localStorage.getItem('dataThisEmployee')) {
      try {
        this.dataThisEmployee = JSON.parse(localStorage.getItem('dataThisEmployee'))
      } catch (e) {
        localStorage.removeItem('dataThisEmployee')
      }
    }
  }
}
</script>

<style scoped>
</style>
