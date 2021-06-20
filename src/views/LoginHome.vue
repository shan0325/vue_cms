<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card>
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Admin Panel</v-toolbar-title>
                            <v-spacer/>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    prepend-icon="person" 
                                    v-model="userId" 
                                    v-bind:rules="[() => !!userId || '아이디는 필수 입력입니다.']"
                                    label="아이디"
                                    required
                                    autofocus
                                ></v-text-field>
                                <v-text-field 
                                    prepend-icon="lock"
                                    v-model="password"
                                    v-bind:rules="[() => !!password || '비밀번호는 필수 입력입니다.']" 
                                    v-bind:append-icon="showPassword ? 'visibility_off' :'visibility'"
                                    v-bind:type="showPassword ? 'text' : 'password'"
                                    label="비밀번호"
                                    counter
                                    required
                                    @keydown.enter="doLogin"
                                    @click:append="showPassword = !showPassword"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn 
                                block 
                                depressed 
                                large 
                                color="primary"
                                @click="doLogin">Login</v-btn>
                        </v-card-actions>
                        <v-snackbar 
                            v-model="snackbar"
                            v-bind:color="color"
                            v-bind:top='true'
                        >
                            {{ errorMessages }}
                            <v-btn
                                dark
                                flat
                                @click="snackbar = false"
                            >
                                Close
                            </v-btn>
                        </v-snackbar>
                    </v-card>
                </v-flex>                
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import common from '@/constant/common';

export default {
    data: function() {
        return {
            userId: '',
            password: '',
            errorMessages: 'Incorrect login info',
            snackbar: false,
            color: 'general',
            showPassword: false
        }
    },
    methods: {
        doLogin: function() {
            let userId = this.userId
            let password = this.password

            if(userId === '') {
                this.errorMessages = '아이디는 필수 입력입니다.'
                this.snackbar = true
                return
            }
            if(password === '') {
                this.errorMessages = '비밀번호는 필수 입력입니다.'
                this.snackbar = true
                return
            }
            
            this.$store.dispatch('login', { userId, password })
                .then(response => {
                    this.$router.push(common.ROOT_PATH + '/dashboard')
                })
                .catch(error => {
                    console.log(error.response.data.error_description)
                    this.errorMessages = '로그인 정보를 다시 확인해주세요.'
                    this.snackbar = true
                })
        }
    }
    
}
</script>
