<template>
  <AppTableWrapper>
    <template #table-content>
      <AppTableRow :columns-count="columnsCount" :columns-size="columnsSize"
                   :columns-array="columnHeaderArray" :row-header="true"/>

      <template v-for="(element) in deals">
        <AppTableRow :key="element.id" :columns-count="columnsCount" :columns-size="columnsSize"
                     :columns-array="[element.name, element.customer, element.worker, element.notes[0]]"/>
      </template>
    </template>
  </AppTableWrapper>
</template>

<script>
import AppTableWrapper from '../../table/AppTableWrapper'
import AppTableRow from '../../table/AppTableRow'

export default {
  name: 'DealTable',

  data () {
    return {
      columnsCount: 5,
      columnsSize: '15rem',
      columnHeaderArray: [
        'Название', 'Заказчик',
        'Рабочий', 'Заметка',
        'Действия'
      ]
    }
  },

  props: {
    deals: Object
  },

  components: {
    AppTableWrapper, AppTableRow
  }
}
</script>
