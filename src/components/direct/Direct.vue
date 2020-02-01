<template>
  <span class="direct">直营</span>
</template>

<script>
  export default {
    name: 'Direct'
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .direct {
    font-size: $min-info-font-size;
    color: #fff;
    background-color: $main-color;
    padding: 0 px2rem(3px);
    border-radius: px2rem(2px);
  }

</style>
