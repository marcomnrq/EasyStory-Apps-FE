<template>
  <div v-if="!loading">
    <v-list-item :loading="loading" two-line>
      <v-list-item-icon>
        <v-icon>mdi-comment</v-icon>
      </v-list-item-icon>
      <v-list-item-content
          @click="$router.push(`/profile/${comment.userId}`)"
      >
        <v-list-item-title >@{{ username }} </v-list-item-title>
        <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import Comment from "@/models/comment";
import UsersService from "@/services/user.service";

export default {
  name: "comment",
  props: {
    comment: Object[Comment],
  },
  data(){
    return {
      username: String,
      loading: true
    }
  },
  methods: {
    getUsername(){
      UsersService.getUserById(this.comment.userId).then(response => {
        this.username = response.data.username;
      }).catch(response => console.log(response));
      this.loading = false;
    }
  },

  mounted(){
    this.getUsername();
  }
}
</script>

<style scoped>

</style>
