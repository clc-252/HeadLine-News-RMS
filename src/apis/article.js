import axios from '@/utils/myaxios.js'

// 1.获取文章列表数据
export const getPostList = () => {
  return axios({
    url: '/post'
  })
}
