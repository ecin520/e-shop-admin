import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken, getRefreshToken, setToken } from './auth'
import router from '../router'
import {refreshToken} from "../api/status";


const service = axios.create({
  baseURL: 'http://127.0.0.1:1024',
  timeout: 18000
});


service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken();
  }
  return config
}, error => {
  console.log(error)
  Message({ message: error, type: 'error' })
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  let data = response.data
  if (data.code === 401) {
    Message({ message: data.message, type: 'error' })
    /* 执行刷新token */
  } else if (data.code === 403) {
    if (undefined === getRefreshToken() || '' === getRefreshToken() || null === getRefreshToken()) {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
    refreshToken(getRefreshToken()).then(response => {
      if (response.code === 200) {
        setToken(response.data.oauth.accessToken, true)
        router.go(0)
      } else {
        this.$store.dispatch('logout')
        this.$router.push('/login')
        Message({ message: '登录失效 请重新授权', type: 'danger' })
      }
    })
    // Message({ message: 'Token失效 正在刷新Token', type: 'warning' })
  } else {
    return response.data
  }

}, error => {
  console.log(error);
  Message({ message: error, type: 'error' })
  return Promise.reject(error)
})

export default service
