<template>
  <div class="my">
    <TopBar title="我的" :show-back="false"/>
    <div class="content">
      <div class="profile" @click="gotoLogin">
        <img class="avatar" src="./images/avater.png">
        <p class="text">登录/注册</p>
      </div>
      <ul class="my-list">
        <li class="my-item" v-for="(subList, index) in myList" :key="index">
          <ul class="sub-list">
            <li class="sub-item" @click="incomplete" v-for="(item,index) in subList" :key="index">
              <span class="text">{{item}}</span>
              <img class="icon" src="./images/right-arrow.svg">
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import TopBar from 'components/top-bar'
  import EventBus from 'js/event-bus'

  export default {
    name: 'My',
    components: {
      TopBar
    },
    data () {
      return {
        myList: [
          [
            '全部订单',
            '我的预约',
            '应用推荐',
            '用户福利'
          ],
          [
            '优惠券',
            '礼品卡',
            '京豆',
            '全部资产'
          ],
          ['商品收藏',
            '店铺收藏',
            '我的足迹'
          ]
        ]
      }
    },
    methods: {
      gotoLogin () {
        this.$router.push({
          name: 'Login',
          params: {
            routerType: 'push'
          }
        })
      },
      incomplete () {
        EventBus.$emit('incomplete')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~scss/index.scss";

  .my {
    width: 100%;
    height: 100%;
    position: relative;

    .content {
      position: absolute;
      width: 100%;
      top: px2rem(45px);
      bottom: 0;
      overflow: hidden;
      overflow-y: scroll;
      padding-bottom: px2rem(50px);
    }

    .profile {
      display: flex;
      align-items: center;
      margin-top: $margin-size;
      padding: $margin-size;
      background: #fff;

      .avatar {
        flex: 0 0 px2rem(52px);
        width: px2rem(52px);
        height: px2rem(52px);
      }

      .text {
        font-size: $title-font-size;
        margin-left: $margin-size;
      }
    }

    .my-list {
      width: 100%;

      .my-item {
        margin-top: $margin-size;
        width: 100%;
        box-sizing: border-box;
        background: #fff;

        .sub-list {
          width: 100%;

          .sub-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: $margin-size;
            border-bottom: 1px solid rgba(0, 0, 0, .1);

            &:last-child {
              border-bottom: none;
            }

            .text {
              line-height: px2rem(35px);
              font-size: $info-font-size;
            }

            .icon {
              width: px2rem(16px);
              height: px2rem(16px);
            }
          }
        }
      }
    }
  }
</style>
