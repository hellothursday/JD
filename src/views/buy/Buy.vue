<template>
  <div class="buy">
    <TopBar title="立即购买" @left-click="back"/>
    <div class="goods-profile">
      <img class="figure" :src="goods.img" :alt="goods.name">
      <div class="desc">
        <p class="title">{{goods.name}}</p>
        <p class="price">￥{{goods.price | formatPrice}}</p>
      </div>
    </div>
    <ul class="payment-methods">
      <li class="payment-item" v-for="item in payMethods" :key="item.id" @click="selectPayment(item.id)">
        <img class="icon" :src="item.icon" :alt="item.title">
        <div class="text">
          <p class="title">{{item.title}}</p>
          <p class="desc">{{item.desc}}</p>
        </div>
        <img class="check" :src="checkIcon(item.id)">
      </li>
    </ul>
    <div class="buy-button">去付款</div>
    <img class="logo" src="./images/jd-logo.png">
  </div>
</template>

<script>
  import TopBar from 'components/top-bar'

  const ALIPAY = 0
  const WEICHAT = 1
  export default {
    name: 'Buy',
    data () {
      return {
        goods: {},
        payMethods: [
          {
            id: ALIPAY,
            title: '支付宝支付',
            desc: '数亿用户都在用，安全可信托',
            icon: require('./images/alipay.svg')
          },
          {
            id: WEICHAT,
            title: '微信支付',
            desc: '亿万用户选择，更快更安全',
            icon: require('./images/weichat.png')
          }
        ],
        payType: ALIPAY
      }
    },
    components: {
      TopBar
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        this.$http.get('/detail', {
          params: {
            goodsid: this.$route.query.goodsid
          }
        }).then(res => {
          this.goods = res.data.goods
        })
      },
      selectPayment (type) {
        this.payType = type
      },
      back () {
        this.$router.go(-1)
      },
      checkIcon (type) {
        if (type === this.payType) {
          return require('./images/check.svg')
        } else {
          return require('./images/no-check.svg')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .buy {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f5f5f5;

    .goods-profile {
      display: flex;
      margin-top: $margin-size;
      font-size: $title-font-size;
      background: #fff;
      padding: $margin-size;

      .figure {
        flex: 0 0 px2rem(100px);
        width: px2rem(100px);
        height: px2rem(100px);
      }

      .desc {
        flex: 1 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 $margin-size;

        .title {

        }

        .price {
          color: $main-color;
          font-size: $title-font-size;
          font-weight: bold;
        }
      }
    }

    .payment-methods {
      background: #fff;
      margin-top: $margin-size;

      .payment-item {
        padding: $margin-size;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid $line-color;

        &:last-child {
          border-bottom: none;
        }

        .icon {
          flex: 0 0 px2rem(30px);
          width: px2rem(30px);
          margin-right: $margin-size;
        }

        .text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .title {
            font-size: $info-font-size;
          }

          .desc {
            margin-top: px2rem(5px);
            font-size: $min-info-font-size;
            color: $hint-color;
          }
        }

        .check {
          flex: 0 0 px2rem(16px);
          width: px2rem(16px);
          height: px2rem(16px);
        }
      }
    }

    .buy-button {
      width: 85%;
      text-align: center;
      font-weight: bold;
      border-radius: px2rem(5px);
      padding: px2rem(16px);
      margin: px2rem(50px) auto px2rem(20px);
      font-size: $title-font-size;
      background: #e4393c;
      color: #fff;
    }

    .logo {
      display: block;
      margin: px2rem(25px) auto;
      width: px2rem(100px);
      height: px2rem(20px);
    }
  }
</style>
