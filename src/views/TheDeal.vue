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

    <div class="app-deal-content">
      <DealTable/>
    </div>
  </div>
</template>

<script>
import AppTopPanel from '../components/AppTopPanel'
import AppButtonIcon from '../components/AppButtonIcon'
import DealPopupAdd from '../components/section/deal/DealPopupAdd'
import DealTable from '../components/section/deal/DealTable'

export default {
  name: 'TheDeal',

  components: {
    AppTopPanel,
    AppButtonIcon,
    DealPopupAdd,
    DealTable
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
