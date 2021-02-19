<template>
  <div>
    <div class="page-title flex-between-center">
      <h3 class="title-clip">Календарь рабочего <br> "{{worker.surname}} {{worker.name}}"</h3>
      <NavWorker :worker="worker"/>
    </div>

    <main class="calendar-main">
      <section class="app-calendar">
        <div class="calendar-body">
          <div v-for="month in months" :key="month" class="calendar-month">
            <h4>{{month}}</h4>
            <div class="calendar-days">
              <p v-for="i in days" :key="i" class="calendar-day">
                {{i}}
              </p>
            </div>
          </div>
        </div>
      </section>

      <aside>
        <div class="calendar-sidenav">
          <h4>Календарь</h4>
          <button
            class="btn-flat right-margin-little white-text btn-hover blue darken-1"
          >
            <i class="material-icons">add</i> Добавить событие
          </button>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
import NavWorker from '@/components/workers/NavWorker'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CalendarWorker',
  components: { NavWorker },
  data () {
    return {
      worker: '',
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      days: 31
    }
  },
  computed: {
    ...mapGetters([
      'workers'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_WORKERS_FROM_LOCAL_STORAGE'
    ])
  },
  filters: {
    booleanToWord: function (boolean) {
      return (boolean === true) ? 'Да' : 'Нет'
    }
  },
  mounted () {
    console.log(this.$route.name)

    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.worker = this.workers[this.$route.params.id]
  }
}
</script>

<style scoped>
  #app .calendar-main {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 1rem;
  }

  #app .app-calendar {
    display: grid;
  }

  #app .calendar-body {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  #app .calendar-month {
    border-radius: var(--border-radius);

    padding: 1rem;
  }

  #app .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  #app .calendar-day {
    cursor: pointer;
  }

  #app .calendar-sidenav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
</style>
