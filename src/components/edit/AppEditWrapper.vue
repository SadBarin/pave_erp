<template>
  <div id="app-edit-wrapper">
    <AppTopPanel :header="header">
      <template #nav-buttons>
        <slot name="nav-buttons"></slot>
      </template>
    </AppTopPanel>

    <section class="edit-wrapper-section">
      <slot name="edit-section"></slot>
    </section>
  </div>
</template>

<script>
import AppTopPanel from '@/components/AppTopPanel'

export default {
  name: 'AppEditWrapper',

  components: { AppTopPanel },

  props: { header: String }
}
</script>

<style scoped>
  #app-edit-wrapper .edit-top-panel h3{
    margin: 0;
  }

  #app-edit-wrapper .edit-wrapper-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: min-content;
    grid-row-gap: 2rem;
  }

  #app-edit-wrapper .edit-wrapper-section .edit-block-header {
    margin-bottom: 1rem;
  }
</style>
