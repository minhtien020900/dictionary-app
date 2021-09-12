<template>
  <v-card-text>
    <v-text-field
        label="Input word to search..."
        prepend-icon="mdi-magnify"
        clearable
        v-model="keyWord"
        :loading="loading"
    ></v-text-field>
    <v-expansion-panels focusable v-model="iconShow" multiple>
      <v-expansion-panel
          v-for="(word,i) in arrWordFind"
          :key="i"
      >
        <v-expansion-panel-header>{{ word.word }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card
              class="mx-auto my-auto"
              max-width="400"
              elevation="5"
              rounded
          >
            <v-card-text>
              <p class="text-h4 text--primary">
                {{ word.word }}
              </p>
              <p>{{ word.pronounce }} </p>
              <ul>
                <li v-for="(type,key) in word.part_of_speech" :key="key">
                  {{ type.name}} - {{type.acronym}}
                </li>
              </ul>
              <div class="text--primary">
                <p> {{ word.mean }}</p>

              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                  text
                  color="deep-purple accent-4"
              >
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card-text>


</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "index.vue",
  data: () => {
    return {
      iconShow: [],
      loading: false,
      keyWord: '',
      test: null,
      arrWordFind: {},
    }
  },
  created() {
    this.$store.dispatch('WORD/getAllWord');

    // console.log(JSON.stringify(this.listWord);
  },
  methods: {
    filterWord(listWord, keyword) {
      this.arrWordFind = listWord.filter(word => {
        if (word.word.indexOf(keyword) !== -1) {
          return true;
        }
      });
      this.loading = false;
      console.log(this.arrWordFind);
    }
  },
  computed: {
    ...mapGetters({
      listWord: 'WORD/getWords',
    }),
  },
  watch: {
    keyWord: function () {
      this.loading = true;
      this.filterWord(this.listWord, this.keyWord);

    }
  }

}

</script>

<style scoped>

</style>