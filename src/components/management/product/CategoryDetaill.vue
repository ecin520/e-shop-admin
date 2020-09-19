<template>
  <div class="cateory-detail">
    <el-card v-loading="loading">
      <div class="crud-cateory-detail">
        <el-button size="small" @click="back">返回</el-button>
        <el-button size="small" @click="init" type="warning">重载</el-button>
        <el-button size="small" @click="insertCategoryDetailDialog = true" type="success">添加详情</el-button>
      </div>
      <el-table :empty-text="categoryName" size="small" :data="categoryDetaillList">
        <el-table-column width="100px" label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="分类" align="center">
          <template slot-scope="scope">
            <el-tag effect="plain" type="danger">{{categoryName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="分类详情名称" align="center" prop="name"></el-table-column>
        <el-table-column label="产品数量" align="center" prop="count"></el-table-column>
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
        <el-table-column align="center" width="120px" label="操作">
          <template slot-scope="scope">
            <el-col :span="12">
              <el-button size="mini" type="primary" @click="editClick(scope.$index, scope.row)">
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

    <el-dialog title="分类详情信息" :visible.sync="categoryDetailDialog" width="650px">
      <el-form
        :model="categoryDetail"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="id">
          <el-input v-model="categoryDetail.id"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="categoryDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input style="width: 200px" type="textarea" :rows="5" v-model="categoryDetail.description"></el-input>
        </el-form-item>
        <el-form-item label="产品数量">
          <el-input v-model="categoryDetail.count"></el-input>
        </el-form-item>
        <el-form-item label="图片/图标">
          <el-input v-model="categoryDetail.showImage"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="categoryDetail.updateTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="categoryDetail.createTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="显示状态">
          <el-switch
            v-model="categoryDetail.showStatus"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="categoryDetailDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="modifyCategoryDetailClick">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加商品分类详情" :visible.sync="insertCategoryDetailDialog" width="650px">
      <el-form
        :model="insertCategoryDetail"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="分类名称">
          <el-input v-model="insertCategoryDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="图片/图标">
          <el-input v-model="insertCategoryDetail.showImage"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input type="textarea" :rows="2" v-model="insertCategoryDetail.description"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            v-model="insertCategoryDetail.showStatus"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="insertCategoryDetailDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="insert">添加</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    listProductCategoryDetailByCategoryId,
    insertProductCategoryDetail,
    updateProductCategoryDetail,
    deleteProductCategoryDetailById
  } from "../../../api/category";

  export default {
    name: "CategoryDetaill",
    data() {
      return {
        loading: false,
        categoryId: null,
        categoryName: null,
        categoryDetaillList: [],
        categoryDetail: {},
        insertCategoryDetail: {},
        insertCategoryDetailDialog: false,
        categoryDetailDialog: false,
        total: null,
        currentPage: 1,
        pageSize: 10,
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      editClick(index, row) {
        this.categoryDetail = {...row};
        this.categoryDetailDialog = true;
      },
      insert() {
        this.insertCategoryDetail.productCategoryId = this.categoryId
        insertProductCategoryDetail(this.insertCategoryDetail).then(response => {
          this.$message({type: 'success', message: response.message})
          this.insertCategoryDetail = {}
          this.insertCategoryDetailDialog = false;
          this.init()
        })
      },
      deleteClick(index, row) {
        deleteProductCategoryDetailById(row.id).then(response => {
          this.$message({type: 'success', message: response.message})
          if ((this.total - 1)%this.pageSize === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.init()
        })
      },
      modifyCategoryDetailClick() {
        updateProductCategoryDetail(this.categoryDetail).then(response => {
          this.$message({type: 'success', message: response.message})
          this.categoryDetail = {}
          this.categoryDetailDialog = false;
          this.init()
        })
      },
      currentChange(index) {
        this.currentPage = index;
        this.init();
      },
      init() {

        this.$store.dispatch("changeBreadcrumb", {value: ['商品管理', '分类管理', '分类详情']});
        this.$store.dispatch("changeMenu", {hover: '3-2'});

        this.categoryId = this.$route.query.id
        this.categoryName = this.$route.query.name
        listProductCategoryDetailByCategoryId(this.currentPage, this.pageSize, this.categoryId).then(response => {
          this.categoryDetaillList = response.data.content
          this.total = response.data.total
        })
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style lang="scss">
  .cateory-detail {
    .crud-cateory-detail {
      margin-bottom: 15px;
    }
  }
</style>
