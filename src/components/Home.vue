<template>
<div class="home">
  <el-container>
    <el-aside class="home-aside">
      <el-menu :default-active="defaultActive" :unique-opened="true" background-color="#353b41" text-color="#fff" active-text-color="#78b1e8" class="el-menu-vertical" :collapse="this.$store.getters.isCollapse">
        <div class="home-aside-logo">
          <img style="margin: 3px" width="55px" src="../assets/header.png" />
          <a class="home-aside-logo-name" v-show="!this.$store.getters.isCollapse">E-SHOP管理后台</a>
        </div>
<!--        <span style="display: block;height: 1px;margin-top: -25px;">
          <el-divider></el-divider>
        </span>-->
        <p style="color: #78b1e8"></p>
        <el-menu-item index="1" @click="homePage">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">URP系统管理</span>
          </template>
          <el-menu-item index="2-1" @click="userPage"><i class="el-icon-user-solid"></i>用户管理</el-menu-item>
          <el-menu-item index="2-2" @click="rolePage"><i class="el-icon-user"></i>角色管理</el-menu-item>
          <el-menu-item index="2-3" @click="permissionGroupPage"><i class="el-icon-turn-off"></i>权限组管理</el-menu-item>
          <el-menu-item index="2-4" @click="permissionPage"><i class="el-icon-circle-close"></i>权限管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item index="3-1" @click="productPage"><i class="el-icon-goods"></i>商品管理</el-menu-item>
          <el-menu-item index="3-2" @click="categoryPage"><i class="el-icon-orange"></i>分类管理</el-menu-item>
          <el-menu-item index="3-3" @click="specPage"><i class="el-icon-box"></i>规格管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item index="4-1" @click="orderPage"><i class="el-icon-s-order"></i>订单管理</el-menu-item>
          <el-menu-item index="4-2" @click="returnReasonPage"><i class="el-icon-s-shop"></i>退货原因</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-sold-out"></i>
            <span slot="title">营销管理</span>
          </template>
          <el-menu-item index="5-1" @click=""><i class="el-icon-sold-out"></i>营销管理</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-medal"></i>
            <span slot="title">商家管理</span>
          </template>
          <el-menu-item index="6-1" @click="shopPage"><i class="el-icon-s-shop"></i>店铺管理</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-monitor"></i>
            <span slot="title">系统监控</span>
          </template>
          <el-menu-item index="7-1" @click="accessLog"><i class="el-icon-pie-chart"></i>访问日志</el-menu-item>
          <el-menu-item index="7-2" @click="errorLog"><i class="el-icon-error"></i>异常日志</el-menu-item>
          <el-menu-item index="7-3" @click="dataMonitor"><i class="el-icon-c-scale-to-original"></i>数据监控</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span slot="title">工具</span>
          </template>
          <el-menu-item index="8-1" @click="documentApiPage"><i class="el-icon-document"></i>Api文档</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="home-header">
        <div class="home-header-breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <span class="home-header-collapse" @click="collapse">
              <i style="font-size: 1.6em" :class="this.$store.getters.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>&nbsp;&nbsp;
            </span>
            <el-breadcrumb-item class="home-header-breadcrumb-item" v-for="(item, index) in breadcrumb" :key="index">
              {{item}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="home-header-dropdown">
          <el-dropdown trigger="click" @command="handleCommand">
              <span class="home-header-dropdown-avatar">
                <el-avatar :size="45" :src="avatar"></el-avatar>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal" icon="el-icon-user">个人中心</el-dropdown-item>
              <el-dropdown-item command="setting" icon="el-icon-setting">设置</el-dropdown-item>
              <el-dropdown-item command="logout" icon="el-icon-pear">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="home-main" :style="'height: ' + (height - 50) + 'px'">
        <transition mode="out-in" name="fade">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>

  </el-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      height: document.body.clientHeight,
      logo: 'http://www.pytap.com/source/1598607028415.png'
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.$store.dispatch('logout')
          this.$router.push('/login')
          break;
        case 'personal':
          this.breadcrumb = ['个人中心']
          this.$router.push('/personal')
      }
    },
    collapse() {
      this.$store.dispatch("collapse")
    },
    getHeight() {
      this.height = document.body.clientHeight
    },
    homePage() {
      this.breadcrumb = ['首页']
    },
    userPage() {
      this.$store.dispatch("changeBreadcrumb", {value: ['URP系统管理', '用户管理']});
      this.$router.push({path: '/user'})
    },
    rolePage() {
      this.$store.dispatch("changeBreadcrumb", {value: ['URP系统管理', '角色管理']});
      this.$router.push({path: '/role'})
    },
    permissionPage() {
      this.$store.dispatch("changeBreadcrumb", {value: ['URP系统管理', '权限管理']});
      this.$router.push({path: '/permission'})
    },
    permissionGroupPage() {
      this.$store.dispatch("changeBreadcrumb", {value: ['URP系统管理', '权限组管理']});
      this.$router.push({path: '/permission-group'})
    },
    productPage() {
      this.$store.dispatch("changeBreadcrumb", {value: ['商品管理', '商品管理']});
      this.$router.push({path: '/product'})
    },
    categoryPage() {
      this.$store.dispatch("changeBreadcrumb", {value: ['商品管理', '分类管理']});
      this.$router.push({path: '/category'})
    },
    specPage() {
      this.$store.dispatch("changeBreadcrumb", {value: ['商品管理', '规格管理']});
      this.$router.push({path: '/spec'})
    },
    orderPage() {
      this.$store.dispatch("changeBreadcrumb", {value: ['订单管理', '订单管理']});
      this.$router.push({path: '/order'})
    },
    returnReasonPage() {
      this.$store.dispatch("changeBreadcrumb", {value: ['订单管理', '退货原因']});
      this.$router.push({path: '/return-reason'})
    },
    shopPage() {
      this.$store.dispatch("changeBreadcrumb", {value: ['商家管理', '店铺管理']});
      this.$router.push({path: '/shop'})
    },
    accessLog() {
      this.$store.dispatch("changeBreadcrumb", {value: ['系统监控', '访问日志']});
      this.$router.push({path: '/web-log'})
    },
    errorLog() {
      this.$store.dispatch("changeBreadcrumb", {value: ['系统监控', '异常日志']});
      this.$router.push({path: '/error-log'})
    },
    dataMonitor() {
      this.$store.dispatch("changeBreadcrumb", {value: ['系统监控', '数据监控']});
      this.$router.push({path: '/data-monitor'})
    },
    documentApiPage() {
      this.$store.dispatch("changeBreadcrumb", {value: ['工具', 'Api文档']});
      this.$router.push({path: '/tool-document'})
    }
  },
  mounted() {
    window.addEventListener("resize", this.getHeight)
    this.getHeight()
    this.breadcrumb = ['首页']
  },
  computed: {
    avatar() {
      return this.$store.getters.getUserInfo.avatar
    },
    username() {
      return this.$store.getters.getUserInfo.username
    },
    defaultActive() {
      return this.$store.getters.getMenu
    },
    breadcrumb() {
      return this.$store.getters.getBreadcrumb
    }
  },
  watch:{

  }
};
</script>

<style lang="scss">



.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}

.home {

  min-width: 950px;

  .home-main {
    background-color: #70aecd;
  }

  .home-header {
    max-height: 50px;
    display: flex;
    justify-content: space-between;
    .home-header-collapse {
      float: left;
    }

    .home-header-collapse:hover {
      cursor: pointer;
    }

    .home-header-dropdown {
      margin-top: 3px;

      .home-header-dropdown-avatar:hover {
        cursor: pointer;
        outline: none;
      }
    }
    .home-header-breadcrumb {
      margin-top: 15px;

      .home-header-breadcrumb-item {
        font-size: 1.2em;
        margin-top: 2px;
        font-weight: 900;
      }
    }
  }
  .home-aside {
    width: auto !important;
    display: flex;
    flex-direction: column;

    .home-aside-logo {


      .home-aside-logo-name {
        position: absolute;
        top: 20px;
        color: white;
        width: 130px;
      }

    }
    .el-menu-vertical:not(.el-menu--collapse) {
      width: 230px;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .el-menu {
      flex: 1;
      overflow: inherit;
      border-right: none;

      &::-webkit-scrollbar {
        display: none;
      }

    }
  }
}
</style>
