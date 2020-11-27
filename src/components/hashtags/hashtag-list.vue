<template>
  <div v-if="!loading">
    <v-card>
    <v-toolbar dense>
      <v-text-field
          v-model="search"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
          placeholder="Buscar un hashtag..."
      ></v-text-field>
    </v-toolbar>
      <v-chip
          v-for="hashtag in filteredList" v-bind:key="hashtag.id"
          class="ma-2"
          color="pink"
          label
          text-color="white"
          @click="$router.push(`/hashtag/${hashtag.id}`)"
      >
        <v-icon left>
          mdi-label
        </v-icon>
        {{ hashtag.name }}
      </v-chip>
    </v-card>
  </div>
</template>

<script>
import PostService from "@/services/post.service"
export default {
  name: "hashtag-list",
  data(){
    return {
      hashtags: {},
      search: '',
      loading: true
    }
  },
  methods: {

  },
  computed: {
    filteredList() {
      return Object.values(this.hashtags).filter(tag => {
        return tag.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted() {
    PostService.getAllHashtags().then(response => {
      this.hashtags = response.data;
    })
    this.loading = false;
  }
}
</script>

<style scoped>

</style>
