<template>
  <transition>
    <div class="blue darken-1 empty-layout" id="blue-layout">
        <router-view />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'EmptyLayout'
}
</script>

<style scoped>
  .empty-layout {
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
