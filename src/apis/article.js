import axios from '@/utils/myaxios.js'

// 1.获取文章列表数据
export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
