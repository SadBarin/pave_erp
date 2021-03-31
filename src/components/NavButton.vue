<template>
  <div class="app-button-container">
    <button
      v-if="!clickStatus"
      class="app-button"
      @click="buttonClick"
      :title="title"
    >
      <i class="material-icons app-button-icon">{{materialIcon}}</i>
    </button>

    <div
      v-else
      class="app-button pressed"
      :title="titlePressed"
    >
      <i class="material-icons app-button-icon">{{materialIcon}}</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appButton',

  data () {
    return {
      clickStatus: false
    }
  },

  props: {
    title: String,
    titlePressed: String,
    materialIcon: String
  },

  methods: {
    buttonClick () {
      this.$emit('button-click')
      this.clickStatus = !this.clickStatus
    }
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
    height: 1.8rem;
    padding: 0;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    user-select: none;
  }

  .app-button-icon {
    color: hsl(208, 79%, 51%);
    font-size: 1.8rem !important;
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
