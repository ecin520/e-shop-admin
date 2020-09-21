<template>
  <div class="shop">
    <el-card v-loading="loading">
      <div class="crud-shop">
        <el-button size="small" type="success" @click="addShopDialog = true">添加店铺</el-button>
        <el-button size="small" type="primary" @click="init">刷新</el-button>
      </div>

      <el-table size="small" :data="shopList">
        <el-table-column width="100px" label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="店铺名称" align="center" prop="name"></el-table-column>
        <el-table-column label="产品数量" align="center" prop="productCount"></el-table-column>
        <el-table-column label="排名" align="center" prop="rank"></el-table-column>
        <el-table-column label="热度" align="center" prop="hot"></el-table-column>
        <el-table-column label="收藏数" align="center" prop="collection"></el-table-column>
        <el-table-column label="显示状态" align="center" prop="showStatus">
          <template slot-scope="scope">
            <el-switch
              :disabled="true"
              :value="scope.row.showStatus === 1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column align="center" width="160px" label="操作">
          <template slot-scope="scope">
            <el-col :span="8">
              <el-button size="mini" type="warning" @click="addProductClick(scope.$index, scope.row)">
                <i class="el-icon-shopping-bag-2"></i>
              </el-button>
            </el-col>
            <el-col :span="8">
              <el-button size="mini" type="primary" @click="editClick(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-col>
            <el-col :span="8">
              <el-popconfirm
                confirmButtonText="删除"
                cancelButtonText="取消"
                confirmButtonType="danger"
                cancelButtonType="default"
                icon="el-icon-info"
                iconColor="red"
                title="此操作不可逆，是否删除该分类？"
                @onConfirm="deleteClick(scope.$index, scope.row)"
              >
                <el-button slot="reference" size="mini" type="danger">
                  <i class="el-icon-delete-solid"></i>
                </el-button>
              </el-popconfirm>
            </el-col>
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

    <el-dialog title="添加店铺" :visible.sync="addShopDialog" width="650px">
      <el-form
        :model="insertShop"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="店铺名称">
          <el-input v-model="insertShop.name"></el-input>
        </el-form-item>
        <el-form-item label="Logo">
          <el-input v-model="insertShop.logo"></el-input>
        </el-form-item>
        <el-form-item label="展示图片">
          <el-input v-model="insertShop.showImage"></el-input>
        </el-form-item>
        <el-form-item label="店铺描述">
          <el-input style="width: 200px" type="textarea" :rows="2" v-model="insertShop.description"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            v-model="insertShop.showStatus"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="addShopDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="addShopConfirmClick">添加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="店铺详情" :visible.sync="shopDetailDialog" width="650px">
      <el-form
        :model="shopDetail"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="id">
          <el-input v-model="shopDetail.id"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input v-model="shopDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="产品数量">
          <el-input v-model="shopDetail.productCount"></el-input>
        </el-form-item>
        <el-form-item label="排名">
          <el-input v-model="shopDetail.rank"></el-input>
        </el-form-item>
        <el-form-item label="热度">
          <el-input v-model="shopDetail.hot"></el-input>
        </el-form-item>
        <el-form-item label="收藏数">
          <el-input v-model="shopDetail.collection"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input disabled v-model="shopDetail.updateTime"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input disabled v-model="shopDetail.createTime"></el-input>
        </el-form-item>
        <el-form-item label="Logo">
          <el-input v-model="shopDetail.logo"></el-input>
        </el-form-item>
        <el-form-item label="展示图片">
          <el-input v-model="shopDetail.showImage"></el-input>
        </el-form-item>
        <el-form-item label="店铺描述">
          <el-input style="width: 200px" type="textarea" :rows="2" v-model="shopDetail.description"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            v-model="shopDetail.showStatus"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="shopDetailDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="modifyShopDetailConfirmClick">修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {listShops, insertShop, updateShop} from "../../../api/shop";

  export default {
    data() {
      return {
        loading: true,
        total: null,
        currentPage: 1,
        pageSize: 7,
        addShopDialog: false,
        shopDetailDialog: false,
        insertShop: {},
        shopList: [],
        shopDetail: {}
      }
    },
    methods: {
      currentChange(index) {
        this.currentPage = index;
        this.init();
      },
      addProductClick(index, row) {
        this.$router.push({path: '/product-add', query: {shopId: row.id, shopName: row.name}})
      },
      addShopConfirmClick() {
        insertShop(this.insertShop).then(response => {
          if (response.code === 200) {
            this.$message({message: response.message, type: "success"});
            this.addShopDialog = false;
            this.insertShop = {};
            this.init();
          } else {
            this.$message({message: response.message, type: "error"});
          }
        })
      },
      deleteClick(index, row) {

      },
      editClick(index, row) {
        this.shopDetail = {...row}
        this.shopDetailDialog = true
      },
      modifyShopDetailConfirmClick() {
        updateShop(this.shopDetail).then(response => {
          if (response.code === 200) {
            this.$message({message: response.message, type: "success"});
            this.shopDetailDialog = false;
            this.init();
          } else {
            this.$message({message: response.message, type: "error"});
          }
        })
      },
      init() {

        this.$store.dispatch("changeMenu", {hover: '6-1'});
        this.$store.dispatch("changeBreadcrumb", {value: ['商家管理', '店铺管理']});

        this.loading = true
        listShops(this.currentPage, this.pageSize, '').then(response => {
          this.shopList = response.data.content
          this.total = response.data.total
          this.loading = false
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
