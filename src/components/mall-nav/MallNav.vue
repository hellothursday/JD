<template>
  <ul class="mall-nav">
    <li class="item" v-for="item in data" :key="item.id" @click="onItemClick">
      <img class="icon" :src="item.icon" alt="item.text">
      <p class="text">{{item.text}}</p>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'MallNav',
    props: {
      data: {
        type: Array,
        required: true,
        default () {
          return []
        }
      }
    },
    methods: {
      onItemClick () {
        this.$router.push({
          name: 'Goods',
          params: {
            routerType: 'push'
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .mall-nav {
    display: flex;
    position: relative;
    z-index: 1;
    flex-wrap: wrap;
    background-color: #fff;
    padding-bottom: px2rem(14px);

    .item {
      width: 20%;
      text-align: center;
      margin-top: px2rem(10px);

      .icon {
        width: px2rem(40px);
        height: px2rem(40px);
      }

      .text {
        font-size: $min-info-font-size;
        margin-top: px2rem(6px);
      }
    }
  }
</style>
