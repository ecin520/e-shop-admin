import request from '../utils/request'

export function login(username, password) {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('grant_type', 'password');
    data.append('client_id', 'e-shop-client');
    data.append('scope', 'all');
    data.append('client_secret', 'e-shop');
    data.append('client_type', 'ADMIN')
    return request({
      url: '/api/auth/oauth/token',
      method: 'POST',
      data: data
    })
}

export function refreshToken(refreshToken) {
  var FormData = require('form-data');
  var data = new FormData();
  data.append('grant_type', 'refresh_token');
  data.append('client_id', 'e-shop-client');
  data.append('scope', 'all');
  data.append('client_secret', 'e-shop');
  data.append('refresh_token', refreshToken);
  return request({
    url: '/api/auth/oauth/token',
    method: 'POST',
    data: data
  })
}

export function logout(token) {
  return request({
    url: '/api/auth/oauth/logout',
    method: 'GET',
    params: {
      token: token
    }
  })
}

export function getUser() {
    return request({
      url: '/urp/user/username/nice',
      method: 'GET'
    })
}
