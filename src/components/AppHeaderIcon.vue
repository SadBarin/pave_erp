<template>
  <div id="app-header-container">
    <h3 class="app-header app-header-three" v-if="headerLevel === '3'">
      <i class="material-icons header-icon header-three-icon">{{materialIcon}}</i>
      {{headerText}}
    </h3>

    <h4 class="app-header app-header-four" v-else-if="headerLevel === '4'">
      <i class="material-icons header-icon header-four-icon">{{materialIcon}}</i>
      {{headerText}}
    </h4>
  </div>
</template>

<script>
export default {
  name: 'AppHeaderIconFour',

  props: {
    headerLevel: String,
    materialIcon: String,
    headerText: String
  }
}
</script>

<style scoped>
  #app-header-container .app-header {
    color: hsla(0, 0%, 0%, 0.87);

    margin: 0;

    display: flex;
    align-items: center;

    cursor: default;
    user-select: none;
  }

  #app-header-container .app-header-three {
    opacity: 0.9;

    margin-left: -0.2rem;
    font-size: 1.9rem;
  }

  #app-header-container .app-header-four {
    opacity: 0.8;

    font-size: 1.7rem;
  }

  #app-header-container .header-icon {
    color: hsla(0, 0%, 0%, 0.87);

    margin: 0 1.2rem 0 0;
  }

  #app-header-container .header-icon:hover {
    color: hsla(0, 0%, 0%, 0.87);
  }

  #app-header-container .header-three-icon {
    font-size: 2.1rem;
  }

  #app-header-container .header-four-icon {
    font-size: 1.6rem;
  }
</style>
