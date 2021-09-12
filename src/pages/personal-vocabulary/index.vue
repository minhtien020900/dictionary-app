<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="4" md="4">
          <v-select
              menu-props="auto"
              v-model="topicSelect"
              :items="topics"
              item-text="name"
              item-value="id"
              label="Topic"
              small-chips
              clearable

          ></v-select>
        </v-col>
        <v-col cols='12' sm="4" md="4" class="d-flex">
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
          ></v-text-field>
        </v-col>
        <v-col cols='12' sm="4" md="4" class="d-flex align-center justify-center">
          <v-dialog
              v-model="dialog"
              max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="success"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  text
              >
                <v-icon dense>
                  mdi-plus-thick
                </v-icon>
                <span class="text--success ml-1">create</span>
              </v-btn>
            </template>
            <v-card :loading="isLoadingAdd">
              <template slot="progress">
                <v-progress-linear color="red" indeterminate></v-progress-linear>
              </template>
              <v-card-title class="text-h5 justify-center align-center success">
                <span class="text-h6  white--text text-uppercase ">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                      <v-text-field
                          :error-messages="errorDefault.word"
                          v-model="editedItem.word"
                          label="Word"
                          clearable

                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                      <v-text-field
                          :error-messages="errorDefault.mean"
                          v-model="editedItem.mean"
                          label="Mean"
                          clearable
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                      <v-text-field
                          v-model="editedItem.pronounce"
                          :error-messages="errorDefault.pronounce"
                          clearable
                          label="Pronounce"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                      <v-select
                          :error-messages="errorDefault.topic_id"
                          v-model="editedItem.topic"
                          :items="topics"
                          item-value="id"
                          item-text="name"
                          label="Topic"
                          small-chips
                          deletable-chips
                          clearable
                      ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                      <v-select
                          :error-messages="errorDefault.part_of_speech_id"
                          v-model="editedItem.part_of_speech"
                          :items="part_of_speechs"
                          item-text="name"
                          label="Part of speech"
                          multiple
                          small-chips
                          clearable
                          menu-props="auto"
                          deletable-chips
                          item-value="id"></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="3"
                        md="3"
                        class="d-flex align-center"
                    >
                      <v-subheader class="pa-0">Examples:</v-subheader>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="8"
                        md="8"
                    >
                      <v-text-field
                          clearable
                          v-model="ex1"
                          label="Add example"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="1"
                        md="1"
                        class="d-flex align-center justify-center"
                    >
                      <v-btn
                          color="success"
                          dark
                          icon
                          x-small
                          @click="addExampleField"
                      >
                        <v-icon>
                          mdi-pencil-plus
                        </v-icon>
                      </v-btn>
                    </v-col>
                    <v-container>
                      <v-row v-for="(textField,index) in listExample" :key="index+1">
                        <v-col
                            cols="12"
                            sm="3"
                            md="3"
                            class="d-flex align-center"
                        >
                          <v-subheader class="pa-0">Examples {{ index }}:</v-subheader>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="8"
                            md="8"
                        >
                          <v-text-field
                              clearable
                              v-model="textField.value"
                              :label="textField.label + ' '+ index"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="1"
                            md="1"
                            class="d-flex align-center justify-center"
                        >
                          <v-btn
                              :color="textField.iconColor"
                              dark
                              icon
                              x-small
                              @click="removeExampleField(index)"
                          >
                            <v-icon>
                              {{ textField.icon }}
                            </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>

                    <v-col
                        cols="12"
                        sm="12"
                        md="12"

                    >
                      <template>
                        <v-file-input
                            :error-messages="errorDefault.image"
                            v-model="editedItem.images"
                            label="Choose file upload"
                            small-chips
                            counter
                            show-size
                            multiple
                        ></v-file-input>
                      </template>

                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="d-flex justify-center align-center">
                <v-btn
                    color="warning"
                    text
                    @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    :loading="isLoadingAdd"
                    @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn
              color="success"
              dark
              text
              outlined
          >
            <v-icon dense>
              mdi-download
            </v-icon>
            <span class="ml-1">export</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table
        :headers="headers"
        :items="personal_words"

        sort-by="calories"
        class="elevation-1"
        :loading="loadingTable"
    >
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title >Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="warning" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="success" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template v-slot:item.actions="{ item }">

        <v-icon
            color="primary"
            small
            class="mr-2"
            @click="viewItem(item)"
        >
          mdi-eye
        </v-icon>
        <v-icon
            color="warning"
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            color="error"
            small
            @click="deleteItem(item)"

        >
          mdi-delete
        </v-icon>

      </template>
      <template v-slot:no-data>
        <v-btn
            color="primary"
            @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog
        v-model="dialogDetail"
        max-width="600px"
    >
      <v-card>
        <v-card-title class="text-h5 justify-center align-center success">
          <span class="text-h6  white--text text-uppercase ">word detail</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  md="5"
                  sm="5"
                  class="d-flex justify-end align-center"
              >
                <v-subheader>Word:</v-subheader>
              </v-col>
              <v-col
                  cols="12"
                  md="7"
                  sm="7"
                  class="d-flex align-center"
              >
                <h4>{{ editedItem.word }}</h4>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col
                  cols="12"
                  md="5"
                  sm="5"
                  class="d-flex justify-end align-center"
              >
                <v-subheader>Mean:</v-subheader>
              </v-col>
              <v-col
                  cols="12"
                  md="7"
                  sm="7"
                  class="d-flex align-center"
              >
                <h4>{{ editedItem.mean }}</h4>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col
                  cols="12"
                  md="5"
                  sm="5"
                  class="d-flex justify-end align-center"
              >
                <v-subheader>Pronounce:</v-subheader>
              </v-col>
              <v-col
                  cols="12"
                  md="7"
                  sm="7"
                  class="d-flex align-center"
              >
                <h4>{{ editedItem.pronounce }}</h4>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col
                  cols="12"
                  md="5"
                  sm="5"
                  class="d-flex justify-end align-center"
              >
                <v-subheader>Topic:</v-subheader>
              </v-col>
              <v-col
                  cols="12"
                  md="7"
                  sm="7"
                  class="d-flex align-center"
              >
                <h4>{{ editedItem.topic.name }}</h4>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col
                  cols="12"
                  md="5"
                  sm="5"
                  class="d-flex justify-end align-center"
              >
                <v-subheader>Part Of Speech:</v-subheader>
              </v-col>
              <v-col
                  cols="12"
                  md="7"
                  sm="7"
                  class="d-flex align-center"
              >
                <ul>
                  <li v-for="(item,index) in editedItem.part_of_speech" :key="index">
                    <h4>{{ item.name }} ( {{ item.acronym }} )</h4>
                  </li>
                </ul>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="ma-3">
              <v-col
                  cols="12"
                  md="5"
                  sm="5"
                  class="d-flex justify-end "
              >
                <v-subheader>Examples:</v-subheader>
              </v-col>
              <v-col
                  cols="12"
                  md="7"
                  sm="7"
                  class="d-flex"
              >
                <ul class="p-2">
                  <li v-for="(item,index) in editedItem.example" :key="index">
                    <h4>{{ item.description }}</h4>
                  </li>
                </ul>

              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-window show-arrows>
              <template v-slot:prev="{ on, attrs }">
                <v-btn
                    color="warning"
                    v-bind="attrs"
                    v-on="on"
                    fab
                    x-small
                    dark
                >
                  <v-icon>
                    mdi-chevron-double-left
                  </v-icon>
                </v-btn>
              </template>
              <template v-slot:next="{ on, attrs }">
                <v-btn
                    color="teal"
                    v-bind="attrs"
                    v-on="on"
                    fab
                    x-small
                    dark
                >
                  <v-icon>
                    mdi-chevron-double-right
                  </v-icon>
                </v-btn>

              </template>
              <v-window-item
                  v-for="image in editedItem.image"
                  :key="image.url_image"
              >
                <v-card
                    color="grey"

                >
                  <v-row
                      class="fill-height"
                      align="center"
                      justify="center"
                  >
                    <v-img
                        max-height="300px"
                        :src="`http://127.0.0.1:8000${image.url_image}`"
                        :lazy-src="`http://127.0.0.1:8000${image.url_image}`"
                        aspect-ratio="1"
                        class="grey lighten-2"
                        contain
                    ></v-img>

                  </v-row>
                </v-card>
              </v-window-item>
            </v-window>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center align-center">
          <v-btn
              color="warning"
              text
              @click="closeDetail"
              rounded
          >
            Đóng
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
        :timeout="10000"
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
      {{ msgSnackbar }}
      <template v-slot:action="{ attrs }">
        <v-btn
            icon
            text
            v-bind="attrs"
            @click="closeSnackbar"
            fab
            small
        >
          <v-icon color="red">
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "index",
  data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            text: 'WORD',
            align: 'start',
            sortable: true,
            value: 'word',
          },
          {text: 'MEAN', value: 'mean'},
          {text: 'TOPIC', value: 'topic.name'},
          {text: 'PRONOUNCE', value: 'pronounce'},
          {text: 'CREATE AT', value: 'created_at'},
          {text: 'UPDATE AT', value: 'updated_at'},
          {text: 'ACTION', value: 'actions', sortable: false},
        ],
        editedIndex: -1,
        editedItem: {
          word: '',
          mean: '',
          pronounce: '',
          topic: [],
          examples: [],
          part_of_speech: [],
          images: [],
        },
        defaultItem: {
          word: '',
          mean: '',
          pronounce: '',
          topic: [],
          examples: [],
          part_of_speech: [],
          images: [],
        },
        topicSelect: [],
        listExample: [],
        search: '',
        ex1: '',
        errorDefault: {},
        snackbar: false,
        msgSnackbar: '',
        dialogDetail: false,
      }
  ),

  computed: {
    ...mapGetters({
      'topics': 'TOPIC/getTopic',
      'personal_words': 'PERSONAL_VOCABULARY/getPersonalWords',
      'part_of_speechs': 'PERSONAL_VOCABULARY/getPartOfSpeech',
      'errors': 'PERSONAL_VOCABULARY/getError',

    }),
    isSuccess: function () {
      return this.$store.state.PERSONAL_VOCABULARY.isSuccess;
    },

    loadingTable: function () {
      return this.$store.state.PERSONAL_VOCABULARY.isLoading;
    },
    isLoadingAdd: function () {
      return this.$store.state.PERSONAL_VOCABULARY.isLoadingAdd;
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
    ,
  }
  ,

  watch: {
    dialogDetail(val) {
      val || this.close();
    },
    dialog(val) {
      val || this.close()
    }
    ,
    dialogDelete(val) {
      val || this.closeDelete()
    },
    errors() {
      if (this.errors != null) {
        this.errorDefault = Object.assign({}, this.errors);
        if (this.editedIndex == -1) {

          this.editedItem = Object.assign({}, this.defaultItem);
          this.listExample = [];
          this.ex1 = '';
          this.dialog = true;
        }
      } else {
        this.close();
      }
    },

  }
  ,
  created() {
    this.initialize()
  }
  ,

  methods: {
    initialize() {
      this.$store.dispatch('TOPIC/getTopic');
      this.$store.dispatch('PERSONAL_VOCABULARY/getPersonalWords');
      this.$store.dispatch('PERSONAL_VOCABULARY/getPartOfSpeech');
    },
    closeSnackbar() {
      return this.snackbar = false;
    },
    addExampleField() {
      let data = {
        label: "Add example",
        value: "",
        icon: 'mdi-window-close',
        iconColor: 'error',
        isAddExampleField: false,
      }
      this.listExample.push(data);
    },
    removeExampleField(index) {
      this.listExample.splice(index, 1);
    },
    editItem(item) {
      this.ex1 = item.example[0].description;
      item.example.forEach(ex => {
        if (ex.description != this.ex1) {
          this.listExample.push({
            label: "Add example",
            value: ex.description,
            icon: 'mdi-window-close',
            iconColor: 'error',
            isAddExampleField: false,
          });
        }
      });

      this.editedIndex = item.id;
      this.editedItem.word = item.word;
      this.editedItem.mean = item.mean;
      this.editedItem.pronounce = item.pronounce;
      this.editedItem.topic = item.topic.id;
      if (item.part_of_speech.length > 0) {
        item.part_of_speech.forEach(x => {
          this.editedItem.part_of_speech.push(x.id);
        })
      }
      this.dialog = true
    },
    viewItem(item) {
      this.dialogDetail = true;
      this.editedItem = Object.assign({}, item);
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.dialogDelete = true
    },
    deleteItemConfirm() {

      let fd = new FormData();
      fd.append('id', this.editedIndex);

      this.$store.dispatch('PERSONAL_VOCABULARY/deletePersonalWord', fd).then(() => {
        this.msgSnackbar = "Delete personal word success";
        this.snackbar = true;
        this.$store.dispatch('PERSONAL_VOCABULARY/getPersonalWords');
      }).catch(() => {
        this.msgSnackbar = "Delete personal word error";
        this.snackbar = true;
      })
      this.closeDelete()
    },
    closeDetail() {
      this.dialogDetail = false;
    },
    close() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedItem.part_of_speech = [];
      this.editedItem.image = [];
      this.$nextTick(() => {
        this.errorDefault = {};
        this.listExample = [];
        this.ex1 = '';
        this.editedIndex = -1;
      });

    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      this.$store.commit('PERSONAL_VOCABULARY/SET_IS_LOADING_ADD', true);
      if (this.editedIndex > -1) {
        this.editedItem.examples = [];
        this.editedItem.examples.push(this.ex1);
        if (this.listExample.length > 0) {
          this.listExample.forEach(ex => {
            this.editedItem.examples.push(ex.value);
          })
        }

        let fd = new FormData();
        fd.append('id', this.editedIndex);
        fd.append('word', this.editedItem.word);
        fd.append('mean', this.editedItem.mean);
        fd.append('pronounce', this.editedItem.pronounce);
        fd.append('topic_id', this.editedItem.topic);


        this.editedItem.examples.forEach(example => {
          fd.append('example_description[]', example);
        })

        this.editedItem.part_of_speech.forEach(part_of_speech_id => {
          fd.append('part_of_speech_id[]', part_of_speech_id);
        })

        this.editedItem.images.forEach(image => {
          fd.append('image[]', image);
        });

        this.$store.dispatch('PERSONAL_VOCABULARY/editPersonalWord', fd).then(() => {
          this.$store.state.PERSONAL_VOCABULARY.isLoading = false;
          this.$store.commit('PERSONAL_VOCABULARY/SET_IS_LOADING_ADD', false);
          this.$store.dispatch('PERSONAL_VOCABULARY/getPersonalWords');
          this.close();
          this.snackbar = true;
          this.msgSnackbar = 'Edit word success';
        })
            .catch(error => {
              this.$store.commit('PERSONAL_VOCABULARY/SET_IS_LOADING_ADD', false);
              this.$store.commit('PERSONAL_VOCABULARY/SET_ERRORS', error.response.data);
            })

      } else {
        this.editedItem.examples.push(this.ex1);
        this.listExample.forEach(ex => {
          this.editedItem.examples.push(ex.value);
        })

        let fd = new FormData();
        fd.append('word', this.editedItem.word);
        fd.append('mean', this.editedItem.mean);
        fd.append('pronounce', this.editedItem.pronounce);
        fd.append('topic_id', this.editedItem.topic);
        this.editedItem.examples.forEach(example => {
          fd.append('example_description[]', example);
        })
        this.editedItem.part_of_speech.forEach(part_of_speech_id => {
          fd.append('part_of_speech_id[]', part_of_speech_id);
        })
        this.editedItem.images.forEach(image => {
          fd.append('image[]', image);
        });
        this.$store.dispatch('PERSONAL_VOCABULARY/addPersonalWord', fd).then(() => {
          this.$store.state.PERSONAL_VOCABULARY.isLoading = false;
          this.$store.commit('PERSONAL_VOCABULARY/SET_IS_LOADING_ADD', false);
          this.$store.dispatch('PERSONAL_VOCABULARY/getPersonalWords');
          this.close();
          this.snackbar = true;
          this.msgSnackbar = 'Add word success';
        })
            .catch(error => {
              this.$store.commit('PERSONAL_VOCABULARY/SET_IS_LOADING_ADD', false);
              this.$store.commit('PERSONAL_VOCABULARY/SET_ERRORS', error.response.data);
            })
      }
    }
    ,
  }
  ,
}

</script>

<style scoped>

</style>