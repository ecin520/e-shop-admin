<template>
  <div class="cateory-detail">
    <el-card v-loading="loading">
      <div class="crud-cateory-detail">
        <el-button size="small" @click="back">返回</el-button>
        <el-button size="small" @click="init" type="warning">重载</el-button>
        <el-button size="small" @click="insertSpecDetailDialog = true" type="success">添加详情</el-button>
      </div>
      <el-table :empty-text="specName" size="small" :data="specDetaillList">
        <el-table-column width="100px" label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="规格" align="center">
          <template slot-scope="scope">
            <el-tag effect="plain" type="danger">{{specName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="规格详情名称" align="center" prop="name"></el-table-column>
        <el-table-column label="标准规格" align="center" prop="standard">
          <template slot-scope="scope">
            <el-switch
              :disabled="true"
              :value="scope.row.standard === 1"
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
                title="此操作不可逆，是否删除该规格？"
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

    <el-dialog title="规格详情信息" :visible.sync="specDetailDialog" width="650px">
      <el-form
        :model="specDetail"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="id">
          <el-input v-model="specDetail.id"></el-input>
        </el-form-item>
        <el-form-item label="规格名称">
          <el-input v-model="specDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="specDetail.updateTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="specDetail.createTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标准规格">
          <el-switch
            v-model="specDetail.standard"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="specDetailDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="modifySpecDetailClick">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加商品规格详情" :visible.sync="insertSpecDetailDialog" width="650px">
      <el-form
        :model="insertSpecDetail"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="详情名称">
          <el-input v-model="insertSpecDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="标准规格">
          <el-switch
            v-model="insertSpecDetail.standard"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="insertSpecDetailDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="insert">添加</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    listProductSpecDetails,
    insertProductSpecDetail,
    updateProductSpecDetail,
    deleteProductSpecDetailById
  } from "../../../api/spec";

  export default {
    name: "SpecDetaill",
    data() {
      return {
        loading: false,
        specId: null,
        specName: null,
        specDetaillList: [],
        specDetail: {},
        insertSpecDetail: {},
        insertSpecDetailDialog: false,
        specDetailDialog: false,
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
        this.specDetail = {...row};
        this.specDetailDialog = true;
      },
      insert() {
        this.insertSpecDetail.productSpecId = this.specId
        insertProductSpecDetail(this.insertSpecDetail).then(response => {
          this.$message({type: 'success', message: response.message})
          this.insertSpecDetail = {}
          this.insertSpecDetailDialog = false;
          this.init()
        })
      },
      deleteClick(index, row) {
        deleteProductSpecDetailById(row.id).then(response => {
          this.$message({type: 'success', message: response.message})
          if ((this.total - 1)%this.pageSize === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.init()
        })
      },
      modifySpecDetailClick() {
        updateProductSpecDetail(this.specDetail).then(response => {
          this.$message({type: 'success', message: response.message})
          this.specDetail = {}
          this.specDetailDialog = false;
          this.init()
        })
      },
      currentChange(index) {
        this.currentPage = index;
        this.init();
      },
      init() {

        this.$store.dispatch("changeBreadcrumb", {value: ['商品管理', '规格管理']});
        this.$store.dispatch("changeMenu", {hover: '3-3'});

        this.specId = this.$route.query.id
        this.specName = this.$route.query.name
        listProductSpecDetails(this.currentPage, this.pageSize, this.specId).then(response => {
          this.specDetaillList = response.data.content
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
