<template>
  <tr :class="`app-table-row ${(rowHeader)? 'row-header' : 'row-simple'}`" @dblclick="$emit('dbclickEvent')">
    <td v-for="(column, i) in columnsArray" :key="i" class="row-element">
      {{column}}
    </td>

    <slot name="row-content"/>

    <td class="row-action">
      <slot name="column-action"/>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'AppTableRow',

  props: {
    columnsArray: Array,
    rowHeader: Boolean
  }
}
</script>

<style scoped>
  .row-header {
    font-weight: bold;
  }

  .row-header:hover {
    background: transparent !important;
  }

  .row-simple:hover {
    background: transparent !important;
    color: hsla(277, 88%, 36%, 0.6)
  }

  .row-element {
    text-align: start !important;

    width: fit-content;
    height: fit-content;
  }

  .row-element:not(:last-child) {
    padding-right: 3rem !important;
  }

  .row-action {
    width: fit-content;
    display: flex;
  }

  .row-action > *:not(:last-child) {
    padding-right: 0.3rem;
  }
</style>
