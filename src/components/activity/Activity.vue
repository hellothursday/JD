<template>
  <div class="activity">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Activity'
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .activity {
    max-height: px2rem(160px);
    position: relative;
    z-index: 1;
  }
</style>
