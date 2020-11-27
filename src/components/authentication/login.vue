<template>
  <v-container>
    <v-card>
      <v-card-title>Login Form</v-card-title>
      <v-form v-model="isValid">
        <v-card-text>
          <v-text-field label="Username"
                        v-model="user.username"
                        :rules="[v => !!v || 'Username is required.']"
                        required></v-text-field>
          <v-text-field label="Password"
                        v-model="user.password"
                        type="password"
                        :rules="[v => !!v || 'Password is required']"
                        required></v-text-field>
          <div v-if="message">
            {{ message }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="handleLogin" color="primary" :disabled="loading" type="submit">
            <v-progress-circular indeterminate color="primary"
                                 v-if="loading"></v-progress-circular>
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import User from "@/models/user";

export default {
  name: "login",
  data() {
    return {
      user: new User('', '', '', '', '', ''),
      loading: false,
      message: '',
      isValid: true
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      console.log('Starting Login handling');
      if (!this.isValid) {
        console.log('Invalid');
        this.loading = false;
        return;
      }
      if (this.user.username && this.user.password) {
        console.log('Loggin in...');
        this.$store.dispatch('auth/login', this.user).then(
            (user) => {
              console.log('Logged In');
              console.log(user);
              this.$router.push(`/feed`);
            },
            error => {
              console.log('Error');
              this.loading = false;
              this.message = (error.response && error.response.data)
              || error.message || error.toString();
            }
        )
      }
    }
  }
}
</script>

<style scoped>

</style>
