// 1.引入Vue
import Vue from 'vue'
// 2.引入VueRouter
import VueRouter from 'vue-router'

// 引入路由所映射的组件
// 1.登陆页面
import Login from '@/views/Login.vue'
// 2.后台首页
import Index from '@/views/Index.vue'
// 3.文章列表
import Postlist from '@/views/Postlist.vue'
// 4.欢迎页面
import Welcome from '@/views/Welcome.vue'

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
      component: Index,
      // 路由重定向
      redirect: { name: 'Welcome' },
      children: [
        // 文章列表的路由
        {
          name: 'Postlist',
          path: 'postlist',
          component: Postlist
        },
        // 欢迎页面的路由
        {
          name: 'Welcome',
          path: 'welcome',
          component: Welcome
        }
      ]
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 判断是否进入的是登陆页，如果是，直接进行下一步
  if (to.path === '/login') {
    next()
  } else {
    // 判断是否有登陆过，有的话next
    let token = localStorage.getItem('userLoginToken_back')
    if (token) {
      next()
    } else {
      // 重定向到登录页
      next('/login')
    }
  }
})

// 暴露路由
export default router
