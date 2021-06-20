// mutations.js Vuex 의 데이터, 즉 state 값을 변경하는 로직

export default {
    auth_request: state => {
        state.authStatus = 'loading'
    },
    auth_success(state, { token }) {
        state.authStatus = 'success'
        state.token = token
    },
    auth_error(state) {
        state.authStatus = 'error'
    },
    logout(state) {
        state.authStatus = ''
        state.token = ''
    }
}