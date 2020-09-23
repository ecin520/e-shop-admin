<template>
  <div class="user">
    <el-card v-loading="loading">
      <el-row>
        <div class="crud-user">
          <el-button size="small" type="success" @click="addUserDialog = true">添加用户</el-button>
          <el-button size="small" type="danger" @click="deleteBatchUserClick">删除用户</el-button>
          <el-button size="small" type="primary" @click="init">刷新</el-button>
          <div style="float: right">
            <el-input v-model="keyword" size="small" style="width: 250px"></el-input>
            <el-button @click="search" size="small">搜索</el-button>
          </div>
        </div>
      </el-row>

      <br/>

      <el-table size="small" @selection-change="handleSelectionChange" :data="userData">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" width="65px" prop="id" label="ID"></el-table-column>
        <el-table-column align="center" width="100px" prop="username" label="用户名"></el-table-column>
        <el-table-column align="center" width="70px" prop="avatar" label="头像">
          <template slot-scope="scope">
            <el-avatar :size="40" :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="telephone" label="手机"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="email" label="邮箱"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="nickname" label="昵称"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="note" label="备注"></el-table-column>
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          prop="updateTime"
          label="更新时间"
        ></el-table-column>
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          prop="createTime"
          label="创建时间"
        ></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="loginTime" label="登陆时间"></el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch
              :disabled="true"
              :value="scope.row.status === 1 ? true : false"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
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
                title="此操作不可逆，是否删除该用户？"
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

    <el-dialog title="用户信息" :visible.sync="userDetailDialog" width="650px">
      <el-form
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
        :model="userDetail"
      >
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :http-request="uploadFile"
            :show-file-list="false">
            <el-avatar :size="35" :src="userDetail.avatar"></el-avatar>
          </el-upload>
        </el-form-item>
        <el-form-item label>
          <el-input style="width: 445px" v-model="userDetail.avatar"></el-input>
        </el-form-item>
        <el-form-item label="id">
          <el-input v-model="userDetail.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userDetail.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userDetail.email"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userDetail.nickname"></el-input>
        </el-form-item>
        <el-form-item label="注释">
          <el-input v-model="userDetail.note"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input :disabled="true" v-model="userDetail.updateTime"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input :disabled="true" v-model="userDetail.createTime"></el-input>
        </el-form-item>
        <el-form-item label="登陆时间">
          <el-input :disabled="true" v-model="userDetail.loginTime"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userDetail.telephone"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="userDetail.status"
            :active-value="1"
            :inactive-value="0"
          >active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="角色">
          <el-select style="width: 495px" v-model="userRoleIds" multiple placeholder="选择角色">
            <el-option
              v-for="item in roleData"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="userDetailDialog = false">取消</el-button>
        <el-button size="small" type="danger" @click="modifyUserClick">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加用户" :visible.sync="addUserDialog" width="650px">
      <el-form
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
        :model="insertUser"
      >
        <el-form-item label="用户名">
          <el-input v-model="insertUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input style="width: 192px" show-password v-model="insertUser.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="insertUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="insertUser.telephone"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="insertUser.nickname"></el-input>
        </el-form-item>
        <el-form-item label="注释">
          <el-input v-model="insertUser.note"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="addUserDialog = false">取消</el-button>
        <el-button size="small" type="success" @click="addUserClick">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    insertUser,
    listUsers,
    getRolesByUsername,
    updateUserRoles,
    updateUser,
    deleteUsers,
    listSearchUsers,
    upload
  } from "../../../api/user";
  import {listRoles} from "../../../api/role";

  export default {
    data() {
      return {
        userData: [],
        userDetail: {},
        insertUser: {},
        roleData: [],
        userRoleIds: [],
        userDetailchangement: null,
        userRoleIdsChangement: null,
        deleteUserIds: [],
        loading: true,
        userDetailDialog: false,
        deleteDialog: false,
        addUserDialog: false,
        total: null,
        currentPage: 1,
        pageSize: 7,
        keyword: ''
      };
    },
    methods: {
      search() {
        this.loading = true;
        listSearchUsers(this.currentPage, this.pageSize, this.keyword).then(response => {
          this.userData = response.data.content;
          this.total = response.data.total
          this.loading = false;
        })
      },
      currentChange(index) {
        this.currentPage = index;
        this.init();
      },
      editClick(index, row) {
        this.userRoleIds = [];
        getRolesByUsername(row.username).then((response) => {
          response.data.forEach((element) => {
            this.userRoleIds.push(element.id);
          });
          this.userRoleIdsChangement = JSON.stringify(this.userRoleIds);
        });
        this.userDetailDialog = true;
        this.userDetail = {...row};
        this.userDetailchangement = JSON.stringify(row);
      },
      addUserClick() {
        insertUser(this.insertUser).then((response) => {
          if (response.code === 200) {
            this.$message({message: response.message, type: "success"});
            this.addUserDialog = false;
            this.insertUser = {};
            this.init();
          } else {
            this.$message({message: response.message, type: "error"});
          }

        });
      },
      modifyUserClick() {
        let flag = false;
        if (JSON.stringify(this.userRoleIds) !== this.userRoleIdsChangement) {
          updateUserRoles(this.userDetail.id, this.userRoleIds).then(
            (response) => {
              this.$message({message: response.message, type: "success"});
              this.userDetailDialog = false;
              this.init();
            }
          );
          flag = true;
        }
        if (JSON.stringify(this.userDetail) !== this.userDetailchangement) {
          updateUser(this.userDetail).then((response) => {
            this.$message({message: response.message, type: "success"});
            this.userDetailDialog = false;
            this.init();
          });
          flag = true;
        }
        if (!flag) {
          this.$message({message: "未作出修改", type: "warning"});
        }
      },
      handleSelectionChange(row) {
        this.deleteUserIds = [];
        row.forEach((element) => {
          this.deleteUserIds.push(element.id);
        });
      },
      deleteBatchUserClick() {
        if (this.deleteUserIds.length === 0) {
          this.$notify({
            title: "warning",
            message: "未选择任何选项",
            type: "warning",
            showClose: false,
            position: 'bottom-right'
          });
          return;
        }
        this.$confirm("此操作将永久删除用户, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }).then(() => {
          deleteUsers(this.deleteUserIds).then((response) => {
            this.$message({message: response.message, type: "success"});
            this.userDetailDialog = false;
            this.currentPage = 1;
            this.init();
          });
        });
      },
      deleteClick(index, row) {
        deleteUsers([row.id]).then((response) => {
          this.$message({message: response.message, type: "success"});
          if ((this.total - 1) % this.pageSize === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.init();
        });
      },
      uploadFile(data) {

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
          this.userDetail.avatar = response.data.content
        }).catch(error => {
          console.log(error)
        });

      },
      init() {
        this.$store.dispatch("changeMenu", {hover: "2-1"});
        this.$store.dispatch("changeBreadcrumb", {value: ['URP系统管理', '用户管理']});
        this.loading = true;
        listUsers(this.currentPage, this.pageSize).then((response) => {
          this.userData = response.data.content;
          this.total = response.data.total
          this.loading = false;
        });
        listRoles(0, 0).then((response) => {
          this.roleData = response.data.content;
        });
      },
    },
    mounted() {
      this.init();
    },
    computed: {},
    watch: {},
  };
</script>

<style lang="scss">
</style>
