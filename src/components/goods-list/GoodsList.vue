<template>
  <ul class="goods-list" :class="type" :style="{height:goodsListHeight}">
    <li ref="goodsItem" class="list-item" :class="[`${type}-item`]" v-for="(item,index) in data"
        @click="selectItem(item)" :style="listItemStyles[index]" :key="random(index)"><!-- 是为防止vue重用DOM，导致瀑布流计算错误 -->
      <img class="figure" :src="item.img" :alt="item.name" :style="imgStyles[index]"/>
      <div class="desc">
        <p class="name" :class="{hint:!item.isHave}">
          <Direct class="direct" v-if="item.isDirect"/>
          <NoStock class="no-stock" v-if="!item.isHave"/>
          {{item.name}}
        </p>
        <div class="info">
          <span class="price">￥{{item.price}}</span>
          <span class="sales">销量：{{item.sales}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import Direct from 'components/direct'
  import NoStock from 'components/no-stock'
  import { px2rem } from 'js/utils'

  const MAX_IMG_HEIGHT = 200
  const MIN_IMG_HEIGHT = 160
  const ITEM_MARGIN = 8

  const NORMAL = 'normal'
  const GRID = 'grid'
  const WATERFALL = 'waterfall'
  export default {
    name: 'GoodsList',
    components: {
      Direct,
      NoStock
    },
    props: {
      type: {
        type: String,
        default: NORMAL,
        validator (value) {
          return [NORMAL, GRID, WATERFALL].indexOf(value) !== -1
        }
      },
      data: {
        type: Array,
        default () {
          return []
        }
      },
      computed: {}
    },
    data () {
      return {
        // 每个图片的样式（高度）
        imgStyles: [],
        // 每个 item 的样式（位置）
        listItemStyles: [],
        // 整个 list 的高度
        goodsListHeight: 'auto'
      }
    },
    methods: {
      random (index) {
        return Math.random() * index
      },
      zeroingWaterfallStyle () {
        this.imgStyles = []
        this.listItemStyles = []
        this.goodsListHeight = 'auto'
      },
      selectItem (item) {
        if (!item.isHave) {
          alert('缺货')
          return
        }
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
      /*
      * 根据随机的图片高度，生成对应的图片样式高度
      */
      initImgStyles () {
        this.data.forEach(() => {
          let height = px2rem(this.imgHeight())
          this.imgStyles.push({ height })
        })
      },
      /*
      * 瀑布流布局
      */
      initWaterfall () {
        const goodsItems = this.$refs.goodsItem
        if (!goodsItems) {
          return
        }
        let leftTotalHeight = 0
        let rightTotalHeight = 0
        let itemStyles = []
        goodsItems.forEach(el => {
          let goodsItemStyle = {}
          let elHeight = el.clientHeight + ITEM_MARGIN
          if (leftTotalHeight <= rightTotalHeight) {
            goodsItemStyle = {
              left: '0',
              top: px2rem(leftTotalHeight)
            }
            leftTotalHeight += elHeight
          } else {
            goodsItemStyle = {
              right: '0',
              top: px2rem(rightTotalHeight)
            }
            rightTotalHeight += elHeight
          }
          itemStyles.push(goodsItemStyle)
        })
        this.listItemStyles = itemStyles
        this.goodsListHeight = leftTotalHeight > rightTotalHeight ? px2rem(leftTotalHeight + 3) : px2rem(rightTotalHeight + 3)
      },
      /*
      * 返回随机的图片高度
      */
      imgHeight () {
        const range = MAX_IMG_HEIGHT - MIN_IMG_HEIGHT
        return Math.floor(Math.random() * range + MIN_IMG_HEIGHT)
      },
      fluidize () {
        this.zeroingWaterfallStyle()
        this.initImgStyles()
        this.$nextTick(() => {
          this.initWaterfall()
        })
      }
    },
    watch: {
      type (newType) {
        if (newType === WATERFALL) {
          this.fluidize()
        } else {
          this.zeroingWaterfallStyle()
        }
      },
      data () {
        if (this.type === WATERFALL) {
          this.fluidize()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .goods-list {
    .list-item {
      background-color: #fff;
      padding: $margin-size;
      box-sizing: border-box;

      .name {
        font-size: $info-font-size;
        @include text-line(2);
        line-height: px2rem(18px);
        margin-top: px2rem(6px);

        &.hint {
          color: $hint-color;
        }

        .direct, .no-stock {
          margin-right: px2rem(2px);
        }
      }

      .info {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: $margin-size;

        .price {
          font-size: $title-font-size;
          color: $main-color;
          font-weight: 500;
        }

        .sales {
          font-size: $info-font-size;
          color: $hint-color;
        }
      }
    }
  }

  .normal {
    .normal-item {
      display: flex;
      border-bottom: 1px solid $line-color;

      .figure {
        width: px2rem(120px);
        height: px2rem(120px);
      }

      .desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: $margin-size;
      }
    }
  }

  .grid {
    padding: $margin-size;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .grid-item {
      width: 49%;
      box-sizing: border-box;
      border-radius: $radius-size;
      margin-bottom: $margin-size;

      .figure {
        width: 100%;
      }
    }
  }

  .waterfall {
    position: relative;
    margin: $margin-size;

    .waterfall-item {
      position: absolute;
      width: 49%;
      border-radius: $radius-size;

      .figure {
        width: 100%;
      }
    }
  }
</style>
