<template>
  <div class="login">
    <TopBar title="登录" @left-click="back"/>
    <div class="input-wrapper">
      <form action="#">
        <input class="username input" autocomplete="off" placeholder="用户名/邮箱/手机号" type="text">
        <input class="password input" autocomplete="off" placeholder="请输入密码" type="password">
      </form>
      <p class="forget" @click="incomplete">忘记密码？</p>
    </div>
    <div class="login-button" @click="incomplete">登录</div>
    <p class="register" @click="register">去注册</p>
    <img class="logo" src="./images/jd-logo.png">
  </div>
</template>

<script>
  import TopBar from 'components/top-bar'
  import EventBus from 'js/event-bus'

  export default {
    name: 'Login',
    components: {
      TopBar
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      register () {
        this.$router.push({
          name: 'Register',
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

  .login {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: $title-font-size;
    background: #f5f5f5;

    .input-wrapper {
      display: flex;
      flex-direction: column;
      background: #fff;
      padding: $margin-size $margin-size px2rem(20px);
      margin-top: $margin-size;

      form {
        width: 100%;
        overflow: hidden;
      }

      .input {
        width: 100%;
        outline: none;
        line-height: px2rem(40px);
        margin-top: $margin-size;
        font-size: px2rem(16px);
        padding: 0 px2rem(10px);
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, .1);

        &::-webkit-input-placeholder {
          color: $hint-color;
        }
      }

      .forget {
        margin-top: px2rem(20px);
        font-size: $min-info-font-size;
        text-align: right;
      }
    }

    .login-button {
      width: 85%;
      text-align: center;
      font-weight: bold;
      border-radius: px2rem(5px);
      padding: px2rem(16px);
      margin: px2rem(50px) auto px2rem(20px);
      font-size: $title-font-size;
      background: #e4393c;
      color: #fff;
    }

    .register {
      width: 85%;
      margin: px2rem(20px) auto;
      color: $hint-color;
      font-size: $info-font-size;
      text-align: right;
    }

    .logo {
      display: block;
      margin: px2rem(25px) auto;
      width: px2rem(100px);
      height: px2rem(20px);
    }
  }
</style>
