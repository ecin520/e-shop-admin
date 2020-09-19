<template>
  <div class="cateory">
    <el-card v-loading="loading">
      <div class="crud-cateory">
        <el-button size="small" type="success" @click="addSpecClick">添加规格</el-button>
        <el-button size="small" type="primary" @click="init">刷新</el-button>
      </div>
      <el-table size="small" :data="specData">
        <el-table-column width="100px" label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="规格名称" align="center" prop="name"></el-table-column>
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

    <el-dialog title="规格信息" :visible.sync="specDetailDialog" width="650px">
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
        <el-form-item label="规格描述">
          <el-input style="width: 200px" type="textarea" :rows="5" v-model="specDetail.description"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="specDetail.updateTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="specDetail.createTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="规格详情">
          <el-button type="primary" @click="$router.push({path: '/spec-detail', query: {id: specDetail.id, name: specDetail.name}})">编辑规格详情</el-button>
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

    <el-dialog title="添加商品规格" :visible.sync="addSpecDialog" width="650px">
      <el-form
        :model="insertSpec"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="规格名称">
          <el-input v-model="insertSpec.name"></el-input>
        </el-form-item>
        <el-form-item label="规格描述">
          <el-input type="textarea" :rows="2" v-model="insertSpec.description"></el-input>
        </el-form-item>
        <el-form-item label="标准规格">
          <el-switch
            v-model="insertSpec.standard"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="addSpecDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="addSpecConfirmClick">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listProductSpecs,
    insertProductSpec,
    updateProductSpec,
    deleteProductSpecById
  } from "../../../api/spec";

  export default {
    data() {
      return {
        specData: [],
        specDetail: {},
        insertSpec: {},
        loading: true,
        addSpecDialog: false,
        specDetailDialog: false,
        total: null,
        currentPage: 1,
        pageSize: 7,
      };
    },
    methods: {
      editClick(index, row) {
        this.specDetail = {...row};
        this.specDetailDialog = true;
      },
      deleteClick(index, row) {
        deleteProductSpecById(row.id).then(response => {
          this.$message({type: 'success', message: response.message})
          if ((this.total - 1)%this.pageSize === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.init()
        })
      },
      addSpecClick() {
        this.addSpecDialog = true;
      },
      addSpecConfirmClick() {
        insertProductSpec(this.insertSpec).then((response) => {
          if (response.code === 200) {
            this.$message({message: response.message, type: "success"});
            this.addSpecDialog = false;
            this.insertSpec = {};
            this.init();
          } else {
            this.$message({message: response.message, type: "error"});
          }

        });
      },
      modifySpecDetailClick() {
        updateProductSpec(this.specDetail).then(response => {
          this.$message({message: response.message, type: "success"});
          this.specDetailDialog = false;
          this.init();
        })
      },
      currentChange(index) {
        this.currentPage = index;
        this.init();
      },
      init() {

        this.$store.dispatch("changeBreadcrumb", {value: ['商品管理', '规格管理']});
        this.$store.dispatch("changeMenu", {hover: '3-3'});

        this.loading = true;

        listProductSpecs({pageNum: this.currentPage, pageSize: this.pageSize, queryParam: {}}).then((response) => {
          this.specData = response.data.content;
          this.total = response.data.total;
          this.loading = false;
        });

      },
    },
    mounted() {
      this.init();
    },
  };
</script>

<style lang="scss">
  .cateory {
    .crud-cateory {
      margin-bottom: 15px;
    }
  }
</style>
