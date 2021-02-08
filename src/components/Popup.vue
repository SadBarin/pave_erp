<template>
  <div class="popup-overlay">
    <form class="card auth-card popup">
      <div class="card-content flex-column-center">
        <h4 class="card-title">
          <slot name="title-popup"></slot>
        </h4>
          <p>
            <slot name="text-info-popup"></slot>
          </p>
      </div>

      <div class="card-action btns-popup">
        <button
          class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
          @click.prevent="$emit('yes'); callToast()"
        >
          <i class="material-icons">check</i> Да
        </button>

        <button
          class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
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
  props: ['popupToast'],
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
    width: 18rem !important;

    text-align: center;
  }

  .popup .card-title {
    margin-top: 0 !important;
    margin-bottom: 1rem !important;
  }

  .card-action {
    padding-top: 0 !important;
  }

  .btns-popup {
    border-radius: 10px !important;

    display: flex;
    justify-content: space-between;
  }

  .btn-flat {
    border-radius: 10px;
  }

  .btn-flat:first-child {
    margin-right: 1rem;
  }
</style>
