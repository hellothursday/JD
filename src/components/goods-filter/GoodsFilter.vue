<template>
  <div>
    <ul class="goods-filter">
      <li class="filter-item" v-for="(item,index) in optionList" :key="index"
          :class="{ active : index === current }" @click="selectItem(item, index)">
        {{itemText(item)}}
        <i class="arrow" :class="{ active : item.expand }" v-if="hasSub(item)"></i>
        <transition name="slide">
          <ul class="sub-list" v-if="hasSub(item)" v-show="item.expand">
            <li class="sub-item" v-for="(subItem,index) in item.options" :key="subItem.id"
                :class="{ active : index === item.selected }" @click.stop="selectSubItem(item, index)">
              <span class="text">{{subItem.name}}</span><span class="icon"></span>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
    <transition name="fade">
      <div class="mask" v-show="showMask" @click="hideMask"></div>
    </transition>
  </div>
</template>

<script>
  const FILTER_TYPE = ['default', 'price', 'sales', 'isHave', 'isDirect']
  export default {
    name: 'GoodsFilter',
    data () {
      return {
        current: 0, // 当前选中的一级列表的选项
        optionList: [
          {
            selected: 0, // 选中 options 中的第 0 个选项
            expand: false, // 是否展开二级列表
            options: [
              {
                id: 0,
                name: '默认'
              },
              {
                id: 1,
                name: '价格由高到低'
              },
              {
                id: 2,
                name: '销量由高到低'
              }
            ]
          },
          {
            selected: 0,
            expand: false,
            options: [
              {
                id: 3,
                name: '有货优先'
              }
            ]
          },
          {
            selected: 0,
            expand: false,
            options: [
              {
                id: 4,
                name: '直营优先'
              }
            ]
          }
        ]
      }
    },
    computed: {
      showMask () {
        return this.optionList.some(item => {
          return item.expand
        })
      }
    },
    methods: {
      // 一级选项点击事件
      selectItem (item, index) {
        if (index !== this.current) {
          this.optionList[this.current].expand = false // 将当前展开的二级列表收缩回去

          const typeId = item.options[item.selected].id
          this.$emit('change', FILTER_TYPE[typeId])
        } else if (item.options.length > 1) {
          item.expand = !item.expand
        }
        this.current = index
      },
      // 二级选项点击事件
      selectSubItem (item, index) {
        if (index !== item.selected) {
          item.selected = index
          const typeId = item.options[item.selected].id
          this.$emit('change', FILTER_TYPE[typeId])
        }
        item.expand = false // 收缩二级列表
      },
      itemText (item) {
        return item.options[item.selected].name
      },
      hasSub (item) {
        return item.options.length > 1
      },
      hideMask () {
        this.optionList.forEach((item) => {
          item.expand = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide .3s;
  }

  .slide-leave-active {
    animation: slide .3s reverse;
  }

  @keyframes slide {
    0% {
      max-height: 0;
    }
    100% {
      max-height: px2rem(200px);
    }
  }

  .goods-filter {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: px2rem(46px);
    font-size: $info-font-size;
    border-bottom: 1px solid $line-color;
    background: #fff;

    .filter-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33.333%;
      height: 100%;
      text-align: center;
      line-height: px2rem(46px);

      &.active {
        color: $main-color;
      }

      .arrow {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: $margin-size;
        border-left: px2rem(6px) solid transparent;
        border-right: px2rem(6px) solid transparent;
        border-top: px2rem(8px) solid $main-color;

        &.active {
          border-top: none;
          border-bottom: px2rem(8px) solid $main-color;
        }
      }

      .sub-list {
        width: 100%;
        position: absolute;
        left: 0;
        top: px2rem(47px);
        overflow: hidden;
        color: #333;
        background: #fff;

        .sub-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid $line-color;
          padding: 0 $margin-size;

          &:last-child {
            border-bottom: none;
          }

          &.active {
            .text {
              color: $main-color;
            }

            .icon {
              display: block;
            }
          }

          .icon {
            display: none;
            width: px2rem(18px);
            height: px2rem(18px);
            background: url("./images/options-select.svg") no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }

  .mask {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    top: px2rem(68px);
    background: rgba(0, 0, 0, .4);
  }
</style>
