<template>
  <section class="app-table">
    <table>
      <slot name="table-content"></slot>
    </table>
  </section>

<!--  <section class="app-table">-->
<!--    <slot name="table-content"></slot>-->
<!--  </section>-->
</template>

<script>
export default {
  name: 'AppTable'
}
</script>

<style scoped>
  .app-table {
    width: fit-content;
    /*display: flex;*/
    /*flex-direction: column;*/

    /*margin-left: -0.4rem;*/
  }
</style>
