<template>
  <AppPopupWrapper :hidden="hidePopupStatus">
    <AppTopPanel :header="header">
      <template #nav-buttons>
        <AppButtonIcon icon="delete" title="Удалить" @button-click="$emit('delete-element')"/>
        <AppButtonIcon icon="close" title="Закрыть" @button-click="$emit('close-popup')"/>
      </template>
    </AppTopPanel>

    <div class="popup-delete-wrapper">
      <p><slot name="popup-delete-content"></slot></p>
    </div>
  </AppPopupWrapper>
</template>

<script>
import AppPopupWrapper from '@/components/popups/AppPopupWrapper'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'

export default {
  name: 'PopupDeleteWrapper',

  components: {
    AppPopupWrapper,
    AppTopPanel,
    AppButtonIcon
  },

  props: {
    hidePopupStatus: Boolean,
    header: String
  }
}
</script>

<style scoped>
  .popup-remove-container > p {
    font-size: 1.1rem !important;

    margin: 0 !important;
  }
</style>
