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

// 3.根据id获取文章详情
export const getArticleById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 4.根据文章id编辑文章
// 3.根据id获取文章详情
export const getEditArticleById = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_update/${id}`,
    data
  })
}
