<template>
  <section class="app-table">
    <table>
      <slot name="table-content"></slot>
    </table>
  </section>
</template>

<script>
export default {
  name: 'AppTable'
}
</script>

<style scoped>
  .app-table {
    width: fit-content;
  }
</style>
