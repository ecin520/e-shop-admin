import request from '../utils/request'

export function countRoles() {
  return request({
    url: '/api/urp/admin/role/count',
    method: 'GET'
  })
}

export function listRoles(pageNum, pageSize) {
  return request({
    url: '/api/urp/admin/role/list',
    method: 'GET',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

export function updateRole(role) {
  return request({
    url: '/api/urp/admin/role/update',
    method: 'PUT',
    data: role
  })
}

export function insertRole(role) {
  return request({
    url: '/api/urp/admin/role/insert',
    method: 'POST',
    data: role
  })
}

export function deleteRoles(roleIds) {
  return request({
    url: '/api/urp/admin/role/delete/list',
    method: 'DELETE',
    data: roleIds
  })
}

export function listPermissionsByRoleId(roleId) {
  return request({
    url: '/api/urp/admin/role/permissions',
    method: 'GET',
    params: {
      roleId: roleId
    }
  })
}

export function updateRolePermissions(roleId, permissionIds) {
  return request({
    url: '/api/urp/admin/role/permissions/update/' + roleId,
    method: 'PUT',
    data: permissionIds
  })
}
