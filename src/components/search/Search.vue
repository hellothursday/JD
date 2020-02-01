<template>
  <div class="search" :class="[theme]">
    <i class="icon"></i>
    <span class="text">{{text}}</span>
  </div>
</template>

<script>
  export default {
    name: 'Search',
    props: {
      theme: {
        type: String,
        default: 'light',
        validator (value) {
          return ['light', 'dark'].indexOf(value) !== -1
        }
      },
      text: {
        type: String,
        default: '搜索商品/商店'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .search {
    width: 100%;
    margin: 0 $margin-size;
    padding: $margin-size;
    border-radius: px2rem(22px);
    display: flex;
    align-items: center;

    &.light {
      background-color: #fff;

      .icon {
        background-image: url("./images/search.svg");
      }

      .text {
        color: #999;
      }
    }

    &.dark {
      background-color: #ccc;

      .icon {
        background-image: url("./images/search-white.svg");
      }

      .text {
        color: #fff;
      }
    }

    .icon {
      width: px2rem(18px);
      height: px2rem(18px);
      background-repeat: no-repeat;
      background-size: contain;
    }

    .text {
      margin-top: px2rem(2px);
      margin-left: $margin-size;
      font-size: $info-font-size;
      @include text-line(1)
    }
  }
</style>
