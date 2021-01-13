<template>
  <section class="workers_section">
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
      <tr v-for="worker in workers" :key="worker">
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
            >
              <i class="material-icons">remove_red_eye</i>
            </button>

            <button class="btn-transparent btn-remove transparent waves-effect waves-light auth-submit blue-text text-darken-1"
                    title="Удалить"
                    v-if="!worker.edited"
                    v-on:click="popupVisibility(worker.id)"
            >
              <i class="material-icons">delete</i>
            </button>

            <button class="btn-transparent transparent waves-effect auth-submit blue-text text-darken-1"
                    title="Редактировать"
                    v-on:click="editedWorkerStatus(worker.id)"
            >
              <i class="material-icons">create</i>
            </button>

          </div>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  name: 'ListWorkers',
  methods: {
    popupVisibility (id) {
      this.$emit('popup-visibility', id)
    },
    editedWorkerStatus (id) {
      this.$emit('edited-worker-status', id)
    }
  },
  props: ['workers']
}
</script>

<style scoped>
</style>
