import store from '../store';
import common from '../constant/common';

export default [
    {
      path: '*',
      meta: {
          name: '',
          requiresAuth: true
      },
      redirect: {
        path: common.ROOT_PATH + '/'
      }
    },
    {
      path: common.ROOT_PATH + '/',
      meta: {
          name: 'LoginHome',
          requiresAuth: false
      },
      component: () => import(/* webpackChunkName: "about" */ '@/views/LoginHome.vue'),
      beforeEnter: (to, from, next) => {
        if(store.getters.authorized) {
          next(common.ROOT_PATH + '/dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: common.ROOT_PATH + '/dashboard',
      meta: {
          name: 'DashboardView',
          requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "DashboardView" */ '@/views/DashboardView.vue'),
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('@/components/DashViews/Dashboard.vue')
        }
      ]
    },
    {
      path: common.ROOT_PATH + '/system',
      meta: {
        name: 'System',
        requiresAuth: true
      },
      component: () => import('@/views/SubView.vue'),
      children: [
      
      ]
    },
    {
      path: common.ROOT_PATH + '/user',
      meta: {
        name: 'User',
        requiresAuth: true
      },
      component: () => import('@/views/SubView.vue'),
      children: [
        {
          path: common.ROOT_PATH + '/user/users',
          name: 'Users',
          component: () => import('@/components/User/Users/List.vue')
        }
      ]
    }
]