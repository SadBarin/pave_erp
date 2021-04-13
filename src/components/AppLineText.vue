<template>
  <div id="container-line-text">
    <input
      class="line-text"
      type="text"

      :maxlength="maxLength"
      :id='inputID'
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >

    <label :for="inputID" class="line-text-label">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'AppInput',

  props: {
    inputID: String,
    placeholder: String,
    maxLength: String,
    label: String,
    value: String
  }
}
</script>

<style scoped>
  #container-line-text {
    width: 100%;

    display: flex;
    align-items: center;
  }

  #container-line-text .line-text {
    border: none;
    color: #808080;
    font-size: 1.1rem !important;

    max-width: 65%;
    width: fit-content;
    height: fit-content;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    margin-bottom: 0;

    order: 1
  }
  #container-line-text .line-text::placeholder{
    border: none;
    color: #c9c9c9;
    font-size: 1.1rem !important;

    padding: 0;
  }

  #container-line-text .line-text-label {
    font-size: 1.2rem;
    color: #3e3e3e;

    max-width: 35%;
    margin-bottom: 0.15rem !important;
    order: 0;

    user-select: none;
  }

  #container-line-text .app-input:focus + .line-text-label {
    color: hsla(277, 88%, 36%, 0.6);
  }
</style>
