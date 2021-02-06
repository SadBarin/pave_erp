<template>
  <div>
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3 class="right-margin-big">Список рабочих</h3>

        <div class="flex-center">
<!--          <button class="btn-transparent transparent btn-page-title blue-text text-darken-1"-->
<!--                  title="Обновить страницу"-->
<!--                  onclick="M.toast({html: 'Рабочие обновлены'})"-->
<!--                  @click="updateWorkers()"-->
<!--          ><i class="material-icons middle-material-icons">autorenew</i>-->
<!--          </button>-->

          <router-link class="btn-transparent transparent btn-page-title blue-text text-darken-1" title="Начать поиск" to="/workers/search">
            <i class="material-icons middle-material-icons">search</i>
          </router-link>
        </div>
      </div>

      <AddCardWorkers
        @add-worker="addWorker"
      />
    </div>

    <section>
      <TableWorkers
        v-if="workers"
        @remove-worker="removeWorker"
        :workers="workers"
      />
<!--      <div v-else class="empty-list">-->
<!--        <h5 class="empty-list-title"><i class="material-icons">mood_bad</i> Рабочих не осталось!</h5>-->
<!--        <p>Добавьте рабочего, чтобы начать работать над ним.</p>-->
<!--      </div>-->
    </section>
  </div>
</template>

<script>
import TableWorkers from '@/components/workers/TableWorkers'
import AddCardWorkers from '@/components/workers/AddCardWorkers'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Workers',
  components: { TableWorkers, AddCardWorkers },
  data () {
    return {
      updateTimeout: 60000
    }
  },
  computed: {
    ...mapGetters([
      'workers',
      'dataThisEmployee'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_WORKERS'
    ]),

    // updateWorkers () {
    //   this.SET_WORKERS()
    //   console.log('Рабочие обновлены 🌀')
    // },

    removeWorker (id) {
      const buffer = this.workers.filter(worker => worker.id !== id)
      console.log('Рабочий удалён 🗑️')
      this.SET_WORKERS(buffer)
    },

    addWorker (worker) {
      const buffer = this.workers
      buffer.push(worker)
      console.log('Рабочий добавлен ➕')
      this.SET_WORKERS(buffer)
    }
  },
  mounted () {
    console.log('Workers:', this.workers)
    this.workers[0] = { id: 0, name: 'Артём', surname: 'Горбачев', patronymic: 'Михайлович', city: 'Ульяновск', accountNumber: 'test1', mobilePhone: '+7 (354) 823-12-55', nameCard: 'Артём', surnameCard: 'Горбачев', patronymicCard: 'Михайлович', accountNumberCard: '40817810570000133476', bank: 'СберБанк', age: '41', birthday: '1980-06-21', sex: 'Мужской', nationality: '', passportID: '192499', passportDate: '2018-01-19', passportIssued: '', registration: 'Ульяновск', address: 'Ульяновск', homePhone: '', number: '3462325235235', medicalBook: '2023-03-31', education: '', university: '', previousWork: '', reasonComing: '', professions: 'Электрик', nightShift: 'Нет', checkMVD: 'Да', dateInterview: '', uniform: '', fired: 'Нет', edited: false, UploadImage: 'https://res.cloudinary.com/db6qzfvbw/image/upload/v1612098077/profile_1_btkhxj.svg', UploadPassport: 'https://res.cloudinary.com/db6qzfvbw/image/upload/v1612098616/passport_otoach.png', editedCount: '1' }
    //
    // this.updateWorkers()
    // setInterval(() => this.updateWorkers(), this.updateTimeout)
  }
}
</script>
