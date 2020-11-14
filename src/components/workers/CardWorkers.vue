<template>
  <div class="row">
    <div class="col s12">
      <div class="card-panel blue darken-1 white-text">
        <div class="card-content dark-text card-line">
          <div class="info-container">
            <h6>Рабочий: Олег Степанович Зубило</h6>
            <h6>Город: Минск</h6>
          </div>
          <div class="button-container">
            <router-link class="btn-flat waves-effect waves-light auth-submit white-text" to="/workers/editor">
              <i class="material-icons">create</i> Редактировать
            </router-link>
            <button class="btn-flat waves-effect waves-light auth-submit white-text">
              <i class="material-icons">delete</i> Удалить
            </button>
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

  .btn-flat {
    margin-left: 10px;
  }

  .button-container {
    display: flex;
    justify-content: end;
  }
</style>
