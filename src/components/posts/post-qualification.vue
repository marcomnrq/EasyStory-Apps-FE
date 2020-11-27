<template>
  <div>
    <v-card v-if="post.userId === currentUser.id">
      <v-card-title>No puedes calificar tu propio post</v-card-title>
    </v-card>
    <v-card v-else>
      <v-card-subtitle v-if="!qualification">Deja una reseña</v-card-subtitle>
      <v-card-subtitle v-if="qualification">Ya has calificado este post antes. Edita tu reseña</v-card-subtitle>
      <v-rating
          @input="addReview"
          v-model="item.qualificate"
          color="warning"
          large
          hover
          length="5"
      ></v-rating>
    </v-card>
  </div>
</template>

<script>
import UsersService from "@/services/user.service"
import Post from "@/models/post";

export default {
  name: "post-qualification",
  props: {
    post: Object[Post]
  },
  data: () => {
    return{
      item: {
        qualificate: 0,
      },
      qualification: false
  }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    editReview(){
      UsersService.editQualification(this.currentUser.id, this.post.id, this.item).then(() => {
        this.mounted();
      }).catch(() =>{ this.$router.go() })
    },
    addReview(){
      if(this.qualification === true){
        this.editReview()
      }
      else{
        console.log("DATA");
        console.log(this.item);
        UsersService.addQualification(this.currentUser.id, this.post.id, this.item).then(() => {
          this.mounted();
        }).catch(() =>{ this.$router.go() })
      }
    }
  },
  mounted() {
    UsersService.getQualification(this.currentUser.id, this.post.id).then(response => {
      this.qualification = true;
      this.item.qualificate = response.data.qualificate;
    }).catch(() => {
      this.qualification = false;
    })
  }
}
</script>

<style scoped>

</style>
