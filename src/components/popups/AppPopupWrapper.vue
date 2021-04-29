<template>
  <div id="app-popup-wrapper" :class="(hidden)? 'hidden' : ''">
    <div class="popup-wrapper-overlay">
      <div class="popup-wrapper-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupWrapper',

  props: {
    hidden: Boolean
  }
}
</script>

<style scoped>
  #app-popup-wrapper .popup-wrapper-overlay {
    background: hsla(208, 82%, 72%, 0.4);
    backdrop-filter: blur(3px);

    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;

    z-index: 10000;
  }

  #app-popup-wrapper .popup-wrapper-content {
    background: hsla(0, 0%, 100%, 0.9);
    border-radius: 10px;

    width: fit-content;
    padding: 2rem;
  }

  #app-popup-wrapper.hidden {
    display: none !important;
  }
</style>
