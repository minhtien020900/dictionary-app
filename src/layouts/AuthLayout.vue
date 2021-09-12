<template>
  <v-app id="inspire">
    <v-app-bar
        app
        rounded
        elevate-on-scroll
        
    >
      <v-container class="py-0 fill-height">
        <v-avatar
            class="mr-10"
            color="grey darken-1"
            size="32"
        ></v-avatar>
        <v-spacer></v-spacer>
        <v-btn
            rounded
            text
            @click="goToHome()"
        >
          go back
        </v-btn>

      </v-container>
    </v-app-bar>
    <v-content>

      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" xs="5" sm="6" md="4" lg="3">
            <v-card class="elevation-10" outlined>
              <v-window>
                <slot/>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>

</template>

<script>

// import AuthModal from '../components/auth/Modal'
// import LoginComponent from '../pages/login/index'
// import RegisterComponent from '../pages/register/index'
// import {mapGetters} from "vuex";

export default {
  // components: {LoginComponent, RegisterComponent},
  // components: {AuthModal},
  data: () => ({
    step: 1,
  }),
  methods:{
    goToHome(){
      this.$router.push('/');
    }
  },
  props: {
    source: String
  }
};
</script>