<template>

  <div>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="miniVariant"
        :clipped="clipped"
        fixed
        app
    >
      <SideBar/>
    </v-navigation-drawer>
    <v-app-bar color="white" :clipped-left="clipped" elevate-on-scroll app :outlined="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-avatar
          size="32"

      >
        <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
        >

      </v-avatar>
      <v-menu
          transition="scroll-x-reverse-transition"
          :close-on-content-click="false"
          offset-y
          rounded
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="indigo"
              dark
              v-bind="attrs"
              v-on="on"
              small
              icon
          >
            <v-icon
                v-bind="attrs"
                v-on="on"
            >mdi-menu-down
            </v-icon>
          </v-btn>

        </template>
        <v-list>
          <v-list-item-group

              color="primary"
          >
            <template v-for="(item, index) in menuList">
              <v-list-item :key="item.title"
                           :to="item.to"
                           v-on="item.isLogout ? {click:logout}:null "
                           exact>
                <template>
                  <v-list-item-action>
                    <v-icon :color=item.colorIcon>
                      {{ item.icon }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-subtitle v-text="item.title"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-divider
                  v-if="index < menuList.length - 1"
                  :key="index"
              ></v-divider>
            </template>

          </v-list-item-group>
        </v-list>

      </v-menu>

    </v-app-bar>


  </div>
</template>

<script>


import SideBar from "./SideBar";


export default {
  name: "Header",
  components: {SideBar},
  data() {
    return {
      width: 120,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      menuList: [
        {
          title: 'Profile',
          icon: 'mdi-account',
          colorIcon: 'primary',
          to: '/profile',
        }, {
          title: 'Change password',
          icon: 'mdi-account-lock',
          colorIcon: 'warning',
          to: '/change-password',
        },
        {
          title: 'Logout',
          icon: 'mdi-power',
          colorIcon: 'red',
          isLogout: true,
        },
      ],
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('AUTH/logout', null)
          .then(res => {
            console.log(res.data.data);
            localStorage.removeItem('token');
            this.$router.push('/login');
          })
          .catch(error => {
            console.log(error);
          })
    },
  },
}
</script>

<style scoped>

</style>