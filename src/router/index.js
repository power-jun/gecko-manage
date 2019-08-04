import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import('../pages/Home/Home.vue'),
      meta: {
        title: '自述文件'
      },
      children: [{
        path: '/dashboard',
        component: () => import('../pages/Dashboard/Dashboard.vue'),
        meta: {
          title: '系统首页'
        }
      },
      {
        path: '/404',
        component: () => import('../components/404.vue'),
        mata: {
          title: '404'
        }
      },
      {
        path: '/403',
        component: () => import('../components/403.vue'),
        mata: {
          title: '403'
        }
      }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login/Login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      // 注册页面
      path: '/registered',
      component: () => import('../pages/Registered/Registered'),
      meta: {
        title: '注册页面'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
