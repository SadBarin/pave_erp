<template>
  <AppHistoryWrapper :header='`История изменения заявка "${deal.name}"`' :element="deal">
    <template #nav-buttons>
      <AppButtonIcon icon="create" size="1.8rem" title="Редактировать" @button-click="$router.push({name : 'dealEdit', params: {id: deal.id}})"/>
      <AppButtonIcon icon="attach_money" size="1.8rem" title="Вернуться" @button-click="$router.push('/deals')"/>
    </template>
  </AppHistoryWrapper>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import AppHistoryWrapper from '../../AppHistoryWrapper'
import AppButtonIcon from '../../AppButtonIcon'

export default {
  name: 'DealHistory',

  components: {
    AppHistoryWrapper,
    AppButtonIcon
  },

  data () {
    return {
      deal: ''
    }
  },

  computed: {
    ...mapGetters([
      'deals'
    ])
  },

  created () {
    this.SET_DEALS_FROM_LOCAL_STORAGE()
    this.deal = this.deals[this.$route.params.id]
  },

  methods: {
    ...mapMutations([
      'SET_DEALS_FROM_LOCAL_STORAGE'
    ])
  }
}
</script>
