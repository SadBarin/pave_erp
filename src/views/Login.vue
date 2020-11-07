<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Вход в систему</span>

      <div class="input-field input-field-blue">
        <input type="text" id="email">
        <label for="email">Почта</label>
      </div>

      <div class="input-field" id="input-field-blue">
        <input type="password" id="password" class="validate">
        <label for="password">Пароль</label>
      </div>
    </div>

    <div class="card-action">
      <button type="submit"
              class="btn waves-effect waves-light auth-submit blue darken-1"
      >
        Войти
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>

</style>
