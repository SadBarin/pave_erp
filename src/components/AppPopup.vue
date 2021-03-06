<template>
  <div class="popup-overlay flex-center">
    <form class="card auth-card popup">
      <div class="card-content flex-column-center">
        <h4 class="card-title">
          <slot name="title-popup"></slot>
        </h4>
        <p>
          <slot name="text-info-popup"></slot>
        </p>
      </div>

      <div class="card-action btns-popup flex-between-center">
        <button
          class="btn-flat right-margin-little white-text btn-hover blue darken-1"
          @click.prevent="$emit('yes'); callToast()"
        >
          <i class="material-icons">check</i> Да
        </button>

        <button
          class="btn-flat white-text waves-effect btn-hover blue darken-1"
          @click.prevent="$emit('no')"
        >
          <i class="material-icons">clear</i> Нет
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: { popupToast: String },
  methods: {
    callToast () {
      if (this.popupToast) {
        // eslint-disable-next-line no-undef
        M.toast({ html: this.popupToast })
      }
    }
  }
}
</script>

<style scoped>
  #app .popup-overlay {
    background: var(--hover-bg);
    backdrop-filter: blur(3px);
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
