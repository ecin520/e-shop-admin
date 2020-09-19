import Cookies from 'js-cookie'

const key = 'UserInfo'
const EXPIRE = 7

export function setUserInfo(userInfo, rememberMe) {
  if (rememberMe === true) {
    Cookies.set(key, userInfo, {expires: EXPIRE})
  } else {
    Cookies.set(key, userInfo)
  }
}

export function getUserInfo() {
  return Cookies.getJSON(key)
}

export function clearUserInfo() {
  Cookies.remove(key)
}