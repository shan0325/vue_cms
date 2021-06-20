import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import store from '../store';
import VueJwtDecode from 'vue-jwt-decode';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: paths
})

// Route guard checks to see if you are logged in, if not reroutes to login
// to is where you are going, matched.some is to find which routes have requiresAuth
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.authorized) {
      // 토큰 만료 체크
      let tokenexp = VueJwtDecode.decode(store.state.token).exp;
      if(new Date().getTime() > tokenexp * 1000) {
          store.commit('logout');
          localStorage.removeItem('token');
          next('/');
      } else {
        // 만료되지않았으면 재발급
        // store.dispatch('refreshtoken');
      }
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router