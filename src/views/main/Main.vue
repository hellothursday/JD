<template>
  <div class="main">
    <div class="wrapper" @scroll="onScroll" ref="mainWrapper">
      <component :is="currentPage" :scroll-top="scrollTop"/>
    </div>
    <TabBar :data="tabBarList" @change="onTabBarChange"/>
  </div>
</template>

<script>
  import TabBar from 'components/tab-bar'

  export default {
    name: 'Main',
    data () {
      return {
        currentPage: 'Home',
        tabBarList: [
          {
            icon: require('./images/home-n.svg'),
            activeIcon: require('./images/home-h.svg'),
            title: '首页',
            componentName: 'Home'
          },
          {
            icon: require('./images/shopping-n.svg'),
            activeIcon: require('./images/shopping-h.svg'),
            title: '购物车',
            componentName: 'Cart'
          },
          {
            icon: require('./images/my-n.svg'),
            activeIcon: require('./images/my-h.svg'),
            title: '我的',
            componentName: 'My'
          }
        ],
        scrollTop: 0
      }
    },
    components: {
      TabBar,
      Home: () => import('pages/home'),
      Cart: () => import('pages/cart'),
      My: () => import('pages/my')
    },
    activated () {
      // 保留当前页面的滚动值
      this.$refs.mainWrapper.scrollTop = this.scrollTop
    },
    methods: {
      onTabBarChange (componentName) {
        this.currentPage = componentName
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
