<template>
  <div class="slide">
    <swiper :options="swiperOption" v-if="data.length>1">
      <swiper-slide v-for="item in data" :key="item.id">
        <img :src="item.icon" :height="height">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  // require styles
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'Slide',
    props: {
      data: {
        type: Array,
        required: true,
        default () {
          return []
        }
      },
      height: {
        type: String,
        default: 'auto'
      },
      paginationType: {
        type: String,
        default: 'bullets',
        validator (value) {
          return ['bullets', 'fraction'].indexOf(value) !== -1
        }
      },
      autoplay: {
        type: Boolean,
        default: false
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          autoplay: this.autoplay,
          loop: true,
          autoHeight: true,
          pagination: {
            el: '.swiper-pagination',
            type: this.paginationType
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~scss/index.scss";

  .swiper-slide {
    img {
      width: 100%;
    }
  }

  .swiper-pagination {
    bottom: px2rem(20px) !important;

    .swiper-pagination-bullet {
      margin: 0 px2rem(4px);
      box-sizing: border-box;
      border-radius: px2rem(7px);
      height: px2rem(3px);
      width: px2rem(8px);
      background: hsla(0, 0%, 92.9%, .4);
      display: inline-block;
      opacity: 1;

      &-active {
        width: px2rem(12px);
        background: #ededed;
      }
    }

    &.swiper-pagination-fraction {
      width: auto;
      right: 0;
      bottom: px2rem(32px) !important;
      left: auto;
      font-size: $info-font-size;
      background-color: rgba(0, 0, 0, .3);
      padding: px2rem(6px) px2rem(18px);
      color: #fff;
      border-top-left-radius: px2rem(16px);
      border-bottom-left-radius: px2rem(16px);

      .swiper-pagination-current {
        font-size: $title-font-size;
        font-weight: bold;
      }
    }
  }

</style>
