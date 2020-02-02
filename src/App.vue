<template>
  <div id="app" ref="app">
    <transition :name="transitionName">
      <keep-alive :include="virtualTaskStack">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  import { animateCSS } from 'js/utils'
  import EventBus from 'js/event-bus'
  import storage from 'good-storage'

  export default {
    data () {
      return {
        transitionName: '',
        // 虚拟任务栈
        virtualTaskStack: []
      }
    },
    created () {
      EventBus.$on('incomplete', () => {
        animateCSS(this.$refs.app, 'shake')
      })

      const cartData = storage.get('cartData', [])
      if (cartData) {
        this.$store.commit('setCartData', cartData)
      }
    },
    methods: {},
    watch: {
      // watch $route 决定使用哪种过渡
      '$route' (to, from) {
        if (from.name == null) {
          this.virtualTaskStack.push(to.name)
          console.log('当前任务栈1', this.virtualTaskStack)
          return
        }
        const routerType = to.params.routerType
        if (routerType === 'push') {
          // 跳转
          this.virtualTaskStack.push(to.name)
          this.transitionName = 'fold-left'
        } else {
          // 后退
          this.virtualTaskStack.pop()
          this.transitionName = 'fold-right'
        }

        /**
         * 初始化虚拟任务栈
         */
        if (to.params.clearTaskStack) {
          this.virtualTaskStack = ['Main']
        }
        console.log('当前任务栈', this.virtualTaskStack)
      }
    }
  }
</script>
<style lang="scss">
  .fold-left-enter-active {
    animation: fold-left-in 1s linear;
  }

  // push 页面时：新页面的进入动画
  @keyframes fold-left-in {
    0% {
      transform: translate3d(100%, 0, 0) scale3d(.9, .9, 1);
    }
    20% {
      transform: translate3d(100%, 0, 0) scale3d(.9, .9, 1);
    }
    40% {
      transform: translate3d(100%, 0, 0) scale3d(.9, .9, 1);
    }
    60% {
      transform: translate3d(0, 0, 0) scale3d(.9, .9, 1);
    }
    80% {
      transform: translate3d(0, 0, 0) scale3d(.9, .9, 1);
    }
    100% {
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    }
  }

  .fold-left-leave-active {
    animation: fold-left-out 1s linear;
  }

  // push 页面时：原页面的退出动画
  @keyframes fold-left-out {
    0% {
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    }
    20% {
      transform: translate3d(0, 0, 0) scale3d(.9, .9, 1);
    }
    40% {
      transform: translate3d(0, 0, 0) scale3d(.9, .9, 1);
    }
    60% {
      transform: translate3d(-100%, 0, 0) scale3d(.9, .9, 1);
    }
    100% {
      transform: translate3d(-100%, 0, 0) scale3d(.9, .9, 1);
    }
  }

  .fold-right-enter-active {
    animation: fold-right-in 1s linear;
  }

  // 后退页面时：即将展示页面的动画
  @keyframes fold-right-in {
    0% {
      transform: translate3d(-100%, 0, 0) scale3d(.9, .9, 1);
    }
    20% {
      transform: translate3d(-100%, 0, 0) scale3d(.9, .9, 1);
    }
    40% {
      transform: translate3d(-100%, 0, 0) scale3d(.9, .9, 1);
    }
    60% {
      transform: translate3d(0, 0, 0) scale3d(.9, .9, 1);
    }
    80% {
      transform: translate3d(0, 0, 0) scale3d(.9, .9, 1);
    }
    100% {
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    }
  }

  .fold-right-leave-active {
    animation: fold-right-out 1s linear;
  }

  // 后退页面时：后退页面的动画
  @keyframes fold-right-out {
    0% {
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    }
    20% {
      transform: translate3d(0, 0, 0) scale3d(.9, .9, 1);
    }
    40% {
      transform: translate3d(0, 0, 0) scale3d(.9, .9, 1);
    }
    60% {
      transform: translate3d(100%, 0, 0) scale3d(.9, .9, 1);
    }
    100% {
      transform: translate3d(100%, 0, 0) scale3d(.9, .9, 1);
    }
  }

  #app {
    width: 100%;
    height: 100%;
    background: #dcdcdc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
