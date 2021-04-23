<template>
  <div :class="`app-table-row ${(rowHeader)? 'row-header' : 'row-simple'}`"
       :style="{ '--columns-count': columnsCount, '--columns-size': columnsSize }"
  >
    <div class="row-info">
      <div v-for="(column, i) in columnsArray" :key="i">
        {{column}}
      </div>
    </div>

    <div class="row-action">
      <div class="column-action">
        <slot name="column-action"></slot>
      </div>
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
    display: flex;
  }

  .app-table-row .row-info{
    width: 100%;

    display: grid;
    grid-template-columns: repeat(var(--columns-count), var(--columns-size));
  }

  .app-table-row .row-info > div {
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
    width: fit-content;
    display: flex;
  }

  .app-table-row .row-action {
    padding-left: 2rem;
  }
</style>
