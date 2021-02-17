<template>
  <transition>
    <div class="empty-layout" id="blue-layout">
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
    background: var(--hover-bg);

    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
