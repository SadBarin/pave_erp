<template>
  <div class="btns-collection flex-between-center">
    <Popup
      v-if="popupShow"
      @yes="removeWorker(worker.id)"
      @no="popupHidden()"
      :popup-toast="`Рабочий ${worker.surname} ${worker.name} был удалён!`"
    >
      <template #title-popup>
        Удалить?
      </template>

      <template #text-info-popup>
        После нажатие кнопки "да" будет удалён <b>{{worker.surname}} {{worker.name}}</b>!
      </template>
    </Popup>

    <button
      class="btn-transparent transparent blue-text text-darken-1"
      title="Сохранить и выйти"
      @click="$emit('save-worker')"
      v-show="$route.name === 'workerEdit'"
    >
      <i class="material-icons">save</i>
    </button>

    <router-link class="btn-transparent transparent blue-text text-darken-1"
                 title="Просмотреть"
                 :to="{name : 'workerAbout', params: {id: worker.id}}"
                 v-show="$route.name !== 'workerAbout'"
    >
      <i class="material-icons">remove_red_eye</i>
    </router-link>

    <router-link class="btn-transparent transparent blue-text text-darken-1"
                 title="Календарь"
                 :to="{name : 'workerCalendar', params: {id: worker.id}}"
                 v-show="$route.name !== 'workerCalendar'"
    >
      <i class="material-icons">date_range</i>
    </router-link>

    <router-link class="btn-transparent transparent blue-text text-darken-1"
                 title="История редактирования"
                 :to="{name : 'workerHistory', params: {id: worker.id}}"
                 v-show="$route.name !== 'workerHistory'"
    >
      <i class="material-icons">description</i>
    </router-link>

    <router-link class="btn-transparent transparent blue-text text-darken-1"
                 title="Редактировать"
                 :to="{name : 'workerEdit', params: {id: worker.id}}"
                 v-show="$route.name !== 'workerEdit'"
    >
      <i class="material-icons">create</i>
    </router-link>

    <button class="btn-transparent transparent blue-text text-darken-1"
            title="Удалить"
            v-if="!worker.edited"
            @click="popupVisibility(worker)"
    >
      <i class="material-icons">delete</i>
    </button>
  </div>
</template>

<script>
import popupMixin from '@/mixins/popupMixin'
import firebase from 'firebase/app'
import { mapMutations } from 'vuex'

export default {
  name: 'NavWorker',
  mixins: [popupMixin],
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
      this.popupHidden()
    }
  }
}
</script>

<style scoped>
  #app .btns-collection {
    height: 1.5rem !important;
    margin-right: 2rem;
  }

  #app .btns-collection .material-icons{
    font-size: 1.5rem !important;
    margin-left: 0.5rem !important;
  }
</style>
