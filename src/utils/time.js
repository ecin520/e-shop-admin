export function getTime() {
  let date = new Date();
  let result = date.getFullYear()
  if ((date.getMonth() + 1) < 10) {
    result = result + '0' + (date.getMonth() + 1)
  } else {
    result = result + (date.getMonth() + 1)
  }
  if (date.getDate() < 10) {
    result = result + '0' + date.getDate()
  } else {
    result = result + date.getDate()
  }
  return result
}
