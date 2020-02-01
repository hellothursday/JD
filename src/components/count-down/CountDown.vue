<template>
  <div class="count-down">
    <span class="end-time">{{endHour}}点场</span>
    <span class="surplus">{{surplus | formatTime}}</span>
  </div>
</template>

<script>
  export default {
    name: 'CountDown',
    props: {
      endHour: {
        type: Number,
        required: true,
        default: 0
      }
    },
    data () {
      return {
        surplus: '',
        diffSeconds: 0
      }
    },
    created () {
      this.computedSurplusTime()
    },
    methods: {
      computedSurplusTime () {
        if (this.interval) {
          clearInterval(this.interval)
        }
        const date = new Date()
        const hour = date.getHours()
        if (hour > this.endHour) {
          this.surplus = '活动已结束'
        } else if (hour === this.endHour) {
          this.surplus = '活动进行中'
        } else {
          const diffHours = this.endHour - hour - 1
          const diffMinutes = 60 - date.getMinutes() - 1
          const diffSeconds = 60 - date.getSeconds()
          this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds
          this.interval = setInterval(() => {
            this.diffSeconds -= 1
          }, 1000)
        }
      }
    },
    watch: {
      diffSeconds (newValue) {
        const hours = Math.floor(newValue / 3600)
        const minutes = Math.floor(newValue / 60) % 60
        const seconds = newValue % 60
        this.surplus = hours + ':' + minutes + ':' + seconds

        if (newValue === 0) {
          this.computedSurplusTime()
        }
      },
      endHour () {
        this.computedSurplusTime()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .count-down {
    display: inline-block;
    height: px2rem(20px);
    font-size: 0;
    margin-left: $margin-size;

    span {
      display: inline-block;
      padding: px2rem(2px) px2rem(4px);
      box-sizing: border-box;
      font-size: $info-font-size;
      border: px2rem(1px) solid $main-color;
    }

    .end-time {
      background-color: $main-color;
      border-top-left-radius: px2rem(4px);
      border-bottom-left-radius: px2rem(4px);
      color: #fff;
    }

    .surplus {
      background-color: #fff;
      border-top-right-radius: px2rem(4px);
      border-bottom-right-radius: px2rem(4px);
      color: $main-color;
    }
  }
</style>
