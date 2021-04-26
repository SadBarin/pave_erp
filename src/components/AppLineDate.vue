<template>
  <div id="container-line-date">
    <input
      class="line-date"
      type="datetime-local"

      :id='dateID'
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >

    <label :for="dateID" class="line-date-label">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'AppLineDate',

  props: {
    dateID: String,
    placeholder: String,
    label: String,
    value: String
  }
}
</script>

<style scoped>
  #container-line-date {
    width: 100%;

    display: flex;
    align-items: center;
  }

  #container-line-date .line-date {
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
  #container-line-date .line-date::placeholder{
    border: none;
    color: #c9c9c9;
    font-size: 1.1rem !important;

    padding: 0;
  }

  #container-line-date .line-date-label {
    font-size: 1.2rem;
    color: #3e3e3e;

    max-width: 35%;
    margin-bottom: 0.15rem !important;
    order: 0;

    user-select: none;
  }

  #container-line-date .app-input:focus + .line-date-label {
    color: hsla(277, 88%, 36%, 0.6);
  }
</style>
