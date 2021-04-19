<template>
  <section class="app-table">
    <slot name="table-content"></slot>
  </section>
</template>

<script>
export default {
  name: 'AppTable'
}
</script>

<style scoped>
  .app-table {
    display: flex;
    flex-direction: column;
  }
</style>
