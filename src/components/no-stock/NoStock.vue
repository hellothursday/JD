<template>
  <span class="no-stock">缺货</span>
</template>

<script>
  export default {
    name: 'NoStock'
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .no-stock {
    font-size: $min-info-font-size;
    color: #fff;
    background-color: $hint-color;
    padding: 0 px2rem(3px);
    border-radius: px2rem(2px);
  }
</style>
