<template>
  <div id="app-deal">
    <DealPopupAdd
      :popupHidden="popupAddDeal"
      @popup-toggle="popupAddToggle"
    />

    <AppTopPanel header="Список сделок">
      <template #nav-buttons>
        <AppButtonIcon icon="autorenew" title="Обновить сделки"/>
        <AppButtonIcon icon="add" title="Добавить сделки" @button-click="popupAddToggle()"/>
      </template>
    </AppTopPanel>
  </div>
</template>

<script>
import DealPopupAdd from '@/components/deal/DealPopupAdd'
import AppTopPanel from '@/components/AppTopPanel'
import AppButtonIcon from '@/components/AppButtonIcon'

export default {
  name: 'TheDeal',

  components: {
    DealPopupAdd,
    AppTopPanel,
    AppButtonIcon
  },

  data () {
    return {
      popupAddDeal: true
    }
  },

  methods: {
    popupAddToggle () {
      this.popupAddDeal = !this.popupAddDeal
    }
  }
}
</script>
