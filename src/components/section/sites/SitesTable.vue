<template>
  <AppTableWrapper>
    <template #table-content>
      <PopupDeleteWrapper
        :hidePopupStatus="popupRemoveHidden"
        @close-popup="popupRemoveToggle({})"
        @delete-element="$emit('remove-city', city.id); popupRemoveToggle({})"
        :header="`Удаление города ${city.name}`"
      >
        <template #popup-delete-content>
          После нажатия на иконку корзины будет удалён город <b>{{city.name}}</b>
        </template>
      </PopupDeleteWrapper>

      <AppTableWrapperRow>
        <template #row-content>
          <th>Название</th>
          <th>Заметка</th>
          <th></th>
        </template>
      </AppTableWrapperRow>

      <template v-for="(element) in sites">
        <AppTableWrapperRow :key="element.id"
                            @db-click="$router.push({name : 'cityEdit', params: {id: element.id}})">
          <template #row-content>
            <td :title="element.name">{{element.name}}</td>

            <td v-if="element.notes"
                :title="element.notes[element.notes.length - 1]"
            >
              {{element.notes[element.notes.length - 1]}}
            </td>
            <td v-else>Заметок нет</td>

            <td class="row-action">
              <AppButtonIcon icon="create" title="Редактировать" size="1.2rem" @button-click="$router.push({name : 'cityEdit', params: {id: element.id}})"/>
              <AppButtonIcon icon="delete" title="Удалить" size="1.2rem" @button-click="popupRemoveToggle(element); city = element"/>
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
  name: 'SitesTable',

  components: {
    PopupDeleteWrapper,
    AppButtonIcon,
    AppTableWrapper,
    AppTableWrapperRow
  },

  data () {
    return {
      popupRemoveHidden: true,
      city: {}
    }
  },

  props: {
    sites: Object
  },

  methods: {
    popupRemoveToggle () {
      this.popupRemoveHidden = !this.popupRemoveHidden
    }
  }
}
</script>
