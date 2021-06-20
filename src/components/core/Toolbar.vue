<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
  >
    <v-toolbar-side-icon @click.stop="onSetDrawer('drawer')"></v-toolbar-side-icon>
    <v-toolbar-title>Admin</v-toolbar-title>

    <div style="flex-grow:1"></div>

    <v-toolbar-items class="hidden-md-and-down">
      <v-btn flat text @click="onSetDrawer('/user')"><i class="material-icons">person</i>&nbsp;회원관리</v-btn>
      <v-btn flat text @click="onSetDrawer('/system')"><i class="material-icons">desktop_mac</i>&nbsp;시스템관리</v-btn>
    </v-toolbar-items>
    
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon @click="goHome">home</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon @click="logout">power_settings_new</v-icon>
    </v-btn>
  </v-toolbar>
</template>


<script>
  import common from '@/constant/common';
  import { mapMutations, mapState } from 'vuex';

  export default {
    data: function() {
      return {
        
      }
    },
    methods: {
      ...mapMutations('app', ['setDrawer', 'setIsDrawer', 'setPathName', 'toggleDrawer']),
      onSetDrawer: function(pathName) {
        if(pathName === 'drawer') {
          this.setDrawer(!this.$store.state.app.drawer);
          this.setIsDrawer(true);
        } else {
          this.setDrawer(true);
          this.setIsDrawer(false);
          this.setPathName(common.ROOT_PATH + pathName);
        }
      },
      goHome: function() {
        this.onSetDrawer('/');
        this.$router.push(common.ROOT_PATH + '/');
      },
      logout: function() {
        this.$store.dispatch('logout')
            .then(() => {
              this.$router.push(common.ROOT_PATH + '/')
            })
            .catch(error => {
              console.log(error)
            })
      },
      refreshtoken: function() {
        this.$store.dispatch('autoRefreshToken')
      }
    }

  }
</script>
