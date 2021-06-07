<template>
  <div id="container-app-numbers">
    <input
      class="app-numbers"
      type="number"

      :id='inputID'
      :placeholder="placeholder"
      :value="value"
      :min="minValue"
      :max="maxValue"
      :maxlength="maxLength"
      @input="numbersValueSubmit($event.target.value)"
    >

    <label :for="inputID" class="app-numbers-label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'AppNumbers',

  props: {
    inputID: String,
    placeholder: String,
    label: String,
    value: String,
    minValue: String,
    maxValue: String,
    maxLength: String
  },

  methods: {
    numbersValueSubmit (value) {
      let numbersValue = String(value)

      if (Number(value) > Number(this.$props.maxValue)) {
        numbersValue = this.$props.maxValue
        this.$forceUpdate()
      }

      if (Number(this.$props.minValue) > Number(value)) {
        numbersValue = this.$props.minValue
        this.$forceUpdate()
      }

      if (value === '') numbersValue = '0'

      this.$emit('input', numbersValue)
    }
  }
}
</script>

<style scoped>
#container-app-numbers {
  width: 100%;

  display: flex;
  align-items: center;
}

#container-app-numbers .app-numbers {
  border: none;
  color: #808080;
  font-size: 1.1rem !important;

  max-width: fit-content;
  height: fit-content;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  margin-bottom: 0;

  order: 1;
}

#container-app-numbers .app-numbers::placeholder {
  border: none;
  color: #c9c9c9;

  padding: 0;
}

#container-app-numbers .app-numbers-label {
  font-size: 1.2rem !important;
  color: #3e3e3e;
  line-height: 1.1rem;
  white-space: nowrap;

  margin-top: -0.1rem;
  max-width: 40%;
  order: 0;

  user-select: none;
}

#container-app-numbers .app-input:focus + .app-numbers-label {
  color: hsla(277, 88%, 36%, 0.6);
}
</style>
