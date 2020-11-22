<template>
  <div class="popup-overlay">
    <form class="card auth-card popup">
      <div class="card-content">
        <span class="card-title">{{popupTitle}}<br></span>
      </div>

      <div class="card-action btn-popup">
        <button
          class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
          v-on:click.prevent="$emit('yes')"
        >
          <i class="material-icons">check</i> Да
        </button>

        <button
          class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
          v-on:click.prevent="$emit('no')"
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
  props: ['popupTitle']
}
</script>

<style scoped>

</style>
