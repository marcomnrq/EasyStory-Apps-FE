<template>
  <v-container>
    <v-card>
      <v-card-title>Register Form</v-card-title>
      <v-form v-model="isValid">
        <v-card-text>
          <v-text-field label="Username" v-model="user.username" required></v-text-field>
          <v-text-field label="Email" v-model="user.email"></v-text-field>
          <v-text-field label="First Name" v-model="user.firstName"></v-text-field>
          <v-text-field label="Last Name" v-model="user.lastName"></v-text-field>
          <v-text-field label="Password" v-model="user.password" type="password" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="handleRegister" color="primary">Register</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import User from "@/models/user";

export default {
  name: "register",
  data() {
    return {
      user: new User('', '', '', '', '', ''),
      submitted: false,
      successful: false,
      message: '',
      isValid: true
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      if (this.isValid) {
        this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
              this.$router.push('/login');
            },
            error => {
              this.message = (error.response && error.response.data)
              || error.message || error.toString();
              this.successful = false;
            }
        )
      }
    }
  }
}
</script>

<style scoped>

</style>
