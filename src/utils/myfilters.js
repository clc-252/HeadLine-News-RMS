// 封装一个全局过滤器

export const dateFormat = (time) => {
  time = new Date(time)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  return `${year}-${month}-${day}`
}
