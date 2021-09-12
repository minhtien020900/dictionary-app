<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        width="300px"
    >
      <v-card>
        <!--        <v-card-title class="text-h5 grey lighten-2">-->
        <!--          Privacy Policy-->
        <!--        </v-card-title>-->

        <v-card-text class="no-gutters">
          <v-alert
              border="left"

              icon="mdi-error"
              text
              type="error"
              class="d-flex justify-center align-center"
          >
            Account not exist
          </v-alert>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="d-flex justify-center">

          <v-btn
              color="primary"
              text
              @click="dialog = false"
          >
            ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data: () => {
    return {
      dialog: true
    }
  }
}
</script>

<style scoped>

</style>