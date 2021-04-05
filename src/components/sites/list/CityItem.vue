<template>
  <div>
    <Popup
      v-if="popupShow"
      @yes="removeCity(city)"
      @no="popupHidden"
      :popup-toast="`Город ${city.name} был удалён!`"
    >
      <template #title-popup>
        Удалить?
      </template>

      <template #text-info-popup>
        После нажатия кнопки "да" будет удалён город <b>{{city.name}}</b>
      </template>
    </Popup>

      <div class="city-item">
        <AppHeaderIcon header-level="6" material-icon="location_city" :header-text="city.name"/>

        <div class="city-item-nav-buttons">
          <AppButtonIcon size="1.3rem" icon="create" title="Редактировать" @button-click="$router.push({name : 'cityEdit', params: {id: city.id}})"/>
          <AppButtonIcon size="1.3rem" icon="delete" title="Удалить" @button-click="popupVisibility"/>
        </div>
    </div>
  </div>
</template>

<script>
import popupMixin from '@/mixins/popupMixin'
import AppHeaderIcon from '@/components/AppHeaderIcon'
import AppButtonIcon from '@/components/AppButtonIcon'

export default {
  name: 'CardSites',

  mixins: [popupMixin],

  components: { AppHeaderIcon, AppButtonIcon },

  props: { city: Object },

  methods: {
    removeCity (city) {
      this.popupHidden()
      this.$emit('remove-city', city.id)
    }
  }
}
</script>

<style scoped>
  .city-item {
    width: 100%;
    padding: 0 0.6rem;

    transition: 0.1s ease;
  }

  .city-item:hover {
    background: hsla(208, 82%, 72%, 0.2);
    border-radius: 10px;
  }

  .city-item,
  .city-item .city-item-nav-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
