<template>
  <ul class="tab-bar">
    <li class="item" v-for="(item,index) in data" :key="index" @click="onChange(index)">
      <img class="icon" :src="icon(item,index)" :alt="item.title">
      <p class="text" :class="{'active':index===currentTab}">{{item.title}}</p>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'TabBar',
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      },
      current: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        currentTab: this.current
      }
    },
    methods: {
      icon (item, index) {
        return index === this.currentTab ? item.activeIcon : item.icon
      },
      onChange (index) {
        if (index === this.currentTab) {
          return
        }
        this.currentTab = index
        this.$emit('change', index)
      }
    },
    watch: {
      current (newValue) {
        this.currentTab = newValue
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .tab-bar {
    width: 100%;
    height: px2rem(46px);
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, .2);
    border-top: 1px solid $line-color;
    z-index: 1;

    .item {
      text-align: center;
      padding: px2rem(4px) px2rem(12px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .icon {
        width: px2rem(22px);
        height: px2rem(22px);
      }

      .text {
        font-size: px2rem(14px);
        margin-top: px2rem(4px);

        &.active {
          color: $main-color;
        }
      }
    }
  }
</style>
