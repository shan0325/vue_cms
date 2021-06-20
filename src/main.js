import Vue from 'vue'
import axios from 'axios'

// Components
import './components'

// Plugins
import './plugins/vuetify'

// Application imports
import App from './App'
import router from './router'
import store from './store'

Vue.prototype.$http = axios
// Sets the default url used by all of this axios instance's requests
axios.defaults.baseURL = 'http://localhost:8090'
axios.defaults.headers.get['Accepts'] = 'application/json'

const token = localStorage.getItem('token')
if(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

axios.interceptors.response.use(function (response) {
  
  return response;
}, function (error) {
  return new Promise((resolve, reject) => {
    if(error.response.status == 401 && error.response.data.error_description.indexOf("Access token expired") != -1) {
      console.log('refreshtoken start')
      store.dispatch('refreshtoken')
        .then(token => {
          console.log(token)
          // window.location.href = window.location.href

          // New request with new token
          const config = error.config;
          config.headers['Authorization'] = `Bearer ${token}`;
          
          axios.request(config).then(response => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          })
        })
    } else {
      reject(error)
    }
  });
});

Vue.config.productionTip = false

var app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')