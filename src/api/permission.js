import request from "../utils/request";

export function countPermissionGroup() {
  return request({
    url: "/api/urp/admin/permission/group/count",
    method: "GET"
  });
}

export function listPermissionGroups(pageNum, pageSize) {
  return request({
    url: "/api/urp/admin/permission/group/list",
    method: "GET",
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  });
}

export function deletePermissionGroupById(id) {
  return request({
    url: "/api/urp/admin/permission/group/delete",
    method: "DELETE",
    params: {
      id: id
    }
  });
}

export function updatePermissionGroup(permissionGroup) {
  return request({
    url: "/api/urp/admin/permission/group/update",
    method: "PUT",
    data: permissionGroup
  });
}

export function insertPermissionGroup(permissionGroup) {
  return request({
    url: "/api/urp/admin/permission/group/insert",
    method: "POST",
    data: permissionGroup
  });
}

export function countPermission() {
  return request({
    url: "/api/urp/admin/permission/count",
    method: "GET"
  });
}

export function listPermissions(pageNum, pageSize) {
  return request({
    url: "/api/urp/admin/permission/list",
    method: "GET",
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  });
}

export function insertPermission(permission) {
  return request({
    url: "/api/urp/admin/permission/insert",
    method: "POST",
    data: permission
  });
}

export function updatePermission(permission) {
  return request({
    url: "/api/urp/admin/permission/update",
    method: "PUT",
    data: permission
  });
}

export function deletePermissionById(id) {
  return request({
    url: "/api/urp/admin/permission/delete",
    method: "DELETE",
    params: {
      id: id
    }
  });
}

export function deletePermissions(permissionIds) {
  return request({
    url: "/api/urp/admin/permission/list/delete",
    method: "DELETE",
    data: permissionIds
  });
}

export function listPermissionsByGroupId(id) {
  return request({
    url: "/api/urp/admin/permission/list/group/" + id,
    method: "GET"
  });
}
