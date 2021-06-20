<template>
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="inputValue"
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              {{menuTitle}}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="toLink(child.url, $event)"
            >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile 
          v-else 
          @click="toLink(item.url, $event)" 
          :key="item.text"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
  .active {
    background-color: #e0e0e0;
  }
</style>

<script>
  import { mapMutations, mapGetters, mapState } from 'vuex';
  import common from '@/constant/common';
  
  export default {
    data: function() {
      return {
        dialog: false,
        items: [],
        menuTitle: ''
      }
    },
    computed: {
      ...mapGetters('app', ['drawer', 'isDrawer', 'pathName']),
      inputValue: {
        // getter
        get () {
          // console.log(this.$vuetify.breakpoint.mdAndDown)
          if(this.$vuetify.breakpoint.mdAndDown) {
            this.menuTitle = '전체메뉴'
            this.items = [
              {
                icon: 'person',
                'icon-alt': 'person',
                text: '회원관리',
                model: false,
                children: [
                  { text: '사용자', url: common.ROOT_PATH + '/user/users' },
                  { text: '관리자' }
                ]
              }
            ];

            if(this.isDrawer) {
              return this.drawer;
            }

            this.setDrawer(false);
            return this.drawer;
          }
          
          if(this.isDrawer || !this.pathName) {
            this.setPathName(this.$route.path);
          }
          // console.log(this.pathName);
          
          if(this.pathName.indexOf(common.ROOT_PATH + '/system') == 0) {
            this.menuTitle = '시스템관리';
            this.items = [
              { icon: 'menu_book', text: '메뉴관리' },
              { icon: 'sort_by_alpha', text: '코드관리' },
              // {
              //   icon: 'keyboard_arrow_up',
              //   'icon-alt': 'keyboard_arrow_down',
              //   text: 'More',
              //   model: false,
              //   children: [
              //     { text: 'Import' },
              //     { text: 'Export' },
              //     { text: 'Print' },
              //     { text: 'Undo changes' },
              //     { text: 'Other contacts' }
              //   ]
              // }
            ]
          } else if(this.pathName.indexOf(common.ROOT_PATH + '/user') == 0) {
            this.menuTitle = '회원관리';
            this.items = [
              { 
                icon: 'person',
                'icon-alt': 'person', 
                text: '사용자', 
                model: false,
                url: common.ROOT_PATH + '/user/users'
              },
              { 
                icon: 'android',
                'icon-alt': 'android', 
                text: '관리자', 
                model: false,
                url: common.ROOT_PATH + '/user/users'
              }
            ];
          } else {
            this.menuTitle = 'Dashboard';
            this.items = [];
          }

          if(this.isDrawer) {
            return this.drawer;
          }

          this.setDrawer(true);
          return this.drawer;
        },
        // setter
        set (val) {
          this.setDrawer(val)
        }
      }
    },
    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer', 'setPathName']),
      toLink: function(url, event) {
        // console.log(event.currentTarget);
        // console.log("Router Path : " + url);

        this.$router.push(url);

        if(this.$el.getElementsByClassName('active').length > 0) {
          let activeArray = this.$el.getElementsByClassName('active');
          for(let i = 0; i < activeArray.length; i++) {
            activeArray[i].classList.remove('active');
          }
        }

        console.log(event.currentTarget.parentElement.classList);
        event.currentTarget.parentElement.classList.add('active');

        if(this.$vuetify.breakpoint.mdAndDown) {
          this.setDrawer(false);
        }
      }
    }
  }
</script>