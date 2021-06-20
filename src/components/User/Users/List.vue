<template>
    <v-content>
      <v-container>

        <v-layout row wrap mt-2>
          <v-flex xs5>
            <h2 class="headline">사용자</h2>
          </v-flex>
          <v-flex xs7 text-xs-right valign-wrapper>
            <span>홈 > 회원관리 > 사용자</span>
          </v-flex>
        </v-layout>

        <v-data-table
          :headers="headers"
          :items="users"
          :pagination.sync="pagination"
          hide-actions
          class="elevation-1 mt-2"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.userId }}</td>
            <td class="text-xs-center">
              <a @click="getUser(props.item.seqId)">{{ props.item.name }}</a>
            </td>
            <td class="text-xs-center">{{ props.item.state }}</td>
            <td class="text-xs-center">
              <span v-for="auth in props.item.authoritys" v-bind:key="auth.authority">
                {{ auth.authority }}
              </span>
            </td>
            <td class="text-xs-center">{{ props.item.regDate }}</td>
          </template>
        </v-data-table>

        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pagination.pages"></v-pagination>
        </div>

      </v-container>
    </v-content>
</template>

<script>
export default {
    data: function() {
      return {
        pagination: {},
        headers: [
          { text: '아이디', align: 'center', value: 'userId' },
          { text: '이름', align: 'center', value: 'name' },
          { text: '사용유무', align: 'center', value: 'state' },
          { text: '권한', align: 'center', value: 'authoritys' },
          { text: '등록일', align: 'center', value: 'regDate' }
        ],
        users: []
      }
    },
    methods: {
      getUsers: function() {
        this.$store.dispatch('users/getUsers')
          .then(response => {
            console.log(response);
            this.users = response.data.content;
            this.pagination.page = response.data.pageable.pageNumber + 1;
            this.pagination.pages = response.data.totalPages;
          })
          .catch(error => {
            console.log(error)
          })
      },
      getUser: function(seqId) {
        this.$store.dispatch('users/getUser', seqId)
          .then(response => {
            console.log(response);
            
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    beforeMount: function() {
      this.getUsers()
    }
}
</script>

