import Vue from 'vue'
import Vuex from 'vuex'
import layout from './modules/layout'
import {getToken, setToken, clearToken, getRefreshToken, clearRefreshToken, setRefreshToken} from '../utils/auth'
import {getUserInfo, setUserInfo, clearUserInfo} from '../utils/user'
import {logout} from '../api/status'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: getToken(),
    refreshToken: getRefreshToken(),
    userInfo: getUserInfo()
  },
  getters: {
    isCollapse: state => state.layout.isCollapse,
    getMenu: state => state.layout.menu,
    getToken: state => state.token,
    getRefreshToken: state => state.refreshToken,
    getUserInfo: state => state.userInfo,
    getBreadcrumb: state => state.layout.breadcrumb
  },
  mutations: {
    setToken(state, {token, rememberMe}) {
      state.token = token
      setToken(token, rememberMe)
    },
    clearToken(state) {
      state.token = ''
      clearToken()
    },
    setRefreshToken(state, {refreshToken, rememberMe}) {
      state.refreshToken = refreshToken
      setRefreshToken(refreshToken, rememberMe)
    },
    clearRefreshToken(state) {
      state.refreshToken = ''
      clearRefreshToken()
    },
    setUserInfo(state, {userInfo, rememberMe}) {
      state.userInfo = userInfo
      setUserInfo(userInfo, rememberMe)
    },
    clearUserInfo() {
      clearUserInfo()
    }
  },
  actions: {
    login(ctx, {token, refreshToken, userInfo, rememberMe}) {
      ctx.commit('setToken', {token, rememberMe})
      ctx.commit('setRefreshToken', {refreshToken, rememberMe})
      ctx.commit('setUserInfo', {userInfo, rememberMe})
    },
    logout(ctx) {
      logout(getToken())
      ctx.commit('clearToken')
      ctx.commit('clearRefreshToken')
      ctx.commit('clearUserInfo')
    }
  },
  modules: {
    layout
  }
})

export default store
