<template>
  <div class="top-bar" :class="{'bottom-line':!!title}" :style="customStyle">
    <div class="left" @click="onLeftClick">
      <img v-if="showBack" src="./images/back.svg">
      <slot name="left"/>
    </div>
    <div class="center">
      <h2 v-if="title" class="title">{{title}}</h2>
      <slot name="center"/>
    </div>
    <div class="right" @click="onRightClick">
      <slot name="right"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopBar',
    props: {
      title: {
        type: String,
        default: ''
      },
      showBack: {
        type: Boolean,
        default: true
      },
      customStyle: {
        type: Object,
        default () {
          return {
            backgroundColor: '#fff'
          }
        }
      }
    },
    methods: {
      onLeftClick () {
        this.$emit('left-click')
      },
      onRightClick () {
        this.$emit('right-click')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .top-bar {
    width: 100%;
    height: px2rem(44px);
    display: flex;
    justify-content: space-between;
    z-index: 99;

    &.bottom-line {
      border-bottom: 1px solid $line-color;
    }

    .left, .right {
      width: px2rem(26px);
      height: 100%;
      padding: 0 $margin-size;
      display: flex;
      align-items: center;

      img {
        width: 100%;
      }
    }

    .center {
      flex: 1 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .title {
        font-size: $title-font-size;
      }
    }
  }
</style>
