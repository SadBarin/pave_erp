<template>
  <PopupAddWrapper
    :hidden="popupHidden"
    header="Добавление клиента"
    @popup-add="$emit('add-customer', name); name = ''"
    @popup-close="$emit('popup-toggle')"
  >
    <template #popup-add-content>
      <AppLineText
        class="input-add"
        type="text"
        maxLength="25"
        v-model.trim="name"
        label="Название: "
      />
    </template>
  </PopupAddWrapper>
</template>

<script>
import PopupAddWrapper from '../../popups/PopupAddWrapper'
import AppLineText from '../../AppLineText'

export default {
  name: 'CustomerPopupAdd',

  components: {
    PopupAddWrapper,
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
