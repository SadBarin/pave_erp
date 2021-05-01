<template>
  <tr class="app-table-row" @dblclick="$emit('db-click')" @click="$emit('on-click')">
    <slot name="row-content"></slot>
  </tr>
</template>

<script>
export default {
  name: 'AppTableWrapperRow'
}
</script>

<style scoped>
  .app-table-row {
    border-radius: 0 !important;
  }

  .app-table-row:hover{
    background: transparent !important;
  }

  .app-table-row:hover > td {
    background: transparent !important;
    color: hsla(277, 88%, 36%, 0.6)
  }

  .app-table-row th {
    padding-bottom: 1.4rem !important;
  }

  .app-table-row td {
    padding: 0 0 1rem 0.1rem !important;
  }

  .app-table-row th,
  .app-table-row td {
    text-align: start !important;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1rem;
    line-height: 1rem;

    max-width: 14rem;
    width: fit-content;
    height: fit-content;

    overflow: hidden;
  }

  .app-table-row th:not(:last-child),
  .app-table-row td:not(:last-child){
    padding-right: 3rem !important;
  }

  .app-table-row .row-action {
    width: fit-content;
    padding: 0 !important;

    display: flex;
    align-items: center;
  }

  .app-table-row .row-action > *:not(:last-child) {
    padding-right: 0.3rem;
  }

  .app-table-row td.table-row-checkbox {
    margin-top: -0.6rem !important;
    padding:0 0.4rem 0 0.6rem !important;

    display: inline-block;
  }

  .app-table-row th.table-row-checkbox {
    display: none !important;
  }

  .app-table-row td.table-row-checkbox [type="checkbox"]:checked+span:not(.lever):before {
    border-right: 2px solid hsla(277, 88%, 36%, 0.6);
    border-bottom: 2px solid hsla(277, 88%, 36%, 0.6);
  }
</style>
