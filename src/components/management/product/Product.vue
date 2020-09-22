<template>
  <div class="product">
    <el-card v-loading="loading">
      <el-row>
        <el-button class="operate-item" style="float: right" size="small" type="success" @click="addProductClick">添加商品
        </el-button>
        <el-button class="operate-item" style="float: right" size="small" type="primary" @click="clear">清空</el-button>
        <el-button class="operate-item" style="float: right" size="small" @click="searchProduct">搜索</el-button>
        <el-input v-model="searchParam.name" class="operate-item" style="width: 180px" size="small"
                  placeholder="商品名称搜索"></el-input>
        <el-input v-model="searchParam.shopName" class="operate-item" style="width: 180px" size="small"
                  placeholder="店铺名称搜索"></el-input>
        <el-input v-model="searchParam.productCategoryDetailName" class="operate-item" style="width: 180px" size="small"
                  placeholder="分类名称搜索"></el-input>
        <el-input v-model="searchParam.itemNo" class="operate-item" style="width: 180px" size="small"
                  placeholder="货号搜索"></el-input>
        <el-select clearable v-model="searchParam.verifyStatus" class="operate-item" style="width: 100px" size="small"
                   placeholder="审核状态">
          <el-option
            v-for="item in [{status: 0, value: '未审核'}, {status: 1, value: '已通过'}, {status: 2, value: '不通过'}]"
            :key="item.status"
            :label="item.value"
            :value="item.status">
          </el-option>
        </el-select>
        <el-select clearable v-model="searchParam.shelfStatus" class="operate-item" style="width: 100px" size="small"
                   placeholder="上架状态">
          <el-option
            v-for="item in [{status: 0, value: '未上架'}, {status: 1, value: '已上架'}]"
            :key="item.status"
            :label="item.value"
            :value="item.status">
          </el-option>
        </el-select>
      </el-row>
      <br>
      <el-table size="small" :data="productList">
        <el-table-column width="100px" label="ID" align="center" prop="id"></el-table-column>
        <el-table-column width="100px" label="首页图片" align="center" prop="showImage">
          <template slot-scope="scope">
            <el-avatar shape="square" :size="40" fit="cover" :src="imageUrl(scope.$index, scope.row)"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="name"></el-table-column>
        <el-table-column width="90px" label="审核状态" align="center" prop="verifyStatus">
          <template slot-scope="scope">
            <el-button size="small" class="pointer" @click="verifyProduct(scope.row)" type="warning"
                       v-if="scope.row.verifyStatus === 0">{{
              getVerifyStatus(scope.row.verifyStatus) }}
            </el-button>
            <el-button size="small" class="pointer" @click="verifyProduct(scope.row)" type="success"
                       v-else-if="scope.row.verifyStatus === 1">{{ getVerifyStatus(scope.row.verifyStatus) }}
            </el-button>
            <el-button size="small" class="pointer" @click="verifyProduct(scope.row)" v-else type="danger">{{
              getVerifyStatus(scope.row.verifyStatus) }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="商品sku" align="center" prop="">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="skuEditClick(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="店铺" align="center" prop="shopName"></el-table-column>
        <el-table-column label="分类详情" align="center" prop="productCategoryDetailName"></el-table-column>
        <el-table-column label="价格" align="center" prop="price"></el-table-column>
        <el-table-column label="删除状态" align="center" prop="deleteStatus">
          <template slot-scope="scope">
            <el-switch
              :disabled="true"
              :value="scope.row.deleteStatus === 1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="上架状态" align="center" prop="shelfStatus">
          <template slot-scope="scope">
            <el-switch
              :disabled="true"
              :value="scope.row.shelfStatus === 1"
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
        <el-table-column align="center" width="120px" label="操作">
          <template slot-scope="scope">
            <el-col :span="12">
              <el-button size="mini" type="primary" @click="editProductClick(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-col>
            <el-col :span="12">
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

    <el-dialog :visible.sync="skuDetailDialog" width="650px">
      <span style="color: #0e91b8" slot="title">{{productName}}</span>
      <el-table style="max-height: 500px;overflow: auto;" border size="small" :data="skuList">
        <el-table-column align="center" prop="name" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="price" label="价格">
          <template slot-scope="scope">
            <el-input style="width: 80px" size="small" v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="stock" label="库存">
          <template slot-scope="scope">
            <el-input style="width: 80px" size="small" v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="stock" label="展示图片">
          <template slot-scope="scope">
            <el-upload
              class="avatar-uploader"
              action="#"
              :http-request="changeSkuAvatar.bind(this, scope)"
              :show-file-list="false">
              <el-avatar shape="square" fit="cover" :size="35" :src="scope.row.showImage"></el-avatar>
            </el-upload>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button size="small" type="default" @click="skuDetailDialog = false">取消</el-button>
        <el-button size="small" type="danger" @click="modifySkuListClick">修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {listProducts, getProduct, listSkuProducts, updateSkuProductList} from "../../../api/product";

  export default {
    name: "Product",
    data() {
      return {
        productList: [],
        loading: null,
        total: null,
        currentPage: 1,
        pageSize: 7,
        searchParam: {
          name: null,
          shopName: null,
          productCategoryDetailName: null,
          itemNo: null,
          deleteStatus: null,
          shelfStatus: null,
          verifiStatus: null
        },
        skuDetailDialog: false,
        productName: '',
        skuList: []
      }
    },
    methods: {
      currentChange(index) {
        this.currentPage = index;
        this.init()
      },
      clear() {
        this.searchParam = {
          name: null,
          shopName: null,
          productCategoryDetailName: null,
          itemNo: null,
          deleteStatus: null,
          shelfStatus: null,
          verifiStatus: null
        }
      },
      modifySkuListClick() {
        updateSkuProductList(this.skuList).then(response => {
          if (response.code === 200) {
            this.$message({type: 'success', message: response.message})
            this.skuDetailDialog = false;
          } else {
            this.$message({type: 'error', message: response.message})
          }
        })

      },
      changeSkuAvatar(scope, data) {
        let formdata = new FormData();
        formdata.append('file', data.file);

        this.$axios({
          url: 'http://www.pytap.com/api/file/imageUpload',
          method: 'post',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          this.$message({message: '上传成功', type: 'success'})
          scope.row.showImage = response.data.content
        }).catch(error => {
          console.log(error)
        });
      },
      verifyProduct(row) {
        this.$message({type: 'success', message: row.verifyStatus + '待审核'})
      },
      addProductClick() {
        this.$router.push({path: '/shop'})
      },
      editProductClick(index, row) {
        this.$router.push({
          path: '/product-edit',
          query: {productId: row.id, shopId: row.shopId, shopName: row.shopName}
        })
      },
      getVerifyStatus(status) {
        if (status === 0) {
          return '未审核'
        } else if (status === 1) {
          return '已通过'
        } else if (status === 2) {
          return '不通过'
        }
      },
      searchProduct() {
        this.productList = []
        if (this.searchParam.itemNo !== '' && this.searchParam.itemNo !== null) {
          this.loading = true;
          this.currentPage = 1;
          getProduct({itemNo: this.searchParam.itemNo}).then(response => {
            this.productList.push(response.data)
            this.loading = false;
            this.total = 1;
          })
          return;
        }

        this.loading = true;
        this.currentPage = 1;
        let queryParam = {
          pageNum: 1,
          pageSize: this.pageSize,
          queryParam: {
            name: this.searchParam.name,
            shopName: this.searchParam.shopName,
            productCategoryDetailName: this.searchParam.productCategoryDetailName,
            itemNo: this.searchParam.itemNo,
            deleteStatus: this.searchParam.deleteStatus,
            shelfStatus: this.searchParam.shelfStatus,
            verifyStatus: this.searchParam.verifyStatus
          }
        }
        listProducts(queryParam).then(response => {
          this.productList = response.data.content;
          this.total = response.data.total;
          this.loading = false;
        })
      },
      deleteClick(index, row) {

      },
      skuEditClick(index, row) {
        listSkuProducts({pageNum: 0, pageSize: 0, queryParam: {productId: row.id}}).then(response => {
          this.skuList = response.data.content;
          this.productName = row.name
          this.skuDetailDialog = true;
        })
      },
      imageUrl(index, row) {
        let pics = (row.showImage || "").split(",");
        return pics[0]
      },
      init() {

        this.$store.dispatch("changeBreadcrumb", {value: ['商品管理', '商品管理']});
        this.$store.dispatch("changeMenu", {hover: '3-1'});

        this.loading = true

        let queryParam = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          queryParam: {
            name: this.searchParam.name,
            shopName: this.searchParam.shopName,
            productCategoryDetailName: this.searchParam.productCategoryDetailName,
            itemNo: this.searchParam.itemNo,
            deleteStatus: this.searchParam.deleteStatus,
            shelfStatus: this.searchParam.shelfStatus,
            verifyStatus: this.searchParam.verifyStatus
          }
        }

        listProducts(queryParam).then(response => {
          this.productList = response.data.content;
          this.total = response.data.total;
          this.loading = false;
        })
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
  .product {
    .operate-item {
      margin: 5px;
    }

    .crud-product {

    }
  }
</style>
