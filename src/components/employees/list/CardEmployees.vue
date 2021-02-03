<template>
  <div class="row">
    <Popup
      v-if="popupShow"
      @yes="$emit('remove-employee', employee.id)"
      @no="popupHidden"
      :popup-toast="`${employee.surname} ${employee.name} ${(employee.sex === 'Женский')? ' была удалена' : ' был удалён!'}`"
    >
      <template #title-popup>
        Удалить?
      </template>

      <template #text-info-popup>
        {{employee.sex | sexMsgDelete }} <b>{{employee.surname}} {{employee.name}}</b>
      </template>
    </Popup>

    <div class="col s12">
      <div class="card-panel blue darken-1 white-text">
        <div class="card-content dark-text flex-between-center">
          <div class="info-container">
            <h6><i class="material-icons">email</i> Почта: {{employee.email}}</h6>
            <h6><i class="material-icons">person</i> Сотрудник: {{employee.surname}} {{employee.name}}</h6>
            <h6><i class="material-icons">location_city</i> Город: {{employee.city}}</h6>
            <p v-if="employee.edited" class="card-report">
              <i class="material-icons">report</i> Карточка сейчас редактируется другим сотрудником
            </p>
          </div>

          <div class="flex-center">
            <router-link class="btn-floating transparent darken-1 waves-effect waves-light auth-submit white-text"
                    title="Редактировать" :to="{name : 'employeeEdit', params: {id: employee.id}}"
            >
              <i class="material-icons">create</i>
            </router-link>

            <button class="btn-floating transparent darken-1 waves-effect waves-light auth-submit white-text"
                    title="Удалить"
                    v-if="!employee.edited"
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
  name: 'CardEmployees',
  mixins: [popupMixin],
  props: ['employee']
}
</script>

<style scoped>
.info-container {
  width: 60%;
}

#app h6 {
  margin: 0px;
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
