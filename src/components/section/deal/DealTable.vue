<template>
  <AppTableWrapper>
    <template #table-content>
      <AppTableRow :columns-count="columnsCount" :columns-size="columnsSize"
                   :columns-array="columnHeaderArray" :row-header="true"/>
      <AppTableRow :columns-count="columnsCount" :columns-size="columnsSize"
                   :columns-array="empty"/>
      <AppTableRow :columns-count="columnsCount" :columns-size="columnsSize"
                   :columns-array="empty"/>
      <AppTableRow :columns-count="columnsCount" :columns-size="columnsSize"
                   :columns-array="empty"/>
      <AppTableRow :columns-count="columnsCount" :columns-size="columnsSize"
                   :columns-array="empty"/>
      <AppTableRow :columns-count="columnsCount" :columns-size="columnsSize"
                   :columns-array="empty"/>
      <AppTableRow :columns-count="columnsCount" :columns-size="columnsSize"
                   :columns-array="empty"/>
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
      ],
      empty: [
        'Работа для грузчика', 'Майкрасофтен ин корпар',
        'Олег Петров', 'Прибыть ровно в 5'
      ]
    }
  },

  components: {
    AppTableWrapper, AppTableRow
  }
}
</script>
