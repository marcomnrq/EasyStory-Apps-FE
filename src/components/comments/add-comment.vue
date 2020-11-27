<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
        ><v-icon>mdi-comment</v-icon> Publicar un comentario
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Escribir un comentario {{post.id}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
                v-model="item.content"
                label="Comentario*"
                required
            ></v-text-field>
          </v-container>
          <small>*requerido</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="save"
          >
            Publicar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
    >
      Su comentario fue publicado

      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import PostService from "@/services/post.service"
import Post from "@/models/post";

export default {
  name: "add-comment",
  props: {
    post: Object[Post]
  },
  data: () => {
    return {
      snackbar: false,
      timeout: 2000,
      dialog: false,
      item: {
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
      PostService.addComment(this.currentUser.id, this.post.id, this.item).then(() => {
        this.dialog = false;
        this.reloadPage();
      }).catch(response => console.log(response))
    },
    reloadPage() {
      this.$router.go();
    }
  }
}
</script>

<style scoped>

</style>
