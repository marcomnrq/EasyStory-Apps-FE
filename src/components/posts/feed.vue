<template>
  <div>
    <div v-for="post in posts" v-bind:key="post.id">
      <post-card v-bind:post="post"/>
    </div>
  </div>
</template>

<script>
import PostService from '../../services/post.service';
import PostCard from "@/components/posts/post-card";

export default {
  name: "feed",
  components: {PostCard},
  data(){
    return {
      posts : {},
      loading: false,
      selection: 1
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getAllPosts() {
      PostService.getAllPosts().then(response => {
        this.posts = response.data.reverse()
      }).catch(response => console.log(response))
    },
  },
  mounted(){
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.getAllPosts()
  }
}
</script>
