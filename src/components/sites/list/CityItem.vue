<template>
  <div>
    <PopupDeleteWrapper
      :hidePopupStatus="popupRemoveHidden"
      @close-popup="popupRemoveToggle"
      @delete-element="removeCity(city)"
      :header="`Удаление города ${city.name}`"
    >
      <template #popup-delete-content>
        После нажатия на иконку корзины будет удалён город <b>{{city.name}}</b>
      </template>
    </PopupDeleteWrapper>

      <div class="city-item">
        <AppHeaderIcon header-level="6" material-icon="location_city" :header-text="city.name"/>

        <div class="city-item-nav-buttons">
          <AppButtonIcon size="1.3rem" icon="create" title="Редактировать" @button-click="$router.push({name : 'cityEdit', params: {id: city.id}})"/>
          <AppButtonIcon size="1.3rem" icon="delete" title="Удалить" @button-click="popupRemoveToggle"/>
        </div>
    </div>
  </div>
</template>

<script>
import PopupDeleteWrapper from '../../popups/PopupDeleteWrapper'
import AppHeaderIcon from '@/components/AppHeaderIcon'
import AppButtonIcon from '@/components/AppButtonIcon'

export default {
  name: 'CardSites',

  components: {
    PopupDeleteWrapper,
    AppHeaderIcon,
    AppButtonIcon
  },

  props: { city: Object },

  data () {
    return {
      popupRemoveHidden: true
    }
  },

  methods: {
    popupRemoveToggle () {
      this.popupRemoveHidden = !this.popupRemoveHidden
    },

    removeCity (city) {
      this.popupRemoveToggle()
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
