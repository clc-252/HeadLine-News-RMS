// 1.引入Vue
import Vue from 'vue'
// 2.引入VueRouter
import VueRouter from 'vue-router'

// 引入路由所映射的组件
// 1.登陆页面
import Login from '@/views/Login.vue'
// 2.后台首页
import Index from '@/views/Index.vue'

// 挂载
Vue.use(VueRouter)

// 创建路由对象
let router = new VueRouter({
  routes: [
    // 登陆的路由
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    // 首页的路由
    {
      name: 'Index',
      path: '/index',
      component: Index
    }
  ]
})

// 暴露路由
export default router
