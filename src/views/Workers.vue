<template>
  <div>
    <Popup
      v-if="popupShow"
      v-on:yes="removeWorker(worker)"
      v-on:no="popupHidden"
      v-bind:popup-title="'Удалить рабочего?'"
      v-bind:popup-toast="'Рабочий был удалён'"
    />

    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3>Список рабочих</h3>

        <div class="flex-center">
          <button class="btn-floating btn-page-title blue darken-1 waves-effect waves-circle waves-light"
                  onclick="M.toast({html: 'Рабочие обновлены'})"
                  v-on:click="updateCollection('workers')"
          ><i class="material-icons">autorenew</i>
          </button>

          <router-link class="btn-floating btn-page-title blue darken-1 waves-effect waves-circle waves-light" to="/workers/search"><i class="material-icons">search</i>
          </router-link>
        </div>
      </div>

      <AddCardWorkers
        @add-worker="addWorker"
      />
    </div>

    <section>
<!--      <ListWorkers-->
<!--        v-if="workers.length"-->
<!--        v-bind:workers="workers"-->
<!--        @remove-worker="removeWorker"-->
<!--      />-->
<!--      <div v-else class="empty-list">-->
<!--        <h5 class="empty-list-title"><i class="material-icons">mood_bad</i> Рабочих не осталось!</h5>-->
<!--        <p>Добавьте рабочего, чтобы начать работать над ним.</p>-->
<!--      </div>-->

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
              <button class="btn-transparent transparent waves-effect auth-submit blue-text text-darken-1"
                      title="Подробнее"
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
  </div>
</template>

<script>
import AddCardWorkers from '@/components/workers/AddCardWorkers'
import Popup from '@/components/Popup'
export default {
  name: 'Workers',
  components: { AddCardWorkers, Popup },
  data () {
    return {
      workers: [],
      popupShow: false,
      worker: '',

      updateTimeout: 60000
    }
  },
  methods: {
    popupVisibility (id) {
      this.popupShow = true
      this.worker = id
    },

    popupHidden () {
      this.popupShow = false
    },

    removeWorker (id) {
      this.workers = this.workers.filter(worker => worker.id !== id)
      this.saveCollection(this.workers, 'workers')
      this.popupHidden()
    },

    addWorker (worker) {
      this.workers.push(worker)
      this.saveCollection(this.workers, 'workers')
    },

    saveCollection (collection, collectionName) {
      const parsed = JSON.stringify(collection)
      localStorage.setItem(collectionName, parsed)
    },

    editedWorkerStatus (id) {
      const index = this.workers.findIndex((element) => element.id === id)
      this.workers[index].edited = true
      this.saveCollection(this.workers, 'workers')
      this.$router.push('/workers/editor')
    },

    updateCollection (collectionName) {
      if (localStorage.getItem(collectionName)) {
        try {
          this.workers = JSON.parse(localStorage.getItem(collectionName))
        } catch (e) {
          localStorage.removeItem(collectionName)
        }
      }
    }
  },
  mounted () {
    this.updateCollection('workers')
    setInterval(() => this.updateCollection('workers'), this.updateTimeout)
  }
}
</script>
