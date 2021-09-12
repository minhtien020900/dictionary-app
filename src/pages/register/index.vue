<template>
  <v-window-item>
    <v-row class="no-gutters">
      <v-col cols="12" md="12" sm="12">
        <v-card-title class="text-h5  justify-center teal accent-3">
          <span class="text-uppercase">Register</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-6">
          <v-form ref="form">
            <v-text-field
                label="Name"
                name="name"
                v-model="formData.name"
                :prepend-icon="iconUser"
                type="text"
                color="teal accent-3"
                outlined
                dense
                clearable
                :error-messages="msgValidate.name"
            />
            <v-text-field
                label="Email"
                v-model="formData.email"
                name="email"
                :prepend-icon="iconEmail"
                type="text"
                color="teal accent-3"
                outlined
                dense
                clearable
                :error-messages="msgValidate.email"
            />
            <v-text-field
                label="Password"
                v-model="formData.password"
                name="password"
                prepend-icon="mdi-lock"
                color="teal accent-3"
                outlined
                dense
                :type="getTypeTextField()"
                :append-icon="getIconAppend()"
                @click:append="showPass()"
                :error-messages="msgValidate.password"
            />
            <v-text-field
                id="password"
                label="Password confirm"
                v-model="formData.password_confirm"
                name="password confirm"
                prepend-icon="mdi-reload"
                color="teal accent-3"
                outlined
                dense
                :type="getTypeTextField()"
                :append-icon="getIconAppend()"
                @click:append="showPass()"
                :error-messages="msgValidate.password_confirmation"
            />
          </v-form>
          <v-card-actions class="d-flex justify-center align-center">
            <v-btn   width="70%"   :loading="loading" color="primary" @click.prevent="register">

              Register
            </v-btn>
          </v-card-actions>

          <v-card-actions class="d-flex justify-center align-center">
            <span>Already have account? </span>
            <router-link :to="loginRouterName">
              <span class="ml-1">Sign In</span>
            </router-link>
          </v-card-actions>
        </v-card-text>


      </v-col>
    </v-row>
    <v-snackbar
        :timeout="-1"
        v-model="snackbar"
        color="success"
        top
        shaped
        right
        rounded
        text
        elevation="20"
        transition="scroll-x-reverse-transition"

    >
      {{ this.msgRegister }}
      <router-link :to="loginRouterName" class="snackbar-success text-uppercase font-weight-bold">
        <span class="ml-1">Sign in now</span>
      </router-link>
      <template v-slot:action="{ attrs }">
        <v-btn
            icon
            text
            v-bind="attrs"
            @click="snackbar = false"
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
// import {mapMutations} from 'vuex'
import {AuthMixin} from "../../mixins/auth/authMixin";

export default {
  mixins: [AuthMixin],
  name: "index.vue",
  data: () => {
    return {
      loginRouterName: 'login',
      msgRegister: '',
      isShowPass: false,
      formData: {
        name: '',
        email: '',
        password: '',
        password_confirm: ''
      },
    }
  },
  methods: {
    register() {
      this.snackbar = false;
      this.loading = true;
      this.msgValidate = {};
      this.$store.dispatch('AUTH/register', this.formData)
          .then(res => {
            this.snackbar = true;
            this.loading = false;
            this.$store.commit('AUTH/SET_USER_REGISTER', this.formData);
            this.msgRegister = res.data.data;
            this.$refs.form.reset();
          })
          .catch(e => {
            this.loading = false;
            this.msgValidate = e.response.data.error_message;

          })
    },
  }
}
</script>

<style scoped>
.snackbar-success {
  color: #039BE5;
  text-decoration: none;
}
</style>