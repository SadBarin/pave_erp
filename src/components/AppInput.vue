<template>
  <div id="app-container-input">
    <label for="app-input" class="app-input-label">{{label}}</label>

    <input
      id="app-input"
      class="app-input"
      type="text"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'AppInput',

  props: {
    placeholder: String,
    label: String,
    maxLength: String,
    value: String
  }
}
</script>

<style scoped>
  #app-container-input {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #app-container-input .app-input {
    width: 78%;
    padding: 0 0.5rem 0 0.5rem;
    margin: 0;
  }

  #app-container-input .app-input-label {
    font-size: 1rem;

    width: 20%;

    display: block;
  }

  #app-container-input input:focus {
    border-bottom: 1px solid hsla(277, 88%, 36%, 0.5);
    box-shadow: 0 1px 0 0 hsla(277, 88%, 36%, 0.5);
  }
</style>
