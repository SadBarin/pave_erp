<template>
  <AppPopupWrapper :hidden="popupHidden">
    <AppTopPanel header="Добавление сделки">
      <template #nav-buttons>
        <AppButtonIcon icon="add" title="Добавить город"/>
        <AppButtonIcon icon="close" title="Закрыть окно" @button-click="$emit('popup-toggle')"/>
      </template>
    </AppTopPanel>

    <div class="add-city-container">
      <AppLineText
        inputID="input-deal-name"
        label="Название: "
        maxLength="20"
        v-model="name"
      />

      <AppLineText
        inputID="input-deal-customer"
        label="Заказчик: "
        maxLength="20"
      />
      <AppLineText
        inputID="input-deal-worker"
        label="Рабочий: "
        maxLength="20"
      />

      <AppLineText
        inputID="input-deal-note"
        label="Заметка: "
        maxLength="30"
        v-model="note"
      />
    </div>
  </AppPopupWrapper>
</template>

<script>
import AppPopupWrapper from '@/components/AppPopupWrapper'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'
import AppLineText from '@/components/AppLineText'

export default {
  name: 'DealPopupAdd',

  data () {
    return {
      name: 'Сделка',
      note: 'Сделка создана'
    }
  },

  components: {
    AppPopupWrapper,
    AppTopPanel,
    AppButtonIcon,
    AppLineText
  },

  props: { popupHidden: Boolean }
}
</script>

<style scoped>

</style>
