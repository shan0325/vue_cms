import axios from "axios"
import VueJwtDecode from 'vue-jwt-decode'

// actions.js
// commit 을 이용하여 mutations 이벤트를 호출해야 한다.

export default {
    login: function({ commit, getters }, userData) {
        return new Promise((resolve, reject) => {
            commit('auth_request')

            let data = new FormData();
            data.append('isManager', 'Y')
            data.append('grant_type', 'password');
            data.append('username', userData.userId);
            data.append('password', userData.password);

            let config = {
                headers: { 
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': getters.basicAuth
                }
            }
            
            axios.post('/oauth/token', data, config)
                .then(response => {
                    // console.log(response.data)
                    const token = response.data.access_token
                    const refreshToken = response.data.refresh_token

                    // 토큰을 localStorage에 저장
                    localStorage.setItem('token', token)
                    // localStorage.setItem('refreshToken', refreshToken)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

                    commit('auth_success', { token })
                    resolve(response)
                    //location.href="/dashboard"
                })
                .catch(error => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(error)
                })    
        })
    },
    logout ({ commit }) {
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },
    refreshtoken({ state, getters, commit }) {
        return new Promise((resolve, reject) => {
            let token = state.token
            let decodeToken = VueJwtDecode.decode(token)
            // console.log(decodeToken)

            let data = new FormData()
            data.append('userId', decodeToken.user_name)

            // let data = {userId: decodeToken.user_name, token: token};
            let config = {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': getters.basicAuth
                }
            }

            axios.post('/spring-admin/auth/token/refresh', data, config)
                .then(response => {
                    const token = response.data.access_token

                    // 토큰을 localstorage에 저장
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

                    commit('auth_success', { token })
                    resolve(token)
                })
                .catch(error => {
                    console.log(error.response)
                    commit('auth_error')
                    localStorage.removeItem('token')
                    location.href="/"
                })
        })
    },
    autoRefreshToken({ dispatch }) {
        setInterval(function () {
            // code goes here that will be run every 20 minutes.
            dispatch('refreshtoken')
                .then(response => {
                    console.log(response)
                })
        }, 5000)
    }
}