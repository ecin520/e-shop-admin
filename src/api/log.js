import request from '../utils/request'

export function listWebLogs() {
    return request({
      url: '/api/urp/admin/log/web/list',
      method: 'GET'
    })
}

export function listErrorLogs() {
    return request({
      url: '/api/urp/admin/log/error/list',
      method: 'GET'
    })
}

export function listWebLogsByDate(date) {
  return request({
    url: '/api/urp/admin/log/web/list/' + date,
    method: 'GET'
  })
}

export function listErrorLogsByDate(date) {
  return request({
    url: '/api/urp/admin/log/error/list/' + date,
    method: 'GET'
  })
}
