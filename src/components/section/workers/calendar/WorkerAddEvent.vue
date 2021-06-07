<template>
  <div class="popup-overlay flex-center">
    <form class="card auth-card popup">
      <div class="card-content flex-column-center">
        <h4 class="card-title">
          Добавление события
        </h4>
        <div>
          <div class="input-field editor-input">
            <input
              id="event"
              type="text"
              v-model.trim="eventTitle"
            >
            <label class="active" for="event">Событие</label>
          </div>
        </div>
      </div>

      <div class="card-action btns-popup flex-between-center">
        <button
          class="btn-flat right-margin-little white-text btn-hover blue darken-1"
          @click.prevent="$emit('addEventCalendar', eventTitle)"
        >
          <i class="material-icons">check</i> Добавить
        </button>

        <button
          class="btn-flat white-text waves-effect btn-hover blue darken-1"
          @click.prevent="$emit('hiddenEventVisibility')"
        >
          <i class="material-icons">clear</i> Отмена
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddCalendarEvent',
  data () {
    return {
      eventTitle: ''
    }
  }
}
</script>

<style scoped>
#app .popup-overlay {
  background: var(--hover-bg);
  backdrop-filter: blur(3px);
  /*animation: none !important;*/
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;

  z-index: 10000;
}

#app .popup {
  background: hsla(0, 0%, 100%, 0.7);
  text-align: center;

  width: 22rem;
}

#app .card-action {
  background: transparent;
}

#app .popup .card-title {
  margin-top: 0;
  margin-bottom: 1rem;
}
</style>
