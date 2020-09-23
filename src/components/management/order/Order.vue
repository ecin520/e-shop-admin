<template>
  <div class="order">
    <el-card v-loading="loading">
      <el-row>
        <el-button class="operate-item" style="float: right" size="small" type="primary" @click="clear">清空</el-button>
        <el-button class="operate-item" style="float: right" size="small" @click="searchOrder">搜索</el-button>
        <el-input clearable v-model="searchParam.orderNumber" class="operate-item" style="width: 180px" size="small"
                  placeholder="订单号搜索"></el-input>
        <el-date-picker
          class="operate-item"
          style="top: 1px"
          size="small"
          v-model="searchParam.time"
          type="datetimerange"
          range-separator="-"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-select clearable v-model="searchParam.status" class="operate-item" style="width: 100px" size="small"
                   placeholder="订单状态">
          <el-option
            v-for="item in [0, 1, 2, 3, 4, 5]"
            :key="item"
            :label="getStatus(item)"
            :value="item">
          </el-option>
        </el-select>
      </el-row>
      <br>
      <el-table size="small" :data="orderList">
        <el-table-column :show-overflow-tooltip="true" label="ID" align="center" prop="id"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="订单号" align="center" prop="orderNumber"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="会员id" align="center" prop="memberId"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="运费" align="center" prop="freight"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="总价" align="center" prop="totalPrice"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="订单来源" align="center" prop="orderSource"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="支付方式" align="center" prop="payType">
          <template slot-scope="scope">
            <el-tag effect="plain">{{getPayType(scope.row.payType)}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" label="状态" align="center" prop="status">
          <template slot-scope="scope">
            <el-tag effect="plain">{{getStatus(scope.row.status)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="订单类型" align="center" prop="orderType">
          <template slot-scope="scope">
            <el-tag effect="plain">{{getOrderType(scope.row.orderType)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="支付时间" align="center" prop="payTime"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="更新时间" align="center" prop="updateTime"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="创建时间" align="center" prop="createTime"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="success">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="float: right;min-height: 50px;margin-top: 20px;"
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-count="total / pageSize + 1"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {listOrdersByParam} from "../../../api/order";

  export default {
    name: "Order",
    data() {
      return {
        loading: null,
        total: null,
        currentPage: 1,
        pageSize: 7,
        searchParam: {},
        orderList: []
      }
    },
    methods: {
      clear() {
        this.searchParam = []
      },
      currentChange(index) {
        this.currentPage = index;
        this.init()
      },
      searchOrder() {
        if (this.searchParam.time !== undefined && this.searchParam.time !== null) {
          listOrdersByParam({
            pageNum: this.currentPage, pageSize: this.pageSize, queryParam: {
              orderNumber: this.searchParam.orderNumber,
              status: this.searchParam.status,
              startTime: this.searchParam.time[0],
              endTime: this.searchParam.time[1]
            }
          }).then(response => {
            this.total = response.data.total
            this.orderList = response.data.content
          })
        } else {
          listOrdersByParam({
            pageNum: this.currentPage, pageSize: this.pageSize, queryParam: {
              orderNumber: this.searchParam.orderNumber,
              status: this.searchParam.status
            }
          }).then(response => {
            this.total = response.data.total
            this.orderList = response.data.content
          })
        }

      },
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
            return '代发货';
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
        this.$store.dispatch("changeBreadcrumb", {value: ['订单管理', '订单管理']});
        listOrdersByParam({pageNum: this.currentPage, pageSize: this.pageSize, queryParam: {}}).then(response => {
          this.total = response.data.total
          this.orderList = response.data.content
        })
      },
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
  .order {
    .operate-item {
      margin: 5px;
    }
  }
</style>
