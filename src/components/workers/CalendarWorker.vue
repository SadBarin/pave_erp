<template>
  <div>
    <div class="page-title flex-between-center">
      <h3 class="title-clip">Календарь рабочего <br> "{{worker.surname}} {{worker.name}}"</h3>
      <NavWorker :worker="worker"/>
    </div>

    <section class="app-calendar">
      <div class="calendar-main">
        <div v-for="month in months" :key="month" class="calendar-month flex-column-center">
          <h4>{{month}}</h4>
          <div class="calendar-days">
            <p v-for="i in days" :key="i" class="calendar-day">
              {{i}}
            </p>
          </div>
        </div>
      </div>
      <div class="calendar-sidenav">
        <h4>Календарь</h4>
        <button
          class="btn-flat right-margin-little white-text btn-hover blue darken-1"
        >
          <i class="material-icons">add</i> Добавить событие
        </button>
      </div>
    </section>
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
  #app .app-calendar {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 1rem;
  }

  #app .calendar-main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }

  #app .calendar-month {
    background: var(--hover-bg);
    border-radius: var(--border-radius);

    padding: 1rem;
  }

  #app .calendar-days {
    display: flex;
    flex-wrap: wrap;
  }

  #app .calendar-day {
    margin-left: 0.3rem;
    cursor: pointer;
  }

  #app .calendar-sidenav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
</style>
