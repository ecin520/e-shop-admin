import request from '../utils/request'

export function deleteProductSpecById(id) {
  return request({
    url: '/api/product/admin/spec/delete',
    method: 'DELETE',
    params: {
      id: id
    }
  })
}

export function deleteProductSpecDetailById(id) {
  return request({
    url: '/api/product/admin/spec/detail/delete',
    method: 'DELETE',
    params: {
      id: id
    }
  })
}

export function insertProductSpecDetail(productSpecDetail) {
  return request({
    url: '/api/product/admin/spec/detail/insert',
    method: 'POST',
    data: productSpecDetail
  })
}

export function listProductSpecDetails(pageNum, pageSize, productSpecId) {
  return request({
    url: '/api/product/admin/spec/detail/list',
    method: 'GET',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      productSpecId: productSpecId
    }
  })
}

export function getProductSpecDetail(queryParam) {
  return request({
    url: '/api/product/admin/spec/detail/query',
    method: 'POST',
    data: queryParam
  })
}

export function updateProductSpecDetail(productSpecDetail) {
  return request({
    url: '/api/product/admin/spec/detail/update',
    method: 'PUT',
    data: productSpecDetail
  })
}

export function insertProductSpec(productSpec) {
  return request({
    url: '/api/product/admin/spec/insert',
    method: 'POST',
    data: productSpec
  })
}

export function listProductSpecs(queryParam) {
  return request({
    url: '/api/product/admin/spec/list',
    method: 'POST',
    data: queryParam
  })
}

export function getProductSpec(queryParam) {
  return request({
    url: '/api/product/admin/spec/query',
    method: 'POST',
    data: queryParam
  })
}

export function updateProductSpec(productSpec) {
  return request({
    url: '/api/product/admin/spec/update',
    method: 'PUT',
    data: productSpec
  })
}

