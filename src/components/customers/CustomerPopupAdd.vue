<template>
  <AppPopupWrapper :hidden="popupHidden">
    <AppTopPanel header="Добавление клиента">
      <template #nav-buttons>
        <AppButtonIcon icon="add" title="Добавить" @button-click="$emit('add-customer', name); name = ''"/>
        <AppButtonIcon icon="close" title="Закрыть окно" @button-click="$emit('popup-toggle')"/>
      </template>
    </AppTopPanel>

    <div class="add-city-container">
      <AppLineText
        class="input-add"
        type="text"
        maxLength="25"
        v-model.trim="name"
        label="Название: "
      />
    </div>
  </AppPopupWrapper>
</template>

<script>
import AppPopupWrapper from '@/components/popups/AppPopupWrapper'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'
import AppLineText from '@/components/AppLineText'

export default {
  name: 'CustomerPopupAdd',

  components: {
    AppPopupWrapper,
    AppTopPanel,
    AppButtonIcon,
    AppLineText
  },

  data () {
    return {
      name: ''
    }
  },

  props: {
    popupHidden: Boolean,
    employees: Object
  }
}
</script>

<style scoped>

</style>
