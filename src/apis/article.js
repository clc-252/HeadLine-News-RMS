import axios from '@/utils/myaxios.js'

// 1.获取文章列表数据
export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 2.实现文章的发布
export const publishPost = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}
