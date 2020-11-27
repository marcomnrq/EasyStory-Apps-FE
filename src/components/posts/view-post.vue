<template>
  <div v-if="!loading">
    <v-card>
      <v-img
          height="250"
          src="http://placehold.it/574x250"
      ></v-img>
      <v-card-title>{{ post.title }}</v-card-title>
      <v-divider class="mx-auto"></v-divider>
      <div v-if="post.userId === currentUser.id">
        <v-row justify="center">
          <v-dialog
              v-model="dialog"
              persistent
              max-width="590"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-chip @click="$router.push(`/post/${id}/edit`)"
                      class="ma-2"
                      label
                      link>
                <v-icon left>
                  mdi-pencil
                </v-icon>
                Editar publicación
              </v-chip>
              <post-hashtags v-bind:post="post"/>
              <v-chip
                  color="alert"
                  dark
                  class="ma-2"
                  v-bind="attrs"
                  v-on="on"
              >
                Eliminar publicación
              </v-chip>
            </template>
            <v-card>
              <v-card-title class="headline">¿Estas seguro que deseas hacer eso?</v-card-title>
              <v-card-text>Borrar tu publicación eliminará todos los datos relacionado a ella. Esta acción es <b>irreversible</b> y no se puede deshacer. Si estas seguro de tu decisión presiona Aceptar.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                    color="green darken-1"
                    text
                    @click="deletePost"
                >
                  Eliminar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <v-card-subtitle>
        <v-chip
            class="ma-2"
            color="indigo"
            text-color="white"
            @click="$router.push(`/profile/${user.id}`)"
        >
          <v-avatar left>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          {{ user.firstName }} {{ user.lastName }}
        </v-chip>
        <v-chip><v-icon>mdi-calendar</v-icon> {{ post.createdAt }}</v-chip>
        <bookmark v-bind:post_id="id"/>
      </v-card-subtitle>
      <v-card-text><div v-html="content"></div></v-card-text>
      <v-sheet
          class="py-4 px-1"
      >
        <v-chip-group
            multiple
            active-class="primary--text"
        >
          <v-chip
              v-for="hashtag in hashtags" v-bind:key="hashtag.id"
              class="ma-2"
              color="pink"
              label
              text-color="white"
              @click="$router.push(`/hashtag/${hashtag.id}`)"
          >
            <v-icon left>
              mdi-label
            </v-icon>
            #{{ hashtag.name }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-card>

    <post-qualification v-bind:post="post"/>

    <!-- Comment Section -->
    <add-comment v-bind:post="post"/>
    <comment-list v-bind:post_id="id"/>

  </div>
</template>

<script>
import PostService from "@/services/post.service"
import UserService from "@/services/user.service"
import AddComment from "@/components/comments/add-comment";
import CommentList from "@/components/comments/comment-list";
import Post from "@/models/post";
import User from "@/models/user";
import Bookmark from "@/components/bookmarks/bookmark";
import PostQualification from "@/components/posts/post-qualification";
import PostHashtags from "@/components/posts/post-hashtags";
export default {
  name: "view-post",
  components: {PostHashtags, PostQualification, Bookmark, CommentList, AddComment},
  data(){
    return {
      id: this.$route.params.id,
      post: Post,
      user: User,
      hashtags: null,
      content: null,
      dialog: false,
      loading: true,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getContent() {
      PostService.getPostById(this.id).then(response => {
        this.post = response.data
        this.content = this.post.content.replace(/\n/g, "<br/>");
        this.getUser(this.post.userId)
        this.getHashtags()
      }).catch(response => console.log(response))
    },
    deletePost(){
      PostService.deletePost(this.id).then(() => {
        this.$router.push(`/profile/${this.currentUser.id}`);
      }).catch(response => console.log(response))
    },
    getUser(user_id) {
      UserService.getUserById(user_id).then(response => {
        //console.log(response);
        this.user = response.data
      }).catch(response => console.log(response))
    },
    getHashtags() {
      PostService.getPostHashtags(this.id).then(response => {
        this.hashtags = response.data
      }).catch(response => console.log(response))
    }
  },

  mounted(){
    PostService.getPostById(this.id).then(response => {
      this.post = response.data;
      this.getContent();
      this.loading = false;
    }).catch(() => {
      this.$router.push("/feed");
    })
  }
}
</script>
