<template>

  <v-app>

    <v-navigation-drawer app>
      <navigation-bar/>
    </v-navigation-drawer>


    <v-app-bar app>
      <app-bar/>
    </v-app-bar>


    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>


    <v-footer dark padless>
    </v-footer>
  </v-app>
</template>
<script>

import NavigationBar from "@/components/interface/navigation-bar";
import AppBar from "@/components/interface/app-bar";
export default {
  name: 'App',
  components: {AppBar, NavigationBar},
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>
<style>

</style>
