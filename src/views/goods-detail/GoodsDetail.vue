<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="goods-detail" @scroll="onScroll" ref="goodsDetail">
    <TopBar :show-back="false" :custom-style="topBarStyle" @left-click="back">
      <template #left>
        <div class="back">
          <img class="icon" src="./images/back-2.svg" :style="backIconStyles[0]"/>
          <img class="icon" src="./images/back-white.svg" :style="backIconStyles[1]">
        </div>
      </template>
      <template #center>
        <p class="top-bar-title" :style="topBarTitleStyle">商品详情</p>
      </template>
    </TopBar>
    <Slide :data="slideList" :height="slideHeight" pagination-type="fraction" :style="slideStyle"/>
    <div class="content">
      <p class="price">￥{{goods.price|formatPrice}}</p>
      <h2 class="title">
        <Direct v-if="goods.isDirect"/>
        <span class="text">{{goods.name}}</span>
      </h2>
      <div class="wrapper">
        <div class="choose" @click="incomplete">
          <span class="chosen">已选</span>
          <p class="sku">{{goods.name}}</p>
        </div>
        <ul class="supports">
          <li class="supports-item" v-for="(item, index) in supports" :key="index">
            <img class="icon" src="./images/support.svg"/>{{item}}
          </li>
        </ul>
      </div>
      <ul class="detail-imgs">
        <li class="detail-item" v-for="(item,index) in goods.detailImgs" :key="index">
          <img class="detail-img" :src="item">
        </li>
      </ul>
    </div>
    <div class="bottom-bar">
      <div class="icon-btn dong" @click="incomplete">
        <img class="icon" src="./images/dong.png">
        <span class="text">联系客服</span>
      </div>
      <div class="icon-btn shop" @click="incomplete">
        <img class="icon" src="./images/shop.png">
        <span class="text">进店</span>
      </div>
      <div class="icon-btn cart" @click="goToCart">
        <img class="icon" src="./images/cart.png">
        <span class="text">购物车</span>
      </div>
      <div class="add-cart" @click="addToCart">加入购物车</div>
      <div class="buy-now" @click="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
  import TopBar from 'components/top-bar'
  import Slide from 'components/slide'
  import Direct from 'components/direct'
  import EventBus from 'js/event-bus'

  const ANCHOR_TOP = 320
  export default {
    name: 'GoodsDetail',
    components: {
      TopBar,
      Slide,
      Direct
    },
    data () {
      return {
        slideHeight: '364px',
        topBarStyle: {
          position: 'fixed',
          backgroundColor: ''
        },
        topBarTitleStyle: {
          opacity: 0
        },
        backIconStyles: [
          { opacity: 1 },
          { opacity: 0 }
        ],
        slideStyle: {
          transform: ''
        },
        slideList: [],
        goods: {},
        supports: ['可配送海外', '京东发货&售后', '京准达', '211限时达', '可自提', '不可使用优惠券'],
        scrollTop: 0
      }
    },
    created () {
      this.initData()
    },
    activated () {
      this.$refs.goodsDetail.scrollTop = this.scrollTop
    },
    methods: {
      initData () {
        this.$http.get('/detail', {
          params: {
            goodsid: this.$route.query.goodsid
          }
        }).then(res => {
          const goods = res.data.goods
          const list = []
          goods.swiperImgs.forEach((item, index) => {
            list.push({
              id: index,
              icon: item
            })
          })
          this.slideList = list
          this.goods = goods
        })
      },
      back () {
        this.$router.go(-1)
      },
      buy () {
        this.$router.push({
          name: 'Buy',
          params: {
            routerType: 'push'
          },
          query: {
            goodsid: this.goods.id
          }
        })
      },
      addToCart () {
        alert('加入购物车成功')
        this.$store.commit('addToCart', this.goods)
        // this.goToCart()
      },
      goToCart () {
        const TAB_CART = 1 // 购物车页面
        this.$router.push({
          name: 'Main',
          params: {
            routerType: 'push',
            tab: TAB_CART,
            clearTaskStack: true
          }
        })
      },
      onScroll (event) {
        const scrollTop = event.target.scrollTop
        if (scrollTop < 0) {
          return
        }
        this.scrollTop = scrollTop
        let opacity = scrollTop / ANCHOR_TOP
        if (opacity >= 1) {
          opacity = 1
        } else if (opacity <= 0) {
          opacity = 0
        }
        this.topBarStyle.backgroundColor = `rgba(255,32,0,${opacity})`

        this.topBarTitleStyle.opacity = opacity
        this.backIconStyles[0].opacity = 1 - opacity
        this.backIconStyles[1].opacity = opacity

        this.slideStyle.transform = `translate3d(0, ${scrollTop / 2}px, 0)`
      },
      incomplete () {
        EventBus.$emit('incomplete')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .goods-detail {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    background-color: #f5f5f5;

    .back {
      display: flex;
      position: relative;
      width: px2rem(26px);
      height: px2rem(26px);

      .icon {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }

    .top-bar-title {
      font-size: $title-font-size;
      font-weight: bold;
      color: #fff;
    }

    .content {
      position: relative;
      z-index: 1;
      background-color: #f5f5f5;
      font-size: $info-font-size;
      box-shadow: 0 0 0.42667rem 0 rgba(0, 0, 0, .2);

      .price {
        font-size: px2rem(20px);
        font-weight: bold;
        padding: $margin-size;
        color: $main-color;
        background-color: #fff;
      }

      .title {
        font-size: 0;
        padding: 0 $margin-size $margin-size;
        line-height: px2rem(16px);
        background-color: #fff;

        .text {
          margin-left: px2rem(5px);
          font-size: $title-font-size;
          font-weight: bold;
        }
      }

      .wrapper {
        padding: $margin-size;
        background-color: #fff;
        margin-top: $margin-size;

        .choose {
          display: flex;
          line-height: px2rem(20px);
          border-bottom: 1px solid $line-color;
          padding: $margin-size 0;

          .chosen {
            flex: 1 0 px2rem(35px);
            width: px2rem(25px);
            color: $hint-color;
            font-size: $info-font-size;
            @include text-line(1);
          }

          .sku {
            font-size: $title-font-size;
            font-weight: bold;
            @include text-line(1);
          }
        }

        .supports {
          margin-top: $margin-size;

          .supports-item {
            display: inline-block;
            font-size: $min-info-font-size;
            color: $hint-color;
            padding: $margin-size 0;
            margin-right: $margin-size;

            .icon {
              width: px2rem(12px);
              height: px2rem(12px);
              vertical-align: middle;
              margin-right: px2rem(4px);
            }
          }
        }
      }

      .detail-imgs {
        margin-top: $margin-size;
        font-size: 0;
        padding-bottom: px2rem(47px);

        .detail-item {
          .detail-img {
            width: 100%;
          }
        }
      }
    }

    .bottom-bar {
      display: flex;
      position: fixed;
      z-index: 1;
      bottom: 0;
      left: 0;
      width: 100%;
      height: px2rem(47px);
      line-height: px2rem(47px);
      background-color: #fff;
      color: #fff;
      font-size: $info-font-size;

      .icon-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1 1 auto;

        .icon {
          width: px2rem(20px);
          height: px2rem(20px);
        }

        .text {
          font-size: $min-info-font-size;
          color: $hint-color;
          line-height: px2rem(18px);
        }
      }

      .add-cart {
        flex: 0 0 px2rem(100px);
        width: px2rem(100px);
        text-align: center;
        background: -webkit-linear-gradient(312deg, #ffa600, #ffb000 77%, #ffbc00);
        background: linear-gradient(138deg, #ffa600, #ffb000 77%, #ffbc00);
      }

      .buy-now {
        flex: 0 0 px2rem(100px);
        width: px2rem(100px);
        text-align: center;
        background: -webkit-linear-gradient(131deg, #ff4f18, #ff2000 24%, #f10000);
        background: linear-gradient(-41deg, #ff4f18, #ff2000 24%, #f10000);
      }
    }
  }
</style>
