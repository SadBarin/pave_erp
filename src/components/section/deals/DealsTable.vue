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
        </template>
      </AppTableRow>

      <template v-for="(element) in deals">
        <AppTableRow :key="element.id" :columns-count="columnsCount" :columns-size="columnsSize"
                     :columns-array="[element.name, element.customer, element.worker, element.notes[element.notes.length - 1]]">
          <template #column-action>
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

      columnsCount: 4,
      columnsSize: '1fr',
      columnHeaderArray: [
        'Название', 'Заказчик',
        'Рабочий', 'Заметка',
        ''
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
