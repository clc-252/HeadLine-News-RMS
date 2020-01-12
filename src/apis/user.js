import axios from '@/utils/myaxios.js'

// 1.登陆
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
