<template>
  <div :class="`app-table-row ${(rowHeader)? 'row-header' : 'row-simple'}`"
       :style="{ '--columns-count': columnsCount, '--columns-size': columnsSize }"
  >
    <div v-for="(column, i) in columnsArray" :key="i">
      {{column}}
    </div>

    <div>
      <slot class="column-action" name="column-action"></slot>
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
    padding: 0 0.4rem;

    display: flex;
    align-items: center;
  }

  .row-header {
    font-weight: bold;
  }

  .row-simple:hover {
    background: hsla(208, 82%, 72%, 0.2);
    border-radius: 10px;
  }
</style>
