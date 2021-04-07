<template>
  <AppPopupWrapper :hidden="popupHidden">
    <AppTopPanel :header="header">
      <template #nav-buttons>
        <AppButtonIcon icon="delete" title="Удалить" @button-click="$emit('delete')"/>
        <AppButtonIcon icon="close" title="Закрыть окно" @button-click="$emit('close')"/>
      </template>
    </AppTopPanel>

    <div class="popup-remove-container">
      <p><slot name="popup-content"></slot></p>
    </div>
  </AppPopupWrapper>
</template>

<script>
import AppPopupWrapper from '@/components/AppPopupWrapper'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'

export default {
  name: 'PopupRemove',

  components: { AppPopupWrapper, AppTopPanel, AppButtonIcon },

  props: { popupHidden: Boolean, header: String }
}
</script>

<style scoped>
  .popup-remove-container > p {
    font-size: 1.1rem !important;

    margin: 0 !important;
  }
</style>
