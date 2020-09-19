<template>
  <div class="role-permission">
    <el-card v-loading="loading">
      <el-button size="small" @click="back">返回</el-button>
      <el-button size="small" @click="reload" type="warning">重载</el-button>
      <el-button size="small" @click="clear" type="danger">清除</el-button>
      <el-button size="small" @click="save" type="success">保存</el-button>
      <br />
      <br />
      <div style="border: 1px solid #DCDFE6;">
        <div v-for="(group, index) in permissionGroups" :key="index">
          <el-row style="background: #f2f6f8;height: 50px;">
            <el-checkbox style="margin: 15px" @change="handleCheckAllChange(group)" :indeterminate="isIndeterminate(group.id)" v-model="group.checked">
              {{group.name}}
            </el-checkbox>
          </el-row>
          <br>
          <el-row>
            <span style="margin: 15px;" v-for="(permission, index) in getPermissionsByGroupId(group.id)" :key="index">
              <el-checkbox v-model="permission.checked" @change="handleCheckChange(permission)">
                <span style="line-height: 25px">{{permission.description}}</span>
              </el-checkbox>
            </span>
          </el-row>
          <br>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  listPermissions,
  listPermissionGroups,
  listPermissionGroupDTO,
  listPermissionsByGroupId
} from "../../../api/permission";
import { listPermissionsByRoleId, updateRolePermissions } from "../../../api/role";

export default {
  data() {
    return {
      roleId: null,
      loading: false,
      permissions: [],
      permissionGroups: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    save() {
      let updateIds = []
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].checked === true) {
          updateIds.push(this.permissions[i].id)
        }
      }
      updateRolePermissions(this.roleId, updateIds).then(response => {
        this.$message({type: 'success', message: response.message})
        this.init()
      })
    },
    clear() {
      for (let i = 0; i < this.permissions.length; i++) {
        this.permissions[i].checked = false
      }
      for (let i = 0; i < this.permissionGroups.length; i++) {
        this.permissionGroups[i].checked = false
      }
      this.$forceUpdate()
    },
    reload() {
      this.init();
    },
    isIndeterminate(groupId) {
      let groupPermissions = this.getPermissionsByGroupId(groupId)
      if (groupPermissions === null) {
        return false;
      }
      let count = 0;
      for (let i = 0; i < groupPermissions.length; i++) {
        if (groupPermissions[i].checked === true) {
          count++;
        }
      }
      if (count === 0) {
        return false;
      }
      return count === groupPermissions.length
    },
    handleCheckAllChange(group) {
      let groupPermissions = this.getPermissionsByGroupId(group.id)
      for (let i = 0; i < groupPermissions.length; i++) {
        groupPermissions[i].checked = group.checked
      }
      this.$forceUpdate()
    },
    getPermissionsByGroupId(groupId) {
      let ps = []
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].groupId === groupId) {
          ps.push(this.permissions[i])
        }
      }
      return ps
    },
    checkAll(groupId) {
      let groupPermissions = this.getPermissionsByGroupId(groupId)
      let count = 0
      if (groupPermissions === null || groupPermissions.length === 0) {
        return false;
      }
      for (let i = 0; i < groupPermissions.length; i++) {
        if (groupPermissions[i].checked === true) {
          count++;
        }
      }
      if (count === 0) {
        return false;
      }
      return count === groupPermissions.length
    },
    handleCheckChange(permission) {
      for (let i = 0; i < this.permissionGroups.length; i++) {
        if (permission.groupId === this.permissionGroups[i].id) {
          this.permissionGroups[i].checked = this.checkAll(this.permissionGroups[i].id)
        }
      }
      this.$forceUpdate();
    },
    funListPermissions() {
      listPermissions(0, 0).then(response => {
        this.permissions = response.data.content;
        for (let i = 0; i < this.permissions.length; i++) {
          this.permissions[i].checked = false
        }
        this.funListPermissionGroups()
      })
    },
    funListPermissionGroups() {
      listPermissionGroups().then(response => {
        this.permissionGroups = response.data.content;
        for (let i = 0; i < this.permissionGroups.length; i++) {
          this.permissionGroups[i].checked = false
        }
        this.funListPermissionsByRoleId()
      })
    },
    funListPermissionsByRoleId() {
      listPermissionsByRoleId(this.roleId).then(response => {
        let rolePermissions = response.data;
        for (let i = 0; i < rolePermissions.length; i++) {
          for (let j = 0; j < this.permissions.length; j++) {
            if (rolePermissions[i].id === this.permissions[j].id) {
              this.permissions[j].checked = true;
            }
          }
        }
        this.$forceUpdate();
      })

    },
    init() {this.loading = true

      this.$store.dispatch("changeBreadcrumb", {value: ['URP系统管理', '角色管理', '添加权限']});
      this.$store.dispatch("changeMenu", {hover: '2-2'});

      this.roleId = this.$route.query.roleId;

      this.funListPermissions()
      this.loading = false
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss">
</style>
