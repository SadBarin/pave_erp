<template>
  <div>
    <div class="page-title">
      <div class="title-container">
        <h3>Список рабочих</h3>

        <div class="title-btn-container">
          <button class="btn-floating btn-title blue darken-1 waves-effect waves-circle waves-light"
                  onclick="M.toast({html: 'Рабочие обновлены'})"
                  v-on:click="updateCollection('workers')"
          ><i class="material-icons">autorenew</i>
          </button>

          <router-link class="btn-floating btn-title blue darken-1 waves-effect waves-circle waves-light" to="/workers/search"><i class="material-icons">search</i>
          </router-link>
        </div>
      </div>

      <AddCardWorkers
        @add-worker="addWorker"
      />
    </div>

    <div>
      <ListWorkers
        v-if="workers.length"
        v-bind:workers="workers"
        @remove-worker="removeWorker"
      />
      <div v-else class="empty-list">
        <h5 class="empty-list-title"><i class="material-icons">mood_bad</i> Рабочих не осталось!</h5>
        <p>Добавьте рабочего, чтобы начать работать над ним.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AddCardWorkers from '@/components/workers/AddCardWorkers'
import ListWorkers from '@/components/workers/ListWorkers'
export default {
  name: 'Workers',
  components: { ListWorkers, AddCardWorkers },
  data () {
    return {
      workers: [
        { id: 1, name: 'Горбачев', surname: 'Артём', patronymic: 'Михайлович', accountNumber: '', mobilePhone: 705878898351, nameCard: '', surnameCard: '', patronymicCard: '', accountNumberCard: '', bank: '', birthday: '', sex: '', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '', education: '', university: '', previousWork: '', reasonComing: '', professions: '', nightShift: '', checkMVD: '', dateInterview: '', uniform: '', fired: '', edited: false },
        { id: 2, name: 'Королев', surname: 'Максим', patronymic: 'Дмитриевич', accountNumber: '', mobilePhone: 7275590082, nameCard: '', surnameCard: '', patronymicCard: '', accountNumberCard: '', bank: '', birthday: '', sex: '', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '', education: '', university: '', previousWork: '', reasonComing: '', professions: '', nightShift: '', checkMVD: '', dateInterview: '', uniform: '', fired: '', edited: false },
        { id: 3, name: 'Гаврилов', surname: 'Юрий', patronymic: 'Семёнович', accountNumber: '', mobilePhone: 77929469057, nameCard: '', surnameCard: '', patronymicCard: '', accountNumberCard: '', bank: '', birthday: '', sex: '', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '', education: '', university: '', previousWork: '', reasonComing: '', professions: '', nightShift: '', checkMVD: '', dateInterview: '', uniform: '', fired: '', edited: false },
        { id: 4, name: 'Белов', surname: 'Илья', patronymic: 'Александрович', accountNumber: '', mobilePhone: 73548930214, nameCard: '', surnameCard: '', patronymicCard: '', accountNumberCard: '', bank: '', birthday: '', sex: '', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '', education: '', university: '', previousWork: '', reasonComing: '', professions: '', nightShift: '', checkMVD: '', dateInterview: '', uniform: '', fired: '', edited: false },
        { id: 5, name: 'Абрамова', surname: 'Алиса', patronymic: 'Макаровна', accountNumber: '', mobilePhone: 764871391671, nameCard: '', surnameCard: '', patronymicCard: '', accountNumberCard: '', bank: '', birthday: '', sex: '', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '', education: '', university: '', previousWork: '', reasonComing: '', professions: '', nightShift: '', checkMVD: '', dateInterview: '', uniform: '', fired: '', edited: false },
        { id: 6, name: 'Попов', surname: 'Михаил', patronymic: 'Сергеевич', accountNumber: '', mobilePhone: 7318852304, nameCard: '', surnameCard: '', patronymicCard: '', accountNumberCard: '', bank: '', birthday: '', sex: '', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '', education: '', university: '', previousWork: '', reasonComing: '', professions: '', nightShift: '', checkMVD: '', dateInterview: '', uniform: '', fired: '', edited: false },
        { id: 7, name: 'Дубровина', surname: 'Майя', patronymic: 'Тимуровна', accountNumber: '', mobilePhone: 7981979618, nameCard: '', surnameCard: '', patronymicCard: '', accountNumberCard: '', bank: '', birthday: '', sex: '', nationality: '', passportID: '', passportDate: '', passportIssued: '', registration: '', address: '', homePhone: '', number: '3462325235235', medicalBook: '', education: '', university: '', previousWork: '', reasonComing: '', professions: '', nightShift: '', checkMVD: '', dateInterview: '', uniform: '', fired: '', edited: false }
      ],

      updateTimeout: 60000
    }
  },
  methods: {
    removeWorker (id) {
      this.workers = this.workers.filter(worker => worker.id !== id)
      this.saveCollection(this.workers, 'workers')
    },

    addWorker (worker) {
      this.workers.push(worker)
      this.saveCollection(this.workers, 'workers')
    },

    saveCollection (collection, collectionName) {
      const parsed = JSON.stringify(collection)
      localStorage.setItem(collectionName, parsed)
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
    this.saveCollection(this.workers, 'workers')
    this.updateCollection('workers')
    setInterval(() => this.updateCollection('workers'), this.updateTimeout)
  }
}
</script>
