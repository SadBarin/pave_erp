<template>
  <AppPopupWrapper :hidden="hidden">
    <AppTopPanel :header="header">
      <template #nav-buttons>
        <AppButtonIcon icon="add" title="Добавить" @button-click="$emit('popup-add')"/>
        <AppButtonIcon icon="close" title="Закрыть" @button-click="$emit('popup-close')"/>
      </template>
    </AppTopPanel>

    <div class="popup-add-wrapper">
      <slot name="popup-add-content"></slot>
    </div>
  </AppPopupWrapper>
</template>

<script>
import AppPopupWrapper from './AppPopupWrapper'
import AppTopPanel from './AppTopPanel'
import AppButtonIcon from './AppButtonIcon'

export default {
  name: 'PopupAddWrapper',

  components: {
    AppPopupWrapper,
    AppTopPanel,
    AppButtonIcon
  },

  props: {
    hidden: Boolean,
    header: String
  }
}
</script>
