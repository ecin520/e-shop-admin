<template>
  <div class="permission">
    <el-card v-loading="loading">
      <div class="crud-permission">
        <el-button size="small" type="success" @click="addPermissionClick">添加权限</el-button>
        <el-button size="small" type="primary" @click="init">刷新</el-button>
      </div>
      <el-table size="small" :data="permissionData">
        <el-table-column width="100px" label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="权限名称" align="center" prop="name"></el-table-column>
        <el-table-column label="描述" align="center" prop="description"></el-table-column>
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
                title="此操作不可逆，是否删除该权限信息？"
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

    <el-dialog title="权限信息" :visible.sync="permissionDetailDialog" width="650px">
      <el-form
        :model="permissionDetail"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="id">
          <el-input v-model="permissionDetail.id"></el-input>
        </el-form-item>
        <el-form-item label="权限名称">
          <el-input v-model="permissionDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="permissionDetail.description"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="permissionDetail.updateTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="permissionDetail.createTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="权限组">
          <el-select style="width: 200px" v-model="permissionDetail.groupId" placeholder="选择权限组">
            <el-option
              v-for="item in permissionGroupData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="permissionDetailDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="modifyPermissionClick">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加权限" :visible.sync="addPermissionDialog" width="650px">
      <el-form
        :model="insertPermission"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="权限名称">
          <el-input v-model="insertPermission.name"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="insertPermission.description"></el-input>
        </el-form-item>
        <el-form-item label="权限组">
          <el-select style="width: 200px" v-model="insertPermission.groupId" placeholder="选择权限组">
            <el-option
              v-for="item in permissionGroupData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="addPermissionDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="addPermissionConfirmClick">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    countPermissionGroup,
    listPermissionGroups,
    deletePermissionGroupById,
    updatePermissionGroup,
    insertPermissionGroup,
    countPermission,
    insertPermission,
    listPermissions,
    updatePermission,
    deletePermissionById,
    deletePermissions
  } from "../../../api/permission";

  export default {
    data() {
      return {
        permissionData: [],
        permissionDetail: {},
        insertPermission: {},
        deletePermissionIds: [],
        permissionPermissions: [],
        permissionGroupData: [],
        allPermissions: [],
        loading: true,
        addPermissionDialog: false,
        permissionDetailDialog: false,
        total: 7,
        currentPage: 1,
        pageSize: 7,
      };
    },
    methods: {
      editClick(index, row) {
        this.permissionDetail = {...row}
        this.permissionDetailDialog = true;
      },
      deleteClick(index, row) {
        this.deletePermissionIds.push(row.id)
        deletePermissions(this.deletePermissionIds).then(response => {
          this.$message({type: 'success', message: response.message})
          this.deletePermissionIds = []
          this.currentPage = 1
          this.init()
        })
      },
      addPermissionClick() {
        this.addPermissionDialog = true;
      },
      addPermissionConfirmClick() {
        insertPermission(this.insertPermission).then((response) => {
          if (response.code === 200) {
            this.$message({message: response.message, type: "success"});
            this.addPermissionDialog = false;
            this.insertPermission = {};
            this.init();
          } else {
            this.$message({message: response.message, type: "error"});
          }
        });
      },
      modifyPermissionClick() {
        updatePermission(this.permissionDetail).then(response => {
          this.$message({message: response.message, type: "success"});
          this.permissionDetailDialog = false;
          this.init();
        })
      },
      currentChange(index) {
        this.currentPage = index;
        this.init();
      },
      init() {

        this.$store.dispatch("changeBreadcrumb", {value: ['URP系统管理', '权限管理']});
        this.$store.dispatch("changeMenu", {hover: '2-4'});

        this.loading = true;

        listPermissions(this.currentPage, this.pageSize).then((response) => {
          this.permissionData = response.data.content;
          this.total = response.data.total;
          this.loading = false;
        });

        listPermissionGroups(0, 0).then(response => {
          this.permissionGroupData = response.data.content;
        })
      },
    },
    mounted() {
      this.init();
    },
  };
</script>

<style lang="scss">
  .permission {
    .crud-permission {
      margin-bottom: 15px;
    }
  }
</style>
