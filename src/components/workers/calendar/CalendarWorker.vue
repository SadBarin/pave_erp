<template>
  <FullCalendar :options="calendarOptions" class="full-calendar"/>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    FullCalendar
  },
  data () {
    return {
      cell: 'var',
      calendarOptions: {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        timeZone: 'local',
        droppable: true,
        locale: 'ru',
        locales: [ruLocale],
        selectable: true,
        dateClick: this.handleDateClick,
        events: [
          { title: 'событие 1', date: '2021-02-01' },
          { title: 'событие 2', date: '2021-02-02' }
        ],
        customButtons: {
          addEventButton: {
            text: 'Добавить событие',
            click: this.addEventCalendar
          }
        },
        headerToolbar: {
          end: 'addEventButton today prev,next'
        }
      }
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
    ]),

    addEventCalendar () {
      alert('Добавляем!')
      console.log(this.cell)
      this.calendarOptions.events.push({ title: 'event', date: this.cell.dateStr })
    },

    handleDateClick (arg) {
      this.cell = arg
      console.log(arg)
    }
  },
  mounted () {
    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.calendarOptions.events = this.workers[this.$route.params.id].events
    console.log(this.cell)
  }
}
</script>
