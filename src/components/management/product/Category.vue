<template>
  <div class="cateory">
    <el-card v-loading="loading">
      <div class="crud-cateory">
        <el-button size="small" type="success" @click="addCategoryClick">添加分类</el-button>
        <el-button size="small" type="primary" @click="init">刷新</el-button>
      </div>
      <el-table size="small" :data="categoryData">
        <el-table-column width="100px" label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="分类名称" align="center" prop="name"></el-table-column>
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

    <el-dialog title="分类信息" :visible.sync="categoryDetailDialog" width="650px">
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
          <el-input style="width: 200px" type="textarea" :rows="3" v-model="categoryDetail.description"></el-input>
        </el-form-item>
        <el-form-item label="产品数量">
          <el-input v-model="categoryDetail.count"></el-input>
        </el-form-item>
        <el-form-item label="绑定规格">
          <el-select style="width: 494px" v-model="productSpecIds" multiple>
            <el-option
              v-for="item in productSpecList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
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
        <el-form-item label="分类详情">
          <el-button type="primary" @click="$router.push({path: '/category-detail', query: {id: categoryDetail.id, name: categoryDetail.name}})">编辑分类详情</el-button>
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

    <el-dialog title="添加商品分类" :visible.sync="addCategoryDialog" width="650px">
      <el-form
        :model="insertCategory"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="分类名称">
          <el-input v-model="insertCategory.name"></el-input>
        </el-form-item>
        <el-form-item label="图片/图标">
          <el-input v-model="insertCategory.showImage"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input type="textarea" :rows="2" v-model="insertCategory.description"></el-input>
        </el-form-item>
        <el-form-item label="绑定规格">
          <el-select style="width: 494px" v-model="productSpecIds" multiple>
            <el-option
              v-for="item in productSpecList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="addCategoryDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="addCategoryConfirmClick">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listProductCategories,
    insertProductCategory,
    updateProductCategory,
    deleteProductCategoryById,
    listProductSpecsByCategoryId,
    updateProductCategorySpecs
  } from "../../../api/category";
  import {listProductSpecs} from "../../../api/spec";

  export default {
    data() {
      return {
        categoryData: [],
        categoryDetail: {},
        insertCategory: {},
        loading: true,
        addCategoryDialog: false,
        categoryDetailDialog: false,
        total: null,
        currentPage: 1,
        pageSize: 7,
        productSpecList: [],
        productSpecIds: []
      };
    },
    methods: {
      editClick(index, row) {
        this.categoryDetail = {...row};
        listProductSpecsByCategoryId(row.id).then(response => {
          let specList = response.data
          this.productSpecIds = []
          for (let i = 0; i < specList.length; i++) {
            this.productSpecIds.push(specList[i].id)
          }
        })
        this.categoryDetailDialog = true;
      },
      deleteClick(index, row) {
        deleteProductCategoryById(row.id).then(response => {
          this.$message({type: 'success', message: response.message})
          if ((this.total - 1)%this.pageSize === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.init()
        })
      },
      addCategoryClick() {
        this.productSpecIds = []
        this.addCategoryDialog = true;
      },
      updateProductCategorySpec(categoryId) {
        updateProductCategorySpecs(categoryId, this.productSpecIds).then(response => {
          this.$message({message: response.message, type: "success"});
        })
      },
      addCategoryConfirmClick() {
        insertProductCategory(this.insertCategory).then((response) => {
          if (response.code === 200) {
            this.addCategoryDialog = false;
            this.updateProductCategorySpec(response.data.id);
            this.insertCategory = {};
            this.init();
          } else {
            this.$message({message: response.message, type: "error"});
          }
        });
      },
      modifyCategoryDetailClick() {
        updateProductCategory(this.categoryDetail).then(response => {
          if (response.code === 200) {
            this.updateProductCategorySpec(this.categoryDetail.id)
            this.categoryDetailDialog = false;
            this.init();
          } else {
            this.$message({message: response.message, type: "error"});
          }

        })
      },
      currentChange(index) {
        this.currentPage = index;
        this.init();
      },
      init() {

        this.$store.dispatch("changeBreadcrumb", {value: ['商品管理', '分类管理']});
        this.$store.dispatch("changeMenu", {hover: '3-2'});

        this.loading = true;

        listProductCategories(this.currentPage, this.pageSize, '').then((response) => {
          this.categoryData = response.data.content;
          this.total = response.data.total;
          this.loading = false;
        });

        listProductSpecs({pageNum: 0, pageSize: 0, queryParam: {standard: 1}}).then(response => {
          this.productSpecList = response.data.content
        })

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
