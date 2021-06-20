<template>
    <v-content>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex sm12>
            <label>토큰 만료 시간 : </label>
            {{getTokenExp}}
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex sm12>
            <label>count : </label>
            {{count}}
            ,
            <label>getComputedDate : </label>
            {{getComputedDate}}
            ,
            <label>getMethodDate : </label>
            {{getMethodDate()}}
            <v-btn @click="upCount">카운트</v-btn>
          </v-flex>
        </v-layout>
        
      </v-container>
    </v-content>
</template>

<script>
import { mapState } from 'vuex';
import VueJwtDecode from 'vue-jwt-decode';

export default {
    data: function() {
      return {
        count: 0
      }
    },
    computed: {
      ...mapState({token: 'token'}),
      getTokenExp() {
        let tokenexp = VueJwtDecode.decode(this.token).exp * 1000;

        let date = new Date();
        date.setTime(tokenexp);

        return date;
      },
      getComputedDate() {
        console.log('setCountGubun')
        return Date.now()
      }
    },
    methods: {
      upCount() {
        this.count++;
      },
      getMethodDate() {
        console.log('setCountGubunMethod')
        return Date.now()
      }
    }
}
</script>
