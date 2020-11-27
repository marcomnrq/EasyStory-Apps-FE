<template>
  <nav>
    <v-list v-if="currentUser">
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">{{ currentUser.firstName }} {{ currentUser.lastName }}</v-list-item-title>
          <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <div v-if="currentUser">
      <!-- If user is logged in -->
      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-switch
                v-model="$vuetify.theme.dark"
                label="Modo oscuro"
            ></v-switch>
          </v-list-item>
          <v-list-item @click="$router.push('/feed')">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Feed</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="$router.push('/bookmarks')">
            <v-list-item-icon>
              <v-icon>mdi-bookmark-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Marcadores</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="$router.push('/hashtags')">
            <v-list-item-icon>
              <v-icon>mdi-tag</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Hashtags</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-bell-ring</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link to="/notifications" style="text-decoration: none; color: inherit;">
                <v-list-item-title>Notificaciones</v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="$router.push(`/profile/${currentUser.id}`)">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item href="https://landingpage.abad2016.repl.co/">
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Acerca de</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Cerrar sesion</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-row align="center" justify="space-around">
        <v-btn
            tile color="primary"
            @click="$router.push(`/new-post`)"
        >
          <v-icon left>
            mdi-pencil
          </v-icon>
          Nuevo Post
        </v-btn>
      </v-row>
    </div>
    <div v-else>
      <!-- If user is not logged in -->
      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item @click="$router.push('/login')">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Iniciar sesion</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="$router.push('/register')">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Crear una cuenta</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navigation-bar",
  data: () => ({
    selectedItem: 0,
    items: [
      { text: 'Feed', icon: 'mdi-view-dashboard', link: "/feed" },
      { text: 'Marcadores', icon: 'mdi-bookmark-check', link: "/bookmarks" },
      { text: 'Mensajes', icon: 'mdi-message-text', link: "/messages" },
      { text: 'Notificaciones', icon: 'mdi-bell-ring', link: "/notifications" },
      { text: 'Cuenta', icon: 'mdi-account-circle', link: '/profile/2' },
      { text: 'Acerca de', icon: 'mdi-information', link: '/about' },
      { text: 'Cerrar sesión', icon: 'mdi-logout', link: '/logout' },
    ],
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>
