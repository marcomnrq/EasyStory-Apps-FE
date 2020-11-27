<template>
  <v-card class="mx-auto" tile>
    <v-list rounded>
      <v-subheader>COMENTARIOS</v-subheader>
      <template v-if="comments.length === 0">
        <p>No hay comentarios para mostrar...</p>
      </template>
      <v-list-item-group
          color="primary"
      >
        <div v-for="comment in comments" v-bind:key="comment.id">
          <comment v-bind:comment="comment"/>
        </div>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import PostService from "@/services/post.service";
import Comment from "@/components/comments/comment";

export default {
  name: "comment-list",
  components: {Comment},
  props: ['post_id'],
  data(){
    return {
      comments: {}
    }
  },
  methods: {
    getContent() {
      PostService.getPostComments(this.post_id).then(response => {
        this.comments = response.data.reverse();
      }).catch(response => console.log(response))
    },
  },

  mounted(){
    this.getContent();
  }
}
</script>
