<template>
  <router-link id="app-link-icon" :to="linkPath">
    <i class="material-icons">{{linkIcon}}</i>
    {{linkContent}}
  </router-link>
</template>

<script>
export default {
  name: 'AppLinkIcon',

  props: {
    linkPath: String,
    linkIcon: String,
    linkContent: String
  }
}
</script>

<style scoped>
  #app-link-icon {
    font-size: 1.1rem;
    cursor: pointer;

    display: flex;
    align-items: center;
  }
</style>
