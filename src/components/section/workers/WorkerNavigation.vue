<template>
  <div class="worker-navigation">
    <AppButtonIcon icon="date_range" size="1.8rem"
                   title="Календарь"
                   v-show="$route.name !== 'workerCalendar'"
                   @button-click="$router.push({name : 'workerCalendar', params: {id: worker.id}})"/>

    <AppButtonIcon icon="description" size="1.8rem"
                   title="История"
                   v-show="$route.name !== 'workerHistory'"
                   @button-click="$router.push({name : 'workerHistory', params: {id: worker.id}})"/>

    <AppButtonIcon icon="remove_red_eye" size="1.8rem"
                   title="Просмотреть"
                   v-show="$route.name !== 'workerAbout'"
                   @button-click="$router.push({name : 'workerAbout', params: {id: worker.id}})"/>

    <AppButtonIcon icon="create" size="1.8rem"
                   title="Редактировать"
                   v-show="$route.name !== 'workerEdit'"
                   @button-click="$router.push({name : 'workerEdit', params: {id: worker.id}})"/>

    <AppButtonIcon icon="save" size="1.8rem"
                   title="Сохранить и выйти"
                   v-show="$route.name === 'workerEdit'"
                   @button-click="$emit('save-worker')"/>

    <AppButtonIcon icon="transfer_within_a_station" size="1.8rem"
                   title="Вернуться к рабочим"
                   @button-click="$router.push('/workers')"/>

    <template>
      <!--  <div class="btns-collection flex-between-center">-->
      <!--    <button-->
      <!--      class="btn-transparent transparent blue-text text-darken-1"-->
      <!--      title="Сохранить и выйти"-->
      <!--      @click="$emit('save-worker')"-->
      <!--      v-show="$route.name === 'workerEdit'"-->
      <!--    >-->
      <!--      <i class="material-icons">save</i>-->
      <!--    </button>-->

      <!--    <router-link class="btn-transparent transparent blue-text text-darken-1"-->
      <!--                 title="Просмотреть"-->
      <!--                 :to="{name : 'workerAbout', params: {id: worker.id}}"-->
      <!--                 v-show="$route.name !== 'workerAbout'"-->
      <!--    >-->
      <!--      <i class="material-icons">remove_red_eye</i>-->
      <!--    </router-link>-->

      <!--    <router-link class="btn-transparent transparent blue-text text-darken-1"-->
      <!--                 title="Календарь"-->
      <!--                 :to="{name : 'workerCalendar', params: {id: worker.id}}"-->
      <!--                 v-show="$route.name !== 'workerCalendar'"-->
      <!--    >-->
      <!--      <i class="material-icons">date_range</i>-->
      <!--    </router-link>-->

      <!--    <router-link class="btn-transparent transparent blue-text text-darken-1"-->
      <!--                 title="История редактирования"-->
      <!--                 :to="{name : 'workerHistory', params: {id: worker.id}}"-->
      <!--                 v-show="$route.name !== 'workerHistory'"-->
      <!--    >-->
      <!--      <i class="material-icons">description</i>-->
      <!--    </router-link>-->

      <!--    <router-link class="btn-transparent transparent blue-text text-darken-1"-->
      <!--                 title="Редактировать"-->
      <!--                 :to="{name : 'workerEdit', params: {id: worker.id}}"-->
      <!--                 v-show="$route.name !== 'workerEdit'"-->
      <!--    >-->
      <!--      <i class="material-icons">create</i>-->
      <!--    </router-link>-->

      <!--    <button class="btn-transparent transparent blue-text text-darken-1"-->
      <!--            title="Удалить"-->
      <!--            v-if="!worker.edited"-->
      <!--            @click="popupVisibility(worker)"-->
      <!--    >-->
      <!--      <i class="material-icons">delete</i>-->
      <!--    </button>-->
      <!--  </div>-->
    </template>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapMutations } from 'vuex'

import AppButtonIcon from '../../AppButtonIcon'

export default {
  name: 'WorkerNavigation',

  components: { AppButtonIcon },

  props: { worker: Object },

  methods: {
    ...mapMutations([
      'SET_WORKERS_FROM_SERVER'
    ]),

    removeWorker (id) {
      firebase.database().ref('/workers/' + id).remove()
        .then(() => {
          this.SET_WORKERS_FROM_SERVER()
          console.log('Рабочий удалён 🗑️')
        })

      this.$router.push('/workers')
    }
  }
}
</script>

<style>
  .worker-navigation {
    margin-left: 2rem;

    display: flex;
  }

  .worker-navigation > * {
    margin-left: 1rem;
  }
</style>
