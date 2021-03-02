<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru'

export default {
  components: {
    FullCalendar
  },

  data () {
    return {
      calendarOptions: {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        timeZone: 'local',
        locale: 'ru',
        locales: [ruLocale],
        dateClick: this.handleDateClick,
        events: [
          { title: 'событие 1', date: '2021-02-01' },
          { title: 'событие 2', date: '2021-02-02' }
        ]
      }
    }
  },

  methods: {
    handleDateClick: function (arg) {
      alert('date click! ' + arg.dateStr)
    }
  }
}
</script>
