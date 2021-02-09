<template>
  <div class="row">
    <transition name="bounce">
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
    </transition>

    <div class="col s12">
      <div class="card-panel blue darken-1 white-text">
        <div class="card-content dark-text card-line">
          <div class="info-container">
            <h6><i class="material-icons">location_city</i> Город: {{city.name}}</h6>
            <p class="card-report"
               v-if="city.edited"
            >
              <i class="material-icons">report</i> Карточка сейчас редактируется другим сотрудником
            </p>
          </div>
          <div class="flex-center">
            <router-link class="btn-floating transparent darken-2 waves-effect waves-light auth-submit white-text"
                    title="Редактировать" :to="{name : 'cityEdit', params: {id: city.id}}"
            >
              <i class="material-icons">create</i>
            </router-link>

            <button class="btn-floating transparent darken-2 waves-effect waves-light auth-submit white-text"
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
  props: ['city'],
  methods: {
    removeCity (city) {
      this.popupHidden()
      this.$emit('remove-city', city.id)
    }
  }
}
</script>

<style scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
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
