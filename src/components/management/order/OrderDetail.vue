<template>
  <div class="order-detail">
    <el-card style="padding: 60px">

      <h3>&nbsp;订单信息</h3>
      <el-table border :data="[{}]">
        <el-table-column align="center" label="id"><template>{{orderDetail.id}}</template></el-table-column>
        <el-table-column align="center" label="订单号"><template>{{orderDetail.orderNumber}}</template></el-table-column>
        <el-table-column align="center" label="运费"><template>{{orderDetail.freight}}</template></el-table-column>
        <el-table-column align="center" label="总价格"><template>{{orderDetail.totalPrice}}</template></el-table-column>
        <el-table-column align="center" label="支付类型"><template>{{getPayType(orderDetail.payType)}}</template></el-table-column>
        <el-table-column align="center" label="状态"><template>{{getStatus(orderDetail.status)}}</template></el-table-column>
        <el-table-column align="center" label="订单类型"><template>{{getOrderType(orderDetail.orderType)}}</template></el-table-column>
        <el-table-column align="center" label="支付时间"><template>{{orderDetail.payTime}}</template></el-table-column>
        <el-table-column align="center" label="更新时间"><template>{{orderDetail.updateTime}}</template></el-table-column>
        <el-table-column align="center" label="创建时间"><template>{{orderDetail.createTime}}</template></el-table-column>
      </el-table>

      <h3>&nbsp;店铺信息</h3>
      <el-table border :data="[{}]">
        <el-table-column align="center" label="id"><template>{{orderDetail.shop.id}}</template></el-table-column>
        <el-table-column align="center" label="订单号"><template>{{orderDetail.shop.name}}</template></el-table-column>
        <el-table-column align="center" label="店铺Logo"><template>{{orderDetail.shop.logo}}</template></el-table-column>
        <el-table-column align="center" label="产品数量"><template>{{orderDetail.shop.productCount}}</template></el-table-column>
        <el-table-column align="center" label="排名"><template>{{orderDetail.shop.rank}}</template></el-table-column>
        <el-table-column align="center" label="热度"><template>{{orderDetail.shop.hot}}</template></el-table-column>
        <el-table-column align="center" label="收藏数"><template>{{orderDetail.shop.collection}}</template></el-table-column>
      </el-table>

      <h3>&nbsp;会员信息</h3>
      <el-table border :data="[{}]">
        <el-table-column align="center" label="id"><template>{{orderDetail.member.id}}</template></el-table-column>
        <el-table-column align="center" label="头像">
          <template>
            <el-avatar :size="40" :src="orderDetail.member.user.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column align="center" label="会员号"><template>{{orderDetail.member.memberNumber}}</template></el-table-column>
        <el-table-column align="center" label="会员名"><template>{{orderDetail.member.username}}</template></el-table-column>
        <el-table-column align="center" label="用户id"><template>{{orderDetail.member.user.id}}</template></el-table-column>
        <el-table-column align="center" label="用户名"><template>{{orderDetail.member.user.username}}</template></el-table-column>
        <el-table-column align="center" label="电话"><template>{{orderDetail.member.user.telephone}}</template></el-table-column>
        <el-table-column align="center" label="邮箱"><template>{{orderDetail.member.user.email}}</template></el-table-column>
        <el-table-column align="center" label="昵称"><template>{{orderDetail.member.user.nickname}}</template></el-table-column>
        <el-table-column align="center" label="状态"><template>{{orderDetail.member.user.status}}</template></el-table-column>
      </el-table>

      <h3>&nbsp;收货地址</h3>
      <el-table border :data="[{}]">
        <el-table-column align="center" label="id"><template>{{orderDetail.receiverAddress.id}}</template></el-table-column>
        <el-table-column align="center" label="收货人"><template>{{orderDetail.receiverAddress.receiverName}}</template></el-table-column>
        <el-table-column align="center" label="联系电话"><template>{{orderDetail.receiverAddress.receiverTel}}</template></el-table-column>
        <el-table-column align="center" label="邮编"><template>{{orderDetail.receiverAddress.receiverPostcode}}</template></el-table-column>
        <el-table-column align="center" label="省"><template>{{orderDetail.receiverAddress.receiverProvince}}</template></el-table-column>
        <el-table-column align="center" label="市"><template>{{orderDetail.receiverAddress.receiverCity}}</template></el-table-column>
        <el-table-column align="center" label="区/县"><template>{{orderDetail.receiverAddress.receiverRegion}}</template></el-table-column>
        <el-table-column align="center" label="详细地址"><template>{{orderDetail.receiverAddress.receiverDetailAddress}}</template></el-table-column>
        <el-table-column align="center" label="是否默认地址"><template>{{orderDetail.receiverAddress.defaultStatus === 1 ? '是' : '否'}}</template></el-table-column>
      </el-table>

      <h3>&nbsp;商品信息</h3>
      <el-table border :data="[{}]">

      </el-table>

    </el-card>
  </div>
</template>

<script>
  import {getOrderVO} from "../../../api/order";

  export default {
    name: "OrderDetail",
    data() {
      return {
        orderDetail: {}
      }
    },
    methods: {
      getPayType(key) {
        switch (key) {
          case 0:
            return '未支付';
          case 1:
            return '支付宝';
          case 2:
            return '微信';
          case 3:
            return '其他';
        }
      },
      getStatus(key) {
        switch (key) {
          case 0:
            return '待付款';
          case 1:
            return '待发货';
          case 2:
            return '已发货';
          case 3:
            return '已完成';
          case 4:
            return '已关闭';
          case 5:
            return '无效订单';
        }
      },
      getOrderType(key) {
        switch (key) {
          case 0:
            return '普通订单';
          case 1:
            return '秒杀订单';
        }
      },
      init() {
        this.$store.dispatch("changeMenu", {hover: "4-1"});
        this.$store.dispatch("changeBreadcrumb", {value: ['订单管理', '订单管理', '订单详情']});

        getOrderVO({id: this.$route.query.orderId}).then(response => {
          this.orderDetail = response.data
        })

      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped>

</style>
