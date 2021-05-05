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

      <AppTableWrapperRow>
        <template #row-content>
          <th>Название</th>
          <th>Клиент</th>
          <th>Рабочий</th>
          <th>Начало</th>
          <th>Конец</th>
          <th>Заметка</th>
          <th></th>
        </template>
      </AppTableWrapperRow>

      <template v-for="(element) in deals">
        <AppTableWrapperRow :key="element.id"
                            @db-click="$router.push({name : 'dealEdit', params: {id: element.id}})"
                            @on-click="$emit('set-current-deal', element)">
          <template #row-content>
            <td :title="element.name">{{element.name}}</td>

            <td>
              <router-link title="Перейти к клиенту"
                           :to="{name : 'customerAbout', params: {id: element.customer.id}}"
              >
                {{element.customer.name}}
              </router-link>
            </td>

            <td>
              <router-link title="Перейти в календарь рабочего"
                           :to="{name : 'workerCalendar', params: {id: element.worker.id}}"
              >
                {{element.worker.surname}} {{element.worker.name}}
              </router-link>
            </td>

            <td :title="element.dateStart">{{element.dateStart}}</td>
            <td :title="element.dateEnd">{{element.dateEnd}}</td>

            <td v-if="element.notes"
                :title="element.notes[element.notes.length - 1]"
            >
              {{element.notes[element.notes.length - 1]}}
            </td>
            <td v-else>Заметок нет</td>

            <td class="row-action">
              <AppButtonIcon icon="description" title="История сделки" size="1.2rem" @button-click="$router.push({name : 'dealHistory', params: {id: element.id}})"/>
              <AppButtonIcon icon="create" title="Редактировать сделку" size="1.2rem" @button-click="$router.push({name : 'dealEdit', params: {id: element.id}})"/>
              <AppButtonIcon icon="delete" title="Удалить сделки" size="1.2rem" @button-click="popupRemoveToggle(element)"/>
            </td>
          </template>
        </AppTableWrapperRow>
      </template>
    </template>
  </AppTableWrapper>
</template>

<script>
import PopupDeleteWrapper from '../../popups/PopupDeleteWrapper'
import AppTableWrapper from '../../table/AppTableWrapper'
import AppTableWrapperRow from '../../table/AppTableWrapperRow'
import AppButtonIcon from '../../AppButtonIcon'

export default {
  name: 'DealsTable',

  components: {
    PopupDeleteWrapper,
    AppButtonIcon,
    AppTableWrapper,
    AppTableWrapperRow
  },

  data () {
    return {
      popupRemoveHidden: true,
      currentDeal: {}
    }
  },

  props: {
    deals: Object
  },

  methods: {
    popupRemoveToggle (deal) {
      this.popupRemoveHidden = !this.popupRemoveHidden
      this.currentDeal = deal
    }
  }
}
</script>
