<template>
  <div class="spike">
    <h2 class="title">京东秒杀</h2>
    <CountDown :end-hour="13"/>
    <div class="list-wrapper">
      <ul class="spike-list">
        <li class="item" v-for="item in data" :key="item.id" @click="incomplete">
          <img class="image" :src="item.img">
          <p class="price">￥{{item.price | formatPrice}}</p>
          <p class="old-price">￥{{item.oldPrice | formatPrice}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import CountDown from 'components/count-down'
  import EventBus from 'js/event-bus'

  export default {
    name: 'Spike',
    components: {
      CountDown
    },
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
      incomplete () {
        EventBus.$emit('incomplete')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .spike {
    background-color: #fff;
    border-radius: $radius-size;
    margin: $margin-size;

    .title {
      font-size: $title-font-size;
      display: inline-block;
      margin: $margin-size;
      font-weight: 500;
    }

    .list-wrapper {
      overflow: hidden;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
    }

    .spike-list {
      display: flex;
      padding: $margin-size 0;

      .item {
        padding: 0 px2rem(12px);
        text-align: center;

        .image {
          width: px2rem(66px);
          height: px2rem(66px);
        }

        .price {
          font-size: $title-font-size;
          color: $main-color;
        }

        .old-price {
          font-size: $info-font-size;
          color: $hint-color;
          text-decoration: line-through;
          margin-top: px2rem(6px);
        }
      }
    }
  }
</style>
