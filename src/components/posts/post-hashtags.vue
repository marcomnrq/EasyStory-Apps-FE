<template>
  <v-dialog
      v-model="dialog"
      scrollable
      max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
      >
        Editar hashtags
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Editar hashtags</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-chip
            v-for="tag in post_hashtags" v-bind:key="tag.id"
            class="ma-2"
            color="pink"
            label
            link
            text-color="white"
            @click="unassignHashtag(tag)"
        >
          <v-icon left>
            mdi-label
          </v-icon>
          {{ tag.name }}
        </v-chip>
      </v-card-text>
      <v-divider></v-divider>
      <v-text-field
          v-model="search"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
          placeholder="Buscar un hashtag..."
      ></v-text-field>
      <v-card-text style="height: 300px;">
        <v-chip
            v-for="hashtag in filteredList" v-bind:key="hashtag.id"
            class="ma-2"
            color="pink"
            label
            link
            text-color="white"
            @click="assignHashtag(hashtag)"
        >
          <v-icon left>
            mdi-label
          </v-icon>
          {{ hashtag.name }}
        </v-chip>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
            color="blue darken-1"
            text
            @click="closeDialog"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Post from "@/models/post";
import PostService from "@/services/post.service";

export default {
  name: "post-hashtags",
  props:{
    post: Object[Post]
  },
  data () {
    return {
      search: '',
      dialog: false,
      hashtags: {},
      post_hashtags: {},
      loading: true,
      select: ['Vuetify', 'Programming'],
      item: {
        id: 0,
        name: '',
      }
    }
  },
  computed: {
    filteredList() {
      return Object.values(this.hashtags).filter(tag => {
        return tag.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  methods: {
    arrayRemove(arr, value) {
      return Object.values(arr).filter(function(ele){
        return ele.id != value;
      });
    },
    closeDialog(){
      this.dialog = false;
      this.$router.go();
    },
    assignHashtag(hashtag){
      PostService.assignHashtag(this.post.id, hashtag.id).then(() => {
        this.post_hashtags.push(hashtag);
        this.hashtags = this.arrayRemove(this.hashtags, hashtag.id);
      })
    },
    unassignHashtag(hashtag){
      PostService.unassignHashtag(this.post.id, hashtag.id).then(() => {
        this.hashtags.push(hashtag);
        this.post_hashtags = this.arrayRemove(this.post_hashtags, hashtag.id);
      })
    }
  },
  mounted() {
    PostService.getAllHashtags().then(response => {
      this.hashtags = response.data;
    })
    PostService.getPostHashtags(this.post.id).then(response => {
      this.post_hashtags = response.data;
      for(let obj of this.post_hashtags){
        this.hashtags = this.arrayRemove(this.hashtags, obj.id);
      }
    })

    this.loading = false;
  }

}
</script>

<style scoped>

</style>
