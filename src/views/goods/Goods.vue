<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="goods">
    <TopBar title="商品列表" @left-click="back" @right-click="changeLayout">
      <template #right>
        <img :src="layoutIcon">
      </template>
    </TopBar>
    <GoodsFilter @change="onFilterChange"/>
    <div class="list-wrapper" ref="listWrapper" @scroll="onScroll">
      <GoodsList :type="listType" :data="goodsList"/>
    </div>
  </div>
</template>

<script>
  import TopBar from 'components/top-bar'
  import GoodsFilter from 'components/goods-filter'
  import GoodsList from 'components/goods-list'

  const LAYOUT_ICONS = [
    require('./images/list-type.svg'),
    require('./images/grid-type.svg'),
    require('./images/waterfall-type.svg')
  ]

  const NORMAL = 'normal'
  const GRID = 'grid'
  const WATERFALL = 'waterfall'
  const LAYOUTS = [NORMAL, GRID, WATERFALL]

  export default {
    name: 'Goods',
    data () {
      return {
        layoutIndex: 0,
        goodsList: [],
        scrollTop: 0
      }
    },
    computed: {
      layoutIcon () {
        return LAYOUT_ICONS[this.layoutIndex]
      },
      listType () {
        return LAYOUTS[this.layoutIndex]
      }
    },
    components: {
      TopBar,
      GoodsFilter,
      GoodsList
    },
    created () {
      this.initData()
    },
    activated () {
      // 保留当前页面的滚动值
      this.$refs.listWrapper.scrollTop = this.scrollTop
    },
    methods: {
      initData () {
        this.$http.get('/goods').then(goods => {
          this.defaultList = goods.data.list
          this.goodsList = this.listClone()
        })
      },
      back () {
        this.$router.go(-1)
      },
      onFilterChange (filterType) {
        if (filterType === 'default') {
          this.goodsList = this.listClone()
        } else {
          this.goodsList = this.listClone().sort((item1, item2) => {
            return item2[filterType] - item1[filterType]
          })
        }
      },
      changeLayout () {
        this.layoutIndex = (++this.layoutIndex) % 3
      },
      listClone () {
        return this.defaultList.slice(0)
      },
      onScroll (event) {
        this.scrollTop = event.target.scrollTop
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .goods {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    font-size: 14px;
    background-color: #f5f5f5;

    .list-wrapper {
      width: 100%;
      position: absolute;
      top: px2rem(114px);
      bottom: 0;
      overflow: hidden;
      overflow-y: scroll;
    }
  }
</style>
