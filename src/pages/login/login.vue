<template>
  <div style="margin: 0 20px">
    <img src="../../assets/LOGO_Keeper.svg" style="height: 100px; padding: 50px 0">
    <!-- Generator: Adobe Illustrator 22.0.0, SVG Export Plug-In  -->
    <mt-field placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field placeholder="请输入密码" type="password" v-model="password" style="margin-bottom: 10px"></mt-field>
    <div style="position: relative; display: flex; justify-content: space-between; margin: 20px 0 40px">
      <span class="link">忘记密码?</span>
      <span class="link" @click="register">去注册</span>
    </div>
    <mt-button size="large" plain @click="login">立即登录</mt-button>

  </div>
</template>

<script>
  import axios from 'axios';
  import { Indicator, Toast } from 'mint-ui';
  import { setStore } from '../../config/mUtils';
  export default {
    data () {
      return {
        username: null,
        password: null
      };
    },
    methods: {
      login () {
        // 发送登录请求，返回token
        Indicator.open({
          text: '登录中...',
          spinnerType: 'fading-circle'
        });
        axios
          .post('/auth/login', {
//            username: this.username,
//            password: this.password
          }, {
            params: {
              username: this.username,
              password: this.password
            }
          })
          .then((resp) => {
            // resp 即token
            this.$router.push({path: 'main'});
            setStore('token', resp.data);
            setStore('username', this.username);
            Indicator.close();
          })
          .catch((e) => {
            Indicator.close();
            let message;
            if (e.response.status === 403) {
              message = '用户名或密码错误';
            } else {
              message = '网络错误，请重试！';
            }
            this.toggleToast(message);
          });
      },
      register () {
        Indicator.open({
          text: '注册中...',
          spinnerType: 'fading-circle'
        });
        axios
          .post('/auth/sign-in', {}, {
            params: {
              username: this.username,
              password: this.password,
              doLogin: true
            }
          })
          .then((resp) => {
            // resp 即token
            this.$router.push({path: 'main'});
            setStore('token', resp.data);
            setStore('username', this.username);
            Indicator.close();
          })
          .catch((e) => {
            Indicator.close();
            let message;
            if (e.response.status === 400) {
              message = '该账户已被注册！';
            } else {
              message = '网络错误，请重试！';
            }
            this.toggleToast(message);
          });
      },
      toggleToast (message) {
        Toast({
          message,
          position: 'bottom',
          duration: 3000
        });
      }
    }
  };
</script>

<style>

  .st0{fill:#020202;}
  .st1{fill:#010101;}
  .st2{opacity:0.26;}

  .mint-field {
    background-color: transparent !important;
  }
  .mint-cell-wrapper {
    border-bottom: 1px solid #333;
    padding: 0;
  }
  input {
    /*去掉auto-fill颜色*/
    box-shadow: 0 0 0 50px whitesmoke inset;
  }
  input:-webkit-autofill {
    background-color: transparent !important;
  }
  span.link {
    font-size: 14px;
    color: gray;
  }
  span.link:active {
    text-decoration: underline;
    color: grey;
  }
</style>
