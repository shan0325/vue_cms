import axios from "axios";

export default {
    getUsers: function() {
        return new Promise((resolve, reject) => {
            axios.get('/spring-admin/api/users')
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getUser: function({}, seqId) {
        return new Promise((resolve, reject) => {
            axios.get('/spring-admin/api/users/' + seqId)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

