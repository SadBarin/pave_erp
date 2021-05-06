<template>
  <div class="customer-navigation">
    <AppButtonIcon icon="domain" size="1.8rem"
                   title="Подразделения"
                   @button-click="$router.push({name : 'customerSubdivisions', params: {id: customer.id}})"/>

    <AppButtonIcon icon="timeline" size="1.8rem"
                   title="Статистика"
                   v-show="$route.name !== 'customerStatistics'"
                   @button-click="$router.push({name : 'customerStatistics', params: {id: customer.id}})"/>

    <AppButtonIcon icon="remove_red_eye" size="1.8rem"
                   title="Просмотреть"
                   v-show="$route.name !== 'customerAbout'"
                   @button-click="$router.push({name : 'customerAbout', params: {id: customer.id}})"/>

    <AppButtonIcon icon="create" size="1.8rem"
                   title="Редактировать"
                   v-show="$route.name !== 'customerEdit'"
                   @button-click="$router.push({name : 'customerEdit', params: {id: customer.id}})"/>

    <AppButtonIcon icon="av_timer" size="1.8rem"
                   title="Настроить период"
                   v-show="$route.name === 'customerStatistics'"
                   @button-click="$emit('show-period-popup')"/>

    <AppButtonIcon icon="save" size="1.8rem"
                   title="Сохранить и выйти"
                   v-show="$route.name === 'customerEdit'"
                   @button-click="$emit('save-customer')"/>

    <AppButtonIcon icon="business_center" size="1.8rem"
                   title="Вернуться к клиентам"
                   @button-click="$router.push('/customers')"/>
  </div>
</template>

<script>
import AppButtonIcon from '../../AppButtonIcon'

export default {
  name: 'CustomerNavigation',

  components: { AppButtonIcon },

  props: { customer: Object }
}
</script>

<style>
  .customer-navigation {
    margin-left: 2rem;

    display: flex;
  }

  .customer-navigation > * {
    margin-left: 1rem;
  }
</style>
