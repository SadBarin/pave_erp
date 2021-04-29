<template>
  <div class="app-link-icon-container">
    <router-link class="app-link-icon" :to="linkPath" v-if="!pressed">
      <i class="material-icons">{{linkIcon}}</i>
      {{linkContent}}
    </router-link>

    <div class="app-link-icon pressed" v-else>
      <i class="material-icons">{{linkIcon}}</i>
      {{linkContent}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLinkIcon',

  props: {
    linkPath: String,
    linkIcon: String,
    linkContent: String,
    pressed: Boolean
  }
}
</script>

<style scoped>
  .app-link-icon-container {
    width: fit-content;
    height: fit-content;
  }

  .app-link-icon {
    font-size: 1.1rem;
    cursor: pointer;

    display: flex;
    align-items: center;
  }

  .pressed {
    color: hsla(277, 88%, 36%, 0.5);
    cursor: default;
  }
</style>
