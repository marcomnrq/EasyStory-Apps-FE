<template>
  <v-card>
    <v-card-title>Error 404 - Página no encontrada</v-card-title>
    <v-card-text>No pudimos encontrar la página que buscabas. Asegurate de que escribiste bien la dirección.</v-card-text>
    <v-card-actions>
      <v-btn
          @click="$router.push('/feed')"
          color="primary"
          text
      >
        Ir al feed
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
name: "page-not-found"
}
</script>

<style scoped>

</style>
