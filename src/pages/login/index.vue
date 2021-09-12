<template>
  <v-window-item>
    <v-row class="no-gutters">
      <v-col cols="12" md="10=2" sm="12" class="fill-height">
        <v-card-title class="text-h5 font-weight-regular justify-center teal accent-3">
          <span class="text-uppercase">Login</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-8">
          <v-form ref="form">
            <v-text-field
                label="Email"
                name="Email"
                v-model="form.email"
                :prepend-icon="iconEmail"
                :error-messages="this.msgValidate.email"
                type="text"
                color="teal accent-3"
                outlined
                dense
                clearable
            />
            <v-text-field
                id="password"
                label="Password"
                name="password"
                v-model="form.password"
                outlined
                dense
                color="teal accent-3"
                :error-messages="this.msgValidate.password"
                :prepend-icon="iconLock"
                :type="getTypeTextField()"
                :append-icon="getIconAppend()"
                @click:append="showPass()"
            />
          </v-form>
          <v-card-actions class="d-flex justify-end align-center">
            <router-link :to="registerRouterName">
              <span>{{ titleForgotPass }}</span>
            </router-link>
          </v-card-actions>
          <v-card-actions class="d-flex justify-center align-center">
            <v-btn width="70%" :loading="loading" color="primary" @click.prevent="login()">
              Login
            </v-btn>
          </v-card-actions>

          <v-card-actions class="d-flex justify-center align-center">
            <span>Don't have account? </span>
            <router-link :to="registerRouterName">
              <span class="ml-1">{{ titleRegister }}</span>
            </router-link>
          </v-card-actions>
        </v-card-text>
      </v-col>
    </v-row>
    <v-snackbar
        v-model="snackbar"
        color="red"
        top
        shaped
        right
        rounded
        transition="scroll-x-reverse-transition"
        elevation="24"
    >
      {{ this.msgAuthorized }}

      <template v-slot:action="{ attrs }">
        <v-btn
            icon
            text
            v-bind="attrs"
            @click="snackbar=false"
            fab
            small
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>

  </v-window-item>

</template>

<script>
import {AuthMixin} from '../../mixins/auth/authMixin.js';

export default {
  mixins: [AuthMixin],
  name: "index.vue",
  data: () => {
    return {
      titleForgotPass: 'Forgot Password?',
      titleRegister: 'Sign Up now',
      registerRouterName: 'register',
      msgAuthorized: null,
      form: {
        email: '',
        password: '',
      }
    }
  },
  computed: {},
  methods: {
    login() {
      this.snackbar = false;
      this.loading = true;
      this.msgAuthorized = null;
      this.msgValidate = {};
      this.$store.dispatch('AUTH/singIn', this.form)
          .then(res => {
            this.loading = false;
            this.$store.commit('AUTH/SET_TOKEN', res.data.data.token);
            this.$router.push({name: 'Home'});
          })
          .catch(e => {
            this.loading = false;
            let errorMessage = e.response.data.error_message;
            let statusCode = e.response.status;
            if (statusCode === 422) {
              this.msgValidate = errorMessage;
            } else if (statusCode === 401) {
              this.snackbar = true;
              this.msgAuthorized = errorMessage;
              this.$refs.form.reset();
            }

          });
    },
  }
}
</script>

<style scoped>

</style>