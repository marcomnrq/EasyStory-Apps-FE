<template>
  <div v-if="!loading">
    <v-card>
      <v-card-title>Publicaciones recientes sobre: <v-chip
          class="ma-2"
        color="pink"
        label
        text-color="white"><v-icon left>
        mdi-label
      </v-icon><b>#{{ hashtag.name }}</b></v-chip>
      </v-card-title>

    <div v-if="posts.length === 0">
      <v-card-subtitle>No hay publicaciones asignadas a este hashtag... </v-card-subtitle>
      <v-card-actions>
        <v-btn outlined rounded text color="primary" @click="$router.push(`/new-post`)">+ Nueva publicación</v-btn>
      </v-card-actions>
    </div>
    <div
        v-else
        v-for="post in posts" v-bind:key="post.id">
      <post-card v-bind:post="post"/>
    </div>
    </v-card>
  </div>
</template>

<script>
import PostService from "@/services/post.service"
import PostCard from "@/components/posts/post-card";
export default {
  name: "hashtag-posts",
  components: {PostCard},
  data(){
    return {
      id: this.$route.params.id,
      hashtag: Object,
      posts: {},
      loading: true,
    }
  },
  mounted() {
    PostService.getHashtagById(this.id).then(response => {
      console.log(response.data);
      this.hashtag = response.data;
    }).catch(() => this.$router.push("/feed"))
    PostService.getAllPostsByHashtagId(this.id).then(response => {
      this.posts = response.data.reverse();
    })
    this.loading = false;
  }
}
</script>

<style scoped>

</style>
