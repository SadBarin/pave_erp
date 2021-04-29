<template>
  <AppTableWrapper>
    <template #table-content>
      <PopupDeleteWrapper
        :hidePopupStatus="popupRemoveHidden"
        @close-popup="popupRemoveToggle({})"
        @delete-element="$emit('remove-deal', currentDeal.id); popupRemoveToggle({})"
        :header="`Удаление сделки ${currentDeal.name}`"
      >
        <template #popup-delete-content>
          После нажатия на иконку корзины будет удалёна сделка <b>{{currentDeal.name}}</b>
        </template>
      </PopupDeleteWrapper>

      <AppTableRow :columns-count="columnsCount" :columns-size="columnsSize" :columns-array="columnHeaderArray" :row-header="true">
        <template #column-action>
          <AppButtonIcon size="1.2rem"/>
          <AppButtonIcon size="1.2rem"/>
          <AppButtonIcon size="1.2rem"/>
        </template>
      </AppTableRow>

      <template v-for="(element) in deals">
        <AppTableRow :key="element.id" :columns-count="columnsCount" :columns-size="columnsSize"
                     :columns-array="[element.name, element.customer, element.worker, element.date, element.time, element.notes[element.notes.length - 1]]"
                     @dbclickEvent="$router.push({name : 'dealEdit', params: {id: element.id}})"
        >
          <template #row-content>
            <td>
              <p>ОЛЕГ</p>
            </td>
          </template>

          <template #column-action>
            <AppButtonIcon icon="description" title="История сделки" size="1.2rem" @button-click="$router.push({name : 'dealHistory', params: {id: element.id}})"/>
            <AppButtonIcon icon="create" title="Редактировать сделку" size="1.2rem" @button-click="$router.push({name : 'dealEdit', params: {id: element.id}})"/>
            <AppButtonIcon icon="delete" title="Удалить сделки" size="1.2rem" @button-click="popupRemoveToggle(element)"/>
          </template>
        </AppTableRow>
      </template>
    </template>
  </AppTableWrapper>
</template>

<script>
import PopupDeleteWrapper from '../../popups/PopupDeleteWrapper'
import AppTableWrapper from '../../table/AppTableWrapper'
import AppTableRow from '../../table/AppTableRow'
import AppButtonIcon from '../../AppButtonIcon'

export default {
  name: 'DealsTable',

  data () {
    return {
      popupRemoveHidden: true,
      currentDeal: {},

      columnsCount: 6,
      columnsSize: '1fr',
      columnHeaderArray: [
        'Название', 'Заказчик',
        'Рабочий', 'Дата', 'Время',
        'Заметка'
      ]
    }
  },

  props: {
    deals: Object
  },

  components: {
    PopupDeleteWrapper,
    AppButtonIcon,
    AppTableWrapper,
    AppTableRow
  },

  methods: {
    popupRemoveToggle (deal) {
      this.popupRemoveHidden = !this.popupRemoveHidden
      this.currentDeal = deal
    }
  }
}
</script>
