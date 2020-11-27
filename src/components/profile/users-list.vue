<template>
  <v-container>
    <h3>Users List</h3>
    <p>{{ message }}</p>
    <div v-if="users">
      <ul>
        <li v-for="user in users" :key="user.id">{{ user.username }}</li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import UserService from '../../services/user.service';

export default {
  name: "users-list",
  data() {
    return {
      users: [],
      message: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    UserService.getAll().then(
        response => {
          this.users = response.data;
        },
        error => {
          this.message = (error.response && error.response.data)
          || error.toString();
        }
    )
  }
}

</script>

<style scoped>

</style>
