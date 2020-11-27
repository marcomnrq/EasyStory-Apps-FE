<template>
  <div>
    <v-chip
        v-if="is_bookmarked === false"
        @click="addBookmark"
        class="ma-2"
        color="indigo"
        text-color="white"
        link
    >
      <v-avatar left>
        <v-icon>mdi-bookmark-plus</v-icon>
      </v-avatar>
      Agregar marcador
    </v-chip>

    <v-chip
        v-else-if="is_bookmarked === true"
        @click="removeBookmark"
        class="ma-2"
        color="indigo"
        text-color="white"
        link
    >
      <v-avatar left>
        <v-icon>mdi-bookmark-remove</v-icon>
      </v-avatar>
      Eliminar marcador
    </v-chip>
  </div>
</template>

<script>
import UsersService from "@/services/user.service"
export default {
  name: "bookmark",
  props: ['post_id'],
  data(){
    return {
      is_bookmarked: Boolean
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getBookmark(){
      UsersService.getBookmark(this.currentUser.id, this.post_id).then(() => {
        this.is_bookmarked = true;
      }).catch(() => {
        this.is_bookmarked = false;
      })
    },
    addBookmark(){
      UsersService.addBookmark(this.currentUser.id, this.post_id, {}).then(() => {
        this.reloadPage()
      }).catch(response => {console.log(response)})
    },
    removeBookmark(){
      UsersService.removeBookmark(this.currentUser.id, this.post_id).then(() => {
        this.reloadPage()
      }).catch(response => {console.log(response)})

    },
    reloadPage() {
      this.$router.go();
    }
  },
  mounted(){
    this.is_bookmarked = false;
    this.getBookmark();
  }
}
</script>

<style scoped>

</style>
