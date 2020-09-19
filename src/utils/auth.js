import Cookies from 'js-cookie'

const KEY = 'Authorization'
const REFRESH_TOKEN = 'RefreshToken'
const EXPIRE = 7

export function setToken(token, rememberMe) {
  if (rememberMe === true) {
    Cookies.set(KEY, token, {expires: EXPIRE})
  } else {
    Cookies.set(KEY, token)
  }
}

export function getToken() {
  return Cookies.get(KEY)
}

export function clearToken() {
  Cookies.remove(KEY)
}

export function setRefreshToken(refreshToken, rememberMe) {
  if (rememberMe === true) {
    Cookies.set(REFRESH_TOKEN, refreshToken, {expires: EXPIRE})
  } else {
    Cookies.set(REFRESH_TOKEN, refreshToken)
  }
}

export function getRefreshToken() {
  return Cookies.get(REFRESH_TOKEN)
}

export function clearRefreshToken() {
  Cookies.remove(REFRESH_TOKEN)
}