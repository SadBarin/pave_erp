<template>
  <div class="popup-overlay">
    <form class="card auth-card popup">
      <div class="card-content">
        <span class="card-title">{{popupTitle}}<br></span>
      </div>

      <div class="card-action btns-popup">
        <button
          class="btn-flat white-text waves-effect waves-light auth-submit blue darken-2"
          v-on:click.prevent="$emit('yes')"
          v-on:click="callToast"
        >
          <i class="material-icons">check</i> Да
        </button>

        <button
          class="btn-flat white-text waves-effect waves-light auth-submit blue darken-2"
          v-on:click.prevent="$emit('no')"
        >
          <i class="material-icons">clear</i> Нет
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// TODO следует использовать slot
export default {
  name: 'Popup',
  props: ['popupTitle', 'popupToast'],
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
  .popup-overlay {
    background: rgba(33, 31, 31, 0.5);

    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;

    z-index: 1000;
  }

  .popup {
    border-radius: 10px;
    width: 240px !important;

    text-align: center;
  }

  #blue-layout .popup .card-title {
    margin-bottom: 0;
  }

  .popup-subtitle {
    font-size: 1.1rem;
  }

  .btns-popup {
    border-radius: 10px !important;

    display: flex;
    justify-content: space-between;
  }

  .btn-flat {
    border-radius: 10px;
  }
</style>
