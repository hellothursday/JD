<template>
  <div class="main">
    <div class="wrapper" @scroll="onScroll" ref="mainWrapper">
      <component :is="currentComponent" :scroll-top="scrollTop"/>
    </div>
    <TabBar :data="tabBarList" :current="current" @change="onTabBarChange"/>
  </div>
</template>

<script>
  import TabBar from 'components/tab-bar'

  const TAB_HOME = 0
  const TAB_CART = 1
  const TAB_MY = 2
  const TAB_COMPONENTS = ['Home', 'Cart', 'My']
  export default {
    name: 'Main',
    components: {
      TabBar,
      Home: () => import('pages/home'),
      Cart: () => import('pages/cart'),
      My: () => import('pages/my')
    },
    data () {
      return {
        current: TAB_HOME,

        tabBarList: [
          {
            // TAB_HOME
            icon: require('./images/home-n.svg'),
            activeIcon: require('./images/home-h.svg'),
            title: '首页'
          },
          {
            // TAB_CART
            icon: require('./images/shopping-n.svg'),
            activeIcon: require('./images/shopping-h.svg'),
            title: '购物车'
          },
          {
            // TAB_MY
            icon: require('./images/my-n.svg'),
            activeIcon: require('./images/my-h.svg'),
            title: '我的'
          }
        ],
        scrollTop: 0
      }
    },
    computed: {
      currentComponent () {
        return TAB_COMPONENTS[this.current]
      }
    },
    activated () {
      // 保留当前页面的滚动值
      this.$refs.mainWrapper.scrollTop = this.scrollTop

      /**
       * 指定切换的tab
       */
      const tab = this.$route.params.tab
      if (tab !== undefined && [TAB_HOME, TAB_CART, TAB_MY].indexOf(tab) !== -1) {
        this.current = tab
      }
    },
    methods: {
      onTabBarChange (index) {
        this.current = index
      },
      onScroll (event) {
        this.scrollTop = event.target.scrollTop
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'scss/index.scss';

  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;

    .wrapper {
      width: 100%;
      flex: 1 1;
      overflow: auto;
    }
  }
</style>
