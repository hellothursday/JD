<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="home">
    <TopBar :show-back="false" :custom-style="topBarStyle">
      <template #left>
        <img :src="topBarIcon.left">
      </template>
      <template #center>
        <Search :theme="searchTheme"/>
      </template>
      <template #right>
        <img :src="topBarIcon.right">
      </template>
    </TopBar>
    <Slide :data="slideList" :autoplay="true" :height="slideHeight" :style="slideStyle"/>
    <Activity>
      <div class="activity-520">
        <img v-for="item in activities" :src="item.icon" :key="item.id">
      </div>
    </Activity>
    <MallNav :data="mallList"/>
    <Spike v-if="spikeList.length" :data="spikeList"/>
    <Activity>
      <div class="activity-buy-together">
        <img src="http://imooc.hybrid.lgdsunday.club/img/pinGouJie.a976e93f.gif" alt="拼购节">
      </div>
    </Activity>
    <GoodsList type="waterfall" :data="goodsList"/>
  </div>
</template>

<script>
  import TopBar from 'components/top-bar'
  import Search from 'components/search'
  import Slide from 'components/slide'
  import Activity from 'components/activity'
  import MallNav from 'components/mall-nav'
  import Spike from 'components/spike'
  import GoodsList from 'components/goods-list'

  const ANCHOR_TOP = 140
  const LIGHT_ICONS = {
    left: require('./images/more-white.svg'),
    right: require('./images/message-white.svg')
  }

  const DARK_ICONS = {
    left: require('./images/more.svg'),
    right: require('./images/message.svg')
  }
  export default {
    name: 'Home',
    components: {
      TopBar,
      Search,
      Slide,
      Activity,
      MallNav,
      Spike,
      GoodsList
    },
    props: {
      scrollTop: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        slideHeight: '184px',
        slideList: [],
        activities: [],
        mallList: [],
        spikeList: [],
        goodsList: [],
        searchTheme: 'light',
        topBarIcon: LIGHT_ICONS,
        topBarStyle: {
          position: 'fixed',
          backgroundColor: ''
        },
        slideStyle: {
          transform: ''
        }
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        const { all, spread, get } = this.$http
        all([
          get('/swiper'),
          get('/activities-520'),
          get('/mall'),
          get('/spike'),
          get('/goods')
        ]).then(spread((slide, activities, mall, spike, goods) => {
          this.slideList = slide.data.list
          this.activities = activities.data.list
          this.mallList = mall.data.list
          this.spikeList = spike.data.list
          this.goodsList = goods.data.list
        }))
      }
    },
    watch: {
      scrollTop (topDiff) {
        if (topDiff < 0) return
        if (topDiff >= ANCHOR_TOP) {
          this.topBarIcon = DARK_ICONS
          this.searchTheme = 'dark'
        } else {
          this.topBarIcon = LIGHT_ICONS
          this.searchTheme = 'light'
        }
        let opacity = topDiff / ANCHOR_TOP
        if (opacity >= 1) {
          opacity = 1
        } else if (opacity <= 0) {
          opacity = 0
        }
        this.topBarStyle.backgroundColor = `rgba(255,255,255,${opacity})`
        this.slideStyle.transform = `translate3d(0, ${topDiff / 2}px, 0)`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'scss/index.scss';

  .home {
    width: 100%;

    .activity-520 {
      width: 100%;
      margin-top: px2rem(-8px);
      border-top-left-radius: px2rem(8px);
      border-top-right-radius: px2rem(8px);

      img {
        display: inline-block;
        width: 33.33%;
      }
    }

    .activity-buy-together {
      width: 100%;

      img {
        width: 100%;
      }
    }
  }
</style>
