<template>
  <div class="cart">
    <TopBar title="购物车" :show-back="false"/>
    <ul class="goods-list" v-if="goodsList.length">
      <li class="list-item" v-for="item in goodsList" :key="item.id">
        <img class="check" :src="checkIcon(item.checked)" @click="selectItem(item)">
        <img class="figure" :src="item.img" :alt="item.name" @click="goToDetail(item)">
        <div class="text-content">
          <p class="title" @click="goToDetail(item)">{{item.name}}</p>
          <div class="num">
            <span class="price">￥{{item.price | formatPrice}}</span>
            <div class="num-controller">
              <span class="minus" :class="{'disabled':item.count===1}" @click="minus(item)"></span>
              <span class="count">{{item.count}}</span>
              <span class="increase" @click="increase(item)"></span>
            </div>
          </div>
          <div class="delete" @click="deleteItem(item)">删除</div>
        </div>
      </li>
    </ul>
    <div class="empty" v-else>
      <img class="empty-icon" src="./images/empty.png">
      <p class="empty-text">购物车空空如也</p>
    </div>
    <div class="bottom-bar" v-if="goodsList.length">
      <div class="check-all" @click="selectAll">
        <img class="check-icon" :src="checkIcon(isSelectAll)">
        <span class="check-text">全选</span>
      </div>
      <div class="price-nums">
        <p class="total">总计：<span class="price-num">￥{{totalPrice | formatPrice}}</span></p>
        <p class="discount">已优惠￥{{totalPrice * 0.05 | formatPrice}}</p>
      </div>
      <div class="pay-button">去结算({{totalCount}})</div>
    </div>
  </div>
</template>

<script>
  import TopBar from 'components/top-bar'

  export default {
    name: 'Cart',
    components: {
      TopBar
    },
    data () {
      return {
        goodsList: this.$store.state.cartData
      }
    },
    computed: {
      totalPrice () {
        let totalPrice = 0
        this.goodsList.forEach(item => {
          if (item.checked) {
            totalPrice += item.price * item.count
          }
        })
        return totalPrice
      },
      totalCount () {
        let totalCount = 0
        this.goodsList.forEach(item => {
          totalCount += item.count
        })
        return totalCount
      },
      isSelectAll () {
        return this.goodsList.every(item => {
          return item.checked
        })
      }
    },
    methods: {
      checkIcon (checked) {
        return checked ? require('./images/check.svg') : require('./images/no-check.svg')
      },
      selectItem (item) {
        item.checked = !item.checked
        this.$store.commit('changeLocalStatus')
      },
      goToDetail (item) {
        this.$router.push({
          name: 'GoodsDetail',
          params: {
            routerType: 'push'
          },
          query: {
            goodsid: item.id
          }
        })
      },
      selectAll () {
        const val = !this.isSelectAll
        this.goodsList.forEach(item => {
          item.checked = val
        })
        this.$store.commit('changeLocalStatus')
      },
      deleteItem (item) {
        this.goodsList.some((goods, index) => {
          if (goods.id === item.id) {
            this.goodsList.splice(index, 1)
            return true
          }
          return false
        })
        this.$store.commit('changeLocalStatus')
      },
      minus (item) {
        if (item.count === 1) return
        item.checked = true

        --item.count
        this.$store.commit('changeLocalStatus')
      },
      increase (item) {
        item.checked = true

        ++item.count
        this.$store.commit('changeLocalStatus')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .cart {
    position: relative;
    width: 100%;
    height: 100%;

    .goods-list {
      width: 100%;
      position: absolute;
      top: px2rem(45px);
      left: 0;
      bottom: 0;
      overflow: hidden;
      overflow-y: scroll;
      padding-bottom: px2rem(100px);

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        padding: $margin-size;
        background: #fff;
        border-bottom: 1px solid $line-color;

        .check {
          flex: 0 0 px2rem(18px);
          width: px2rem(18px);
          height: px2rem(18px);
          padding: px2rem(5px);
        }

        .figure {
          width: px2rem(100px);
          height: px2rem(100px);
        }

        .text-content {
          height: px2rem(100px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 $margin-size;
          font-size: $info-font-size;

          .title {
            line-height: px2rem(18px);
            @include text-line(3);
          }

          .num {
            display: flex;
            justify-content: space-between;
            font-size: $title-font-size;
            font-weight: 500;

            .price {
              color: $main-color;
            }

            .num-controller {
              span {
                display: inline-block;
                height: px2rem(20px);
                line-height: px2rem(20px);
                background: #f7f7f7;
                text-align: center;
                vertical-align: top;
              }

              .count {
                padding: 0 px2rem(10px);
                border-left: 1px solid #fff;
                border-right: 1px solid #fff;
                font-size: $info-font-size;
                font-weight: bold;
              }

              .minus, .increase {
                width: px2rem(20px);
                position: relative;

                &.disabled {
                  background: #fff;

                  &:after, &:before {
                    background: hsla(0, 0%, 80%, .3);
                  }
                }
              }

              .minus {
                &:after {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  content: "";
                  display: block;
                  width: 10px;
                  height: 2px;
                  margin: -1px 0 0 -5px;
                  background: #333;
                  border-radius: 1px;
                }
              }

              .increase {
                &:before {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  content: "";
                  display: block;
                  background: #333;
                  width: 2px;
                  height: 10px;
                  margin: -5px 0 0 -1px;
                  border-radius: 1px;
                }

                &:after {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  content: "";
                  display: block;
                  width: 10px;
                  height: 2px;
                  margin: -1px 0 0 -5px;
                  background: #333;
                  border-radius: 1px;
                }
              }
            }
          }

          .delete {
            color: $hint-color;
            font-size: $info-font-size;
            text-align: right;
          }
        }
      }
    }

    .empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      position: absolute;
      top: px2rem(45px);
      left: 0;
      bottom: px2rem(45px);

      .empty-icon {
        width: px2rem(90px);
        height: px2rem(90px);
      }

      .empty-text {
        margin-top: px2rem(20px);
        font-size: $title-font-size;
        color: $hint-color;
      }
    }

    .bottom-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      height: px2rem(45px);
      border-top: 1px solid $line-color;
      position: absolute;
      padding-left: px2rem(5px);
      bottom: 0;
      background: rgba(255, 255, 255, .95);
      font-size: $info-font-size;

      .check-all {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .check-icon {
          width: px2rem(18px);
          height: px2rem(18px);
          padding: px2rem(5px);
        }

        .check-text {
          color: $hint-color;
        }
      }

      .price-nums {
        flex: 1 1 auto;
        text-align: right;
        padding-right: $margin-size;

        .total {
          font-weight: bold;
          font-size: $title-font-size;

          .price-num {
            color: $main-color;
          }
        }

        .discount {
          color: $hint-color;
          font-size: $info-font-size;
          margin-top: px2rem(5px);
        }
      }

      .pay-button {
        width: px2rem(115px);
        height: px2rem(45px);
        text-align: center;
        line-height: px2rem(45px);
        background: $main-color;
        color: #fff;
        font-size: $title-font-size;
        font-weight: bold;
      }
    }
  }
</style>
