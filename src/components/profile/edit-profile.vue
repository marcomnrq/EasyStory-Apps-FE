<template>
  <div v-if="!loading">
    <v-card>
      <v-card-title>Editar tu perfil</v-card-title>
      <v-container>
        <v-text-field
            v-model="item.username"
            :counter="15"
            label="Usuario"
            required
        ></v-text-field>
        <v-text-field
            v-model="item.firstName"
            :counter="30"
            label="Nombres"
            required
        ></v-text-field>
        <v-text-field
            v-model="item.lastName"
            :counter="30"
            label="Apellidos"
            required
        ></v-text-field>
        <v-text-field
            v-model="item.email"
            label="E-mail"
            required
        ></v-text-field>
        <v-text-field
            v-model="item.password"
            type="password"
            label="Confirma tu contraseña"
            required
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-btn
            @click="updateProfile"
            rounded
            color="primary"
            dark
        >
          Guardar datos
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import UsersService from "@/services/user.service"
import User from "@/models/user";

export default {
  name: "edit-profile",
  data(){
    return {
      id: this.$route.params.id,
      user: User,
      item: {
        username: " ",
        email: " ",
        password: "",
        firstName: " ",
        lastName: " "
      },
      password_confirmation: '',
      loading: true
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    updateProfile(){
      UsersService.editUser(this.currentUser.id, this.item).then(()=>{
        this.$router.push(`/profile/${this.currentUser.id}`)
      })
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    else if (this.currentUser.id !== parseInt(this.id)) {
      this.$router.push('/feed');
    }
    UsersService.getUserById(this.currentUser.id).then(response => {
      this.user = response.data;
      this.item.username = this.user.username;
      this.item.firstName = this.user.firstName;
      this.item.lastName = this.user.lastName;
      this.item.email = this.user.email;

      this.loading = false;
    })
  }
}
</script>

<style scoped>

</style>
