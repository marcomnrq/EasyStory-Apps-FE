<template>
  <v-container fluid>
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
    <v-row>
      <v-btn color="info" @click="save">
        Publicar
      </v-btn>

      <v-btn text @click="$router.push(`/feed`)">
        Cancelar
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import PostService from "@/services/post.service"
export default {
  name: "new-post",
  data() {
    return {
      item: {
        title: '',
        description: '',
        content: ''
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    save() {
      this.item.content = this.item.content.replace(/<br?\/?>/ig,"\n");
      PostService.addPost(this.currentUser.id, this.item).then(response => {
        this.viewPost(response.data.id)
      }).catch(response => console.log(response))
    },
    viewPost(post_id) {
      this.$router.push(`/post/${post_id}`)
    }
  }
}
</script>
