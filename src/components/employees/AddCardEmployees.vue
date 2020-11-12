<template>
  <form @submit.prevent="onSubmit" class="button-container" >
    <div class="input-field input-field-blue">
      <input type="text" id="name" v-model="name">
      <label for="name">Имя</label>
    </div>

    <button class="btn-flat waves-effect waves-light auth-submit blue darken-1 white-text" type="submit">Добавить сотрудника</button>
  </form>
</template>

<script>
export default {
  name: 'AddCardEmployees',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.name.trim()) {
        const newEmployee = {
          id: Date.now(),
          name: this.name,
          city: 'Москва'
        }

        this.$emit('add-employee', newEmployee)
        this.name = ''
      }
    }
  }
}
</script>

<style scoped>
.button-container {
  display: flex;
  align-items: center;
}

.button-container .input-field {
  margin-right: 30px;
}
</style>
