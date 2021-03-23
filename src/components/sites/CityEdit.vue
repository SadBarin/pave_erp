<template>
  <div>
    <Popup
      v-if="popupShow"
      @yes="editorExit"
      @no="popupHidden"
    >
      <template #title-popup>
        Покинуть редактор города?
      </template>

      <template #text-info-popup>
        Введённые данные не будут сохранены!
      </template>
    </Popup>

    <div class="page-title flex-between-center">
      <h3>Редактор города "{{ editedCity.name }}"</h3>

      <div class="editor-btns">
        <button
          class="btn editor-btn btn-hover blue darken-1"
          @click="saveEditedCity(editedCity)"
        >
          <i class="material-icons">exit_to_app</i> Сохранить и выйти
        </button>

        <button
          class="btn editor-btn btn-hover blue darken-1"
          @click.prevent="popupVisibility"
        >
          <i class="material-icons">location_city</i>К Городам
        </button>
      </div>
    </div>

    <section class="flex-column-center">
      <h4>Общие настройки</h4>

      <div class="edit-container">
        <AppInput
          label="Название города"
          maxLength="10"
          v-model="editedCity.name"
        />
      </div>
    </section>
  </div>
</template>

<script>
import popupMixin from '@/mixins/popupMixin'
import firebase from 'firebase/app'
import { mapGetters, mapMutations } from 'vuex'
import AppInput from '@/components/AppInput'

export default {
  name: 'Sites',
  components: { AppInput },
  mixins: [popupMixin],
  data () {
    return {
      editedCity: ''
    }
  },
  computed: {
    ...mapGetters([
      'sites'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_SITES_FROM_SERVER',
      'SET_SITES_FROM_LOCAL_STORAGE'
    ]),

    editorExit () {
      this.$router.push('/sites')
    },

    saveEditedCity (city) {
      firebase.database().ref('/sites/' + city.id).set(city)
        .then(() => {
          this.SET_SITES_FROM_SERVER()
          this.editorExit()
        })
    }
  },
  mounted () {
    this.SET_SITES_FROM_LOCAL_STORAGE()
    this.editedCity = this.sites[this.$route.params.id]
  }
}
</script>

<style scoped>
.edit-container {
  width: 70%;
}
</style>
