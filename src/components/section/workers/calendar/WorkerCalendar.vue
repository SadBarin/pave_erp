<template>
  <div>
    <WorkerAddEvent
      v-show="addEventShowStatus"
      @hiddenEventVisibility="hiddenEventVisibility"
      @addEventCalendar="addEventCalendar"
    />
    <FullCalendar :options="calendarOptions" class="full-calendar"/>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru'
import { mapGetters, mapMutations } from 'vuex'

import WorkerAddEvent from './WorkerAddEvent'

export default {
  components: {
    FullCalendar, WorkerAddEvent
  },
  data () {
    return {
      addEventShowStatus: false,
      cell: 'var',
      eventID: '',
      calendarOptions: {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        timeZone: 'local',
        editable: true,
        droppable: true,
        locale: 'ru',
        locales: [ruLocale],
        selectable: true,
        dateClick: this.handleDateClick,
        eventClick: this.addEventID,
        events: [
          { id: 0, title: 'событие 1', date: '2021-02-01' }
        ],
        customButtons: {
          addEventButton: {
            text: 'Добавить событие',
            click: this.showEventVisibility
          },
          deleteEventButton: {
            text: 'Убрать событие',
            click: this.removeEventCalendar
          }
        },
        headerToolbar: {
          end: 'addEventButton deleteEventButton today prev,next'
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

    showEventVisibility () {
      this.addEventShowStatus = true
    },

    hiddenEventVisibility () {
      this.addEventShowStatus = false
    },

    addEventID (info) {
      this.eventID = info.event.id
    },

    addEventCalendar (title, date, time) {
      this.calendarOptions.events.push({ id: Date.now(), title: title, date: this.cell.dateStr })
      this.hiddenEventVisibility()
    },

    removeEventCalendar () {
      this.calendarOptions.events = this.calendarOptions.events.filter((event) => event.id.toString() !== this.eventID.toString())
    },

    handleDateClick (arg) {
      this.cell = arg
    }
  },
  mounted () {
    this.SET_WORKERS_FROM_LOCAL_STORAGE()
    this.calendarOptions.events = this.workers[this.$route.params.id].events
    console.log(this.workers[this.$route.params.id])
  }
}
</script>
