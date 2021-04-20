<template>
  <AppTableWrapper>
    <template #table-content>
      <AppTableRow :columns-count="columnsCount" :columns-size="columnsSize"
                   :columns-array="columnHeaderArray" :row-header="true"/>

      <template v-for="(element) in deals">
        <AppTableRow :key="element.id" :columns-count="columnsCount" :columns-size="columnsSize"
                     :columns-array="[element.name, element.customer, element.worker, element.notes[0]]">
          <template #column-action>
            <AppButtonIcon icon="delete" title="Удалить сделки" size="1rem" @button-click="$emit('remove-deal', element.id)"/>
          </template>
        </AppTableRow>
      </template>
    </template>
  </AppTableWrapper>
</template>

<script>
import AppTableWrapper from '../../table/AppTableWrapper'
import AppTableRow from '../../table/AppTableRow'
import AppButtonIcon from '../../AppButtonIcon'

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
    AppButtonIcon,
    AppTableWrapper,
    AppTableRow
  }
}
</script>
