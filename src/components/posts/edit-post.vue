<template>
  <div v-if="!loading">
    <v-card>
      <v-card-title>Editar publicación</v-card-title>
      <v-container>
        <v-text-field
            v-model="item.title"
            label="Título"
            placeholder="Ingresa aquí el título de tu publicación"
        ></v-text-field>
        <v-textarea
            v-model="item.description"
            counter
            label="Descripción"
            placeholder="Ingresa aquí una breve descripción"
        ></v-textarea>
        <v-textarea
            v-model="item.content"
            counter
            label="Publicación"
            placeholder="Ingresa aquí una historia, cuento o relato que desees contar a la comunidad..."
        ></v-textarea>
      </v-container>
      <v-card-actions>
        <v-btn
            @click="updatePost"
            rounded
            color="primary"
            dark
        >
          Actualizar publicación
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import PostService from "@/services/post.service"
import Post from "@/models/post";

export default {
  name: "edit-post",
  data(){
    return {
      id: this.$route.params.id,
      post: Post,
      item: {
        title: " ",
        description: " ",
        content: ""
      },

      loading: true
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    updatePost(){
      this.item.content = this.item.content.replace(/<br?\/?>/ig,"\n");
      PostService.editPost(this.post.id, this.item).then(()=>{
        this.$router.push(`/profile/${this.currentUser.id}`)
      })
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    PostService.getPostById(parseInt(this.id)).then(response => {
      this.post = response.data;
      if(this.post.userId === this.currentUser.id){
        this.item.title = this.post.title;
        this.item.description = this.post.description;
        this.item.content = this.post.content;

        this.loading = false;
      }else {
        console.log("permission error");
        this.$router.push('/feed');
      }
    }).catch(()=>{
      console.log("post does not exist");
      this.$router.push('/feed');
    })
  }
}
</script>

<style scoped>

</style>
