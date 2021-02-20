<template>
  <div>
    <div class="page-title flex-between-center">
      <h3>Календарь</h3>
    </div>

    <section>
      <Calendar  :columns="$screens({ default: 1, lg: 3 })"
                 :rows="$screens({ default: 1, lg: 4 })"
                 :is-expanded="$screens({ default: true, lg: true })" />
    </section>
  </div>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'

export default {
  name: 'AppCalendar',
  components: {
    Calendar
  }
}
</script>

<style scoped>

</style>
