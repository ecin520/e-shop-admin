import request from '../utils/request'

export function listOrdersByParam(queryParam) {
  return request({
    url: '/api/order/admin/order/list',
    method: 'POST',
    data: queryParam
  })
}

export function updateOrder(queryParam) {
  return request({
    url: '/api/order/admin/order/update',
    method: 'POST',
    data: queryParam
  })
}

export function getOrder(queryParam) {
  return request({
    url: '/api/order/admin/order/update',
    method: 'POST',
    data: queryParam
  })
}

/**
 * 退货管理
 * */
export function insertOrderReturnReason(orderReturnReason) {
  return request({
    url: '/api/order/admin/order/return/insert',
    method: 'POST',
    data: orderReturnReason
  })
}

export function deleteOrderReturnReasonById(id) {
  return request({
    url: '/api/order/admin/order/return/delete/' + id,
    method: 'DELETE'
  })
}

export function updateOrderReturnReason(orderReturnReason) {
  return request({
    url: '/api/order/admin/order/return/update',
    method: 'PUT',
    data: orderReturnReason
  })
}

export function listOrderReturnReasons(pageSize, pageNum) {
  return request({
    url: '/api/order/admin/order/return/list',
    method: 'GET',
    params: {
      pageSize: pageSize,
      pageNum: pageNum
    }
  })
}
