<template>
  <div class="cart">
    <TopBar title="购物车" :show-back="false"/>
  </div>
</template>

<script>
  import TopBar from 'components/top-bar'

  export default {
    name: 'Cart',
    components: {
      TopBar
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .cart {
    width: 100%;
    height: 100%;
  }
</style>
