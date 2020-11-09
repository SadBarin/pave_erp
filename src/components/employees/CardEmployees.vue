<template>
  <div class="row">
    <div class="col s12">
      <div class="card-panel blue accent-1">
        <div class="card-content dark-text card-line">
          <div class="info-container">
            <h6>Сотрудник: Алексей Иванович Дзен</h6>
            <h6>Город: Магадан</h6>
          </div>
          <div class="button-container">
            <router-link class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" to="/employees/editor">Редактировать</router-link>
            <button class="btn-flat waves-effect waves-light auth-submit red darken-1 white-text">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSites'
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
    width: 28%;
  }

  .button-container {
    width: 22%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .btn {
    margin-left: 10px;
  }
</style>
