import request from '../utils/request'

export function insertUser(user) {
  return request({
    url: '/api/urp/admin/user/insert',
    method: 'POST',
    data: user
  })
}

export function countUser() {
  return request({
    url: '/api/urp/admin/user/count',
    method: 'GET'
  })
}

export function listUsers(pageNum, pageSize) {
  return request({
    url: '/api/urp/admin/user/list',
    method: 'GET',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

export function getRolesByUsername(username) {
  return request({
    url: '/api/urp/admin/user/roles/' + username,
    method: 'GET'
  })
}

export function updateUser(user) {
  return request({
    url: '/api/urp/admin/user/update',
    method: 'PUT',
    data: user
  })
}

export function updateUserRoles(userId, roleIds) {
  return request({
    url: '/api/urp/admin/user/roles/update/' + userId,
    method: 'PUT',
    data: roleIds
  })
}

export function deleteUsers(userIds) {
  return request({
    url: '/api/urp/admin/user/delete/list',
    method: 'DELETE',
    data: userIds
  })
}

export function listSearchUsers(pageNum, pageSize, keyword) {
  return request({
    url: '/api/urp/admin/user/list/keyword',
    method: 'GET',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      keyword: keyword
    }
  })
}

export function upload(data) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/api/urp/admin/file/upload',
    method: 'POST',
    data: data
  })
}
