<template>
  <AppTableWrapper>
    <template #table-content>
      <PopupDeleteWrapper
        :hidePopupStatus="popupRemoveHidden"
        @close-popup="popupRemoveToggle({})"
        @delete-element="$emit('remove-worker', worker.id); popupRemoveToggle({})"
        :header="`Удаление рабочего ${worker.surname} ${worker.name}`"
      >
        <template #popup-delete-content>
          После нажатия на иконку корзины будет удалён рабочий <b>{{worker.name}}</b>
        </template>
      </PopupDeleteWrapper>

      <AppTableWrapperRow>
        <template #row-content>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Мед.книжка</th>
          <th>Город</th>
          <th>Телефон</th>
          <th>Профессия</th>
          <th>Заметка</th>
          <th></th>
        </template>
      </AppTableWrapperRow>

      <template v-for="(element) in workers">
        <AppTableWrapperRow :key="element.id"
                            @db-click="$router.push({name : 'workerEdit', params: {id: element.id}})">
          <template #row-content>
            <td :title="element.surname">{{element.surname}}</td>
            <td :title="element.name">{{element.name}}</td>
            <td :title="element.patronymic">{{element.patronymic}}</td>
            <td :title="element.medicalBookStatus">Около {{(element.medicalBookStatus)? element.medicalBookStatus : '0 лет'}}</td>
            <td :title="element.city">{{element.city}}</td>

            <td>
              <a :href="'tel:' + element.mobilePhone"
                 title="Позвонить">
                {{element.mobilePhone}}
              </a>
            </td>

            <td :title="element.professions">{{element.professions}}</td>

            <td v-if="element.notes"
                :title="element.notes[element.notes.length - 1]"
            >
              {{element.notes[element.notes.length - 1]}}
            </td>
            <td v-else>Заметок нет</td>

            <td class="row-action">
              <AppButtonIcon icon="timeline" title="Статистика" size="1.2rem" @button-click="$router.push({name : 'workerStatistics', params: {id: element.id}})"/>
              <AppButtonIcon icon="remove_red_eye" title="Просмотреть" size="1.2rem" @button-click="$router.push({name : 'workerAbout', params: {id: element.id}})"/>
              <AppButtonIcon icon="date_range" title="Календарь" size="1.2rem" @button-click="$router.push({name : 'workerCalendar', params: {id: element.id}})"/>
              <AppButtonIcon icon="description" title="История" size="1.2rem" @button-click="$router.push({name : 'workerHistory', params: {id: element.id}})"/>
              <AppButtonIcon icon="create" title="Редактировать" size="1.2rem" @button-click="$router.push({name : 'workerEdit', params: {id: element.id}})"/>
              <AppButtonIcon icon="delete" title="Удалить" size="1.2rem" @button-click="popupRemoveToggle(element); worker = element"/>
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
  name: 'TableWorkers',

  components: {
    PopupDeleteWrapper,
    AppButtonIcon,
    AppTableWrapper,
    AppTableWrapperRow
  },

  props: { workers: Object },

  data () {
    return {
      worker: '',

      popupRemoveHidden: true
    }
  },

  methods: {
    popupRemoveToggle () {
      this.popupRemoveHidden = !this.popupRemoveHidden
    },

    removeWorker (worker) {
      this.$emit('remove-worker', worker.id)
      this.popupHidden()
    }
  }
}
</script>
