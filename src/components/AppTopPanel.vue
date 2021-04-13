<template>
  <div id="app-top-panel">
    <h3 class="top-panel-header">{{header}}</h3>

    <div class="top-panel-nav-buttons">
      <slot name="nav-buttons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTopPanel',

  props: {
    header: String
  }
}
</script>

<style scoped>
  #app-top-panel {
    margin: 1rem 0 2.8rem 0;

    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  #app-top-panel .top-panel-header {
    margin: 0 2rem 0 0;
  }

  #app-top-panel .top-panel-nav-buttons {
    margin-left: 2rem;

    display: flex;
  }

  #app-top-panel .top-panel-nav-buttons > * {
    margin-left: 1rem;
  }
</style>
