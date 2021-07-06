<template>
  <div id="container-select">
    <select
      class="app-select browser-default"
      :id="selectID"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('select-change', $event.target.value)"
    >
      <slot></slot>
    </select>

    <label class="select-label" :for="selectID">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',

  props: {
    selectID: String,
    label: String,
    // eslint-disable-next-line vue/require-prop-type-constructor
    value: String | Number
  }
}
</script>

<style scoped>
  #container-select {
    width: 100%;

    display: flex;
    align-items: center;
  }

  #container-select .app-select {
    background: transparent;
    border: none;
    color: #808080;
    font-size: 1.1rem !important;

    display: block;
    position: static;

    width: fit-content;
    height: fit-content;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    margin-bottom: 0;

    order: 1
  }

  #container-select .select-label{
    font-size: 1.2rem;
    color: #3e3e3e;

    display: block;
    position: static;

    margin-bottom: 0.15rem !important;
    order: 0;

    user-select: none;
  }

  #container-select .app-select:focus {
    outline: none;
  }

  #container-select .app-select:focus + .select-label {
    color: hsla(277, 88%, 36%, 0.6);
  }
</style>
