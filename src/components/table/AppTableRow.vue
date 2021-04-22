<template>
  <div :class="`app-table-row ${(rowHeader)? 'row-header' : 'row-simple'}`"
       :style="{ '--columns-count': columnsCount, '--columns-size': columnsSize }"
  >
    <div v-for="(column, i) in columnsArray" :key="i">
      {{column}}
    </div>

    <div class="column-action">
      <slot name="column-action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTableRow',

  props: {
    columnsCount: Number,
    columnsSize: String,
    columnsArray: Array,
    rowHeader: Boolean
  }
}
</script>

<style scoped>
  .app-table-row {
    display: grid;
    grid-template-columns: repeat(var(--columns-count), var(--columns-size));
  }

  .app-table-row > div {
    line-height: 1rem;

    padding: 0 0.4rem 0.3rem 0.4rem;

    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .row-header {
    font-weight: bold;
  }

  .row-simple:hover {
    color: hsla(277, 88%, 36%, 0.6)
  }

  .app-table-row .column-action {
    padding-left: 2rem;
  }
</style>
