<template>
  <div>
    <div v-if="bookmarks.length === 0" align="center">
      <v-card>
        <v-card-title>Etiquetas</v-card-title>
        <v-card-subtitle>No hay ningun bookmark para mostrar...</v-card-subtitle>
        <v-card-actions>
          <v-btn
              @click="$router.push('/feed')"
              color="primary"
              text
          >
            Ir al feed
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else>
      <v-card
          v-for="bookmark in bookmarks" v-bind:key="bookmark.id"
          class="mx-auto"
          max-width="444"
      >
        <v-img
            src="http://placehold.it/444x200"
            height="200px"
        ></v-img>

        <v-card-title>{{ bookmark.title }}</v-card-title>
        <v-card-subtitle>{{ bookmark.description }}</v-card-subtitle>
        <v-card-actions>
          <v-btn
              @click="$router.push(`/post/${bookmark.id}`)"
              color="primary"
              text
          >
            Visitar
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
              icon
              @click="show = !show"
          >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>.</v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/user.service";

export default {
  name: "bookmark-list",
  data(){
    return {
      show: false,
      bookmarks: {}
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getBookmark(){
      UsersService.getAllBookmarks(this.currentUser.id).then(response => {
        this.bookmarks = response.data;
      }).catch(response => {console.log(response)})
    }
  },
  mounted(){
    this.getBookmark();
  }
}
</script>

<style scoped>

</style>
