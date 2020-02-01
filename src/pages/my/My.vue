<template>
  <div class="my">
    <TopBar title="我的" :show-back="false"/>
  </div>
</template>

<script>
  import TopBar from 'components/top-bar'

  export default {
    name: 'My',
    components: {
      TopBar
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .my {
    width: 100%;
    height: 100%;
  }
</style>
