<template>
  <div class="app-button-container">
    <button
      v-if="!pressed"
      class="app-button"
      @click="$emit('button-click')"
      :title="title"
    >
      <i class="material-icons app-button-icon" :style="'font-size: ' + size + ' !important'">{{icon}}</i>
    </button>

    <div
      v-else
      class="app-button pressed"
      :title="title"
    >
      <i class="material-icons app-button-icon" :style="'font-size: ' + size + ' !important'">{{icon}}</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppButtonIcon',

  props: {
    icon: String,
    size: String,
    title: String,
    pressed: Boolean
  }
}
</script>

<style scoped>
  .app-button-container {
    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .app-button {
    background: transparent;
    border: none;

    width: fit-content;
    height: 2rem;
    padding: 0;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    user-select: none;
  }

  .app-button-icon {
    color: hsl(208, 79%, 51%);
    font-size: 2rem !important;
    margin: 0 !important;
  }

  .pressed {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pressed .app-button-icon {
    color: hsla(277, 88%, 36%, 0.5);
    cursor: default;
  }

  .pressed .app-button-icon:hover {
    color: hsla(277, 88%, 36%, 0.5) !important;
  }
</style>
