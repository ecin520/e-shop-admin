<template>
<div class="login">
  <el-card class="login-card">
    <p class="login-title">E-Mall管理后台</p>
    <el-input class="login-item" prefix-icon="el-icon-user" placeholder="username" v-model="username"></el-input>
    <el-input show-password class="login-item" prefix-icon="el-icon-lock" placeholder="password" v-model="password"></el-input>

    <el-button v-loading="loading" class="login-item" type="primary" @click="loginClick">登录</el-button>
    <div class="remember-me">
       <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
    </div>
  </el-card>
</div>
</template>

<script>

import {login} from '../../api/status'

export default {
  data() {
    return {
      imageUrl: "http://106.15.200.82/source/1585296275841.jpg",
      username: "",
      password: "",
      code: "",
      codeUrl: '',
      loading: false,
      rememberMe: false
    };
  },
  methods: {
    loginClick() {

      let that = this

      this.loading = true;

      if (this.username === "" || this.password === "") {
        this.$message({
          message: "请输入正确格式",
          type: "error"
        });
        this.loading = false;
        return;
      }


      login(this.username, this.password).then(response => {
          if (response.code === 200) {
            this.$message({message: "欢迎进入E-Mall后台管理系统",type: "success"});
            console.log(response.data.accessToken);
            this.$store.dispatch("login", {
              token: response.data.oauth.accessToken,
              refreshToken: response.data.oauth.refreshToken,
              userInfo: response.data.userInfo,
              rememberMe: that.rememberMe
            });
            console.log(response)
            this.loading = false;
            this.$router.push({path: '/'});
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });

    }
  },
  created() {

    let that = this;
    document.onkeydown = e => {
      let key = window.event.keyCode;
      if (key === 13) {
        that.loginClick();
      }
    };

  }
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  display: flex;
  justify-content: center;
  padding-top: 170px;
  width: 100%;
//   height: 100%;
  background-position: center center;
  background-size: cover;
//   background: linear-gradient(90deg,#0e91b8,#19aad5);;

  .login-card {
    padding: 10px;
    width: 400px;
    height: 350px;
    border: none;
    background: transparent;
    // background: #0277bd;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
    cursor: pointer;

    .login-title {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      text-align: center;
      color: deepskyblue;
      font-size: 1.5em;
    }

    .login-logo {
      width: 50%;
      margin-left: 20%;
    }

    .login-item {
      margin-bottom: 26px;
      width: 100%;
    }

    .check-code {
      float: right;
      width: 120px;
      border: 1.5px solid #1fc8db;
      border-radius: 4px;
    }

    .check-code:hover {
      cursor: pointer;
    }

    .remember-me {
        margin-left:2px;
    }
  }
}
</style>
