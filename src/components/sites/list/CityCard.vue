<template>
  <div class="row">
    <Popup
      v-if="popupShow"
      @yes="removeCity(city)"
      @no="popupHidden"
      :popup-toast="`Город ${city.name} был удалён!`"
    >
      <template #title-popup>
        Удалить?
      </template>

      <template #text-info-popup>
        После нажатия кнопки "да" будет удалён город <b>{{city.name}}</b>
      </template>
    </Popup>

    <div class="col s12">
      <div class="card-panel grey-text text-darken-3">
        <div class="card-content card-line">
          <div class="info-container">
            <h6><i class="material-icons">location_city</i> Город: {{city.name}}</h6>
            <p class="card-report"
               v-if="city.edited"
            >
              <i class="material-icons">report</i> Карточка сейчас редактируется другим сотрудником
            </p>
          </div>
          <div class="flex-center btns-collection">
            <router-link class="btn-transparent transparent blue-text text-darken-1"
                    title="Редактировать" :to="{name : 'cityEdit', params: {id: city.id}}"
            >
              <i class="material-icons">create</i>
            </router-link>

            <button class="btn-transparent transparent blue-text text-darken-1"
                    title="Удалить"
                    v-if="!city.edited"
                    @click="popupVisibility"
            >
              <i class="material-icons">delete</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import popupMixin from '@/mixins/popupMixin'

export default {
  name: 'CardSites',
  mixins: [popupMixin],
  props: { city: Object },
  methods: {
    removeCity (city) {
      this.popupHidden()
      this.$emit('remove-city', city.id)
    }
  }
}
</script>

<style scoped>
  #app .card-panel {
    padding: 0.1rem 0.3rem;
  }

  #app .card-panel:hover {
    background: var(--hover-bg);
  }

  .row .col {
    padding: 0;
  }

  .card-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .info-container {
    width: 50%;
  }

  h6, .card-report {
    display: flex;
    align-items: center;
  }

  h6 .material-icons,
  .card-report .material-icons {
    margin-right: 10px;
  }

  .card-report {
    margin: 20px 0 0;
  }
</style>
