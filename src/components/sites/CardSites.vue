<template>
  <div class="row">
    <div class="col s12">
      <div class="card-panel blue accent-1">
        <div class="card-content dark-text card-line">
          <div class="info-container">
            <h6>Город: {{city.cityName}}</h6>
          </div>
          <div class="button-container">
            <router-link class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" to="/sites/editor">Редактировать</router-link>
            <button class="btn-flat waves-effect waves-light auth-submit red darken-1 white-text"
                    v-on:click="$emit('remove-city', city.id)"
            >Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSites',
  props: {
    city: {
      type: Object,
      required: true
    },
    index: Number
  }
}
</script>

<style scoped>
  .card-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .info-container {
    width: 50%;
  }

  .btn-flat {
    margin-left: 10px;
  }

  .button-container {
    display: flex;
    justify-content: end;
  }
</style>
