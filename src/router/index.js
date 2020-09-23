import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: '管理中心',
        requireAuth: true
      },
      component: () => import('../components/Home'),
      children: [
        {
          path: '/user',
          name: 'User',

          component: () => import('../components/management/urp/User')
        },
        {
          path: '/role',
          name: 'Role',
          component: () => import('../components/management/urp/Role')
        },
        {
          path: '/role-permission',
          name: 'RolePermission',
          component: () => import('../components/management/urp/RolePermission')
        },
        {
          path: '/permission-group',
          name: 'PermissionGroup',
          component: () => import('../components/management/urp/PermissionGroup')
        },
        {
          path: '/permission',
          name: 'Permission',
          component: () => import('../components/management/urp/Permission')
        },
        {
          path: '/product',
          name: 'Product',
          component: () => import('../components/management/product/Product')
        },
        {
          path: '/product-edit',
          name: 'ProductEdit',
          component: () => import('../components/management/product/views/ProductEdit')
        },
        {
          path: '/product-add',
          name: 'ProductAdd',
          component: () => import('../components/management/product/views/ProductAdd')
        },
        {
          path: '/category',
          name: 'Category',
          component: () => import('../components/management/product/Category')
        },
        {
          path: '/category-detail',
          name: 'CategoryDetail',
          component: () => import('../components/management/product/CategoryDetaill')
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import('../components/management/order/Order')
        },
        {
          path: 'return-reason',
          name: 'ReturnReason',
          component: () => import('../components/management/order/ReturnReason')
        },
        {
          path: '/shop',
          name: 'Shop',
          component: () => import('../components/management/merchant/Shop')
        },
        {
          path: '/spec',
          name: 'spec',
          component: () => import('../components/management/product/Spec')
        },
        {
          path: '/spec-detail',
          name: 'SpecDetail',
          component: () => import('../components/management/product/SpecDetail')
        },
        {
          path: '/web-log',
          name: 'WebLog',
          component: () => import('../components/management/monitor/AccessLog')
        },
        {
          path: '/error-log',
          name: 'ErrorLog',
          component: () => import('../components/management/monitor/ErrorLog')
        },
        {
          path: '/data-monitor',
          name: 'DataMonitor',
          component: () => import('../components/management/monitor/DataMonitor')
        },
        {
          path: '/tool-document',
          name: 'ApiDocument',
          component: () => import('../components/management/tool/ApiDocument')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/pages/Login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token && store.state.userInfo) {
      next()
    } else {
      Message({message: '请登录', type: 'error'})
      // store.dispatch('logout')
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router
