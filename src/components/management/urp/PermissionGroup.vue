<template>
  <div class="permission-group">
    <el-card v-loading="loading">
      <div class="crud-role">
        <el-button size="small" type="success" @click="addPermissionGroupClick">添加权限组</el-button>
        <el-button size="small" type="primary" @click="init">刷新</el-button>
      </div>
      <el-table size="small" :data="permissionGroupData">
        <el-table-column width="100px" label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="组名称" align="center" prop="name"></el-table-column>
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
                title="此操作将删除组内所有权限，是否删除该组？"
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

    <el-dialog title="权限组信息" :visible.sync="permissionGroupDetailDialog" width="650px">
      <el-form
        :model="permissionGroupDetail"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="id">
          <el-input v-model="permissionGroupDetail.id"></el-input>
        </el-form-item>
        <el-form-item label="组名称">
          <el-input v-model="permissionGroupDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="组描述">
          <el-input v-model="permissionGroupDetail.description"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="permissionGroupDetail.updateTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="permissionGroupDetail.createTime" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="permissionGroupDetailDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="modifyPermissionGroupClick">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加权限组" :visible.sync="addPermissionGroupDialog" width="650px">
      <el-form
        :model="insertPermissionGroup"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="组名称">
          <el-input v-model="insertPermissionGroup.name"></el-input>
        </el-form-item>
        <el-form-item label="组描述">
          <el-input v-model="insertPermissionGroup.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="addPermissionGroupDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="addPermissionGroupConfirmClick">添加</el-button>
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
  updatePermission,
  deletePermissionById,
  deletePermissions
} from "../../../api/permission";

export default {
  data() {
    return {
      permissionGroupData: [],
      permissionGroupDetail: {},
      insertPermissionGroup: {},
      deletePermissionGroupIds: [],
      allPermissionGroups: [],
      loading: true,
      addPermissionGroupDialog: false,
      permissionGroupDetailDialog: false,
      total: null,
      currentPage: 1,
      pageSize: 7,
    };
  },
  methods: {
    editClick(index, row) {
      this.permissionGroupDetail = { ...row };
      this.permissionGroupDetailDialog = true;
    },
    deleteClick(index, row) {
      deletePermissionGroupById(row.id).then((response) => {
        this.$message({ type: "success", message: response.message });
        this.currentPage = 1;
        this.init();
      });
    },
    addPermissionGroupClick() {
      this.addPermissionGroupDialog = true;
    },
    addPermissionGroupConfirmClick() {
      insertPermissionGroup(this.insertPermissionGroup).then((response) => {
        this.$message({ message: response.message, type: "success" });
        this.addPermissionGroupDialog = false;
        this.insertPermissionGroup = {};
        this.init();
      });
    },
    modifyPermissionGroupClick() {
      updatePermissionGroup(this.permissionGroupDetail).then((response) => {
        this.$message({ message: response.message, type: "success" });
        this.permissionGroupDetailDialog = false;
        this.init();
      });
    },
    currentChange(index) {
      this.currentPage = index;
      this.init();
    },
    init() {
      this.$store.dispatch("changeBreadcrumb", {value: ['URP系统管理', '权限组管理']});
      this.$store.dispatch("changeMenu", { hover: "2-3" });

      this.loading = true;

      listPermissionGroups(this.currentPage, this.pageSize).then((response) => {
        this.permissionGroupData = response.data.content;
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
.role {
  .crud-permission-group {
    margin-bottom: 15px;
  }
}
</style>
