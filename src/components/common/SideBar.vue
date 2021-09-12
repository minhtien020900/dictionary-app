<template>
  <div class="side-bar">
    <v-list>
      <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"

          exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
// import {mdiFormatAlignRight} from '@mdi/js';

export default {
  name: "side-bar",
  data: () => ({
    drawer: null,
    items: [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/login',
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Personal Vocabulary',
        to: '/personal-vocabulary',
      },
    ],
  }),
}
</script>

<style scoped>

</style>