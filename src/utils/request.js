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

  if(data.code === 4000) {

    Message({ message: data.message , type: 'error' })
    store.dispatch('logout')
    router.push('/login')

  } else if (data.code === 4003) {

    if (undefined === getRefreshToken() || '' === getRefreshToken() || null === getRefreshToken()) {
      store.dispatch('logout')
      router.push('/login')
    }

    refreshToken(getRefreshToken()).then(response => {
      if (response.code === 200) {
        setToken(response.data.oauth.accessToken, true)
        router.go(0)
      } else {
        store.dispatch('logout')
        router.push('/login')
        Message({ message: '登录失效 请重新授权', type: 'error' })
      }
    })

  } else {
    return response.data
  }

}, error => {
  console.log(error);
  Message({ message: error, type: 'error' })
  return Promise.reject(error)
})

export default service
