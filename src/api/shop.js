import request from '../utils/request'

export function insertShop(shop) {
  return request({
    url: '/api/product/admin/shop/insert',
    method: 'POST',
    data: shop
  })
}

export function deleteShopById(id) {
  return request({
    url: '/api/product/admin/shop/delete',
    method: 'GET',
    params: {
      id: id
    }
  })
}

export function updateShop(shop) {
  return request({
    url: '/api/product/admin/shop/update',
    method: 'PUT',
    data: shop
  })
}

export function getShop(shop) {
  return request({
    url: '/api/product/admin/shop/query',
    method: 'POST',
    data: shop
  })
}

export function listShops(pageNum, pageSize, keyword) {
  return request({
    url: '/api/product/admin/shop/list',
    method: 'GET',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      keyword: keyword
    }
  })
}
