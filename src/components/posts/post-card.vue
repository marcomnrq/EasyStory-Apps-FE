<template>
    <div v-if="!loading">
      <v-card
          class="mx-auto my-12"
          max-width="574"
      >
        <template slot="progress">
          <v-skeleton-loader></v-skeleton-loader>
        </template>

        <v-img
            height="250"
            src="http://placehold.it/574x250"
        ></v-img>
        <v-card-title>{{ post.title }}</v-card-title>
        <v-chip
            class="ma-2"
            color="indigo"
            text-color="white"
            @click="$router.push(`/profile/${user.id}`)"
        >
          <v-avatar left>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          {{ user.firstName }} {{ user.lastName }}
        </v-chip>

        <v-card-text>
          <v-row
              align="center"
              class="mx-0"
          >
            <v-rating
                :value="rating"
                dense
                half-increments
                readonly
                size="14"
            ></v-rating>

            <div v-if="ratings.length > 0" class="grey--text ml-4">{{ rating }} ({{ ratings.length }})</div>
            <div v-else class="grey--text ml-4">Sin reseñas</div>
          </v-row>

          <div>{{ post.description }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
              color="primary"
              text
              @click="$router.push(`/post/${post.id}`)"
          >
            Ver publicación
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>

import Post from "@/models/post";
import UsersService from "@/services/user.service";
import PostService from "@/services/post.service";
import User from "@/models/user";

export default {
  name: "post-card",
  props: {
    post: Object[Post],
  },
  data(){
    return {
      user: User,
      rating: 0,
      ratings: {},
      loading: true,
    }
  },
  methods: {
    getUsername(){
      UsersService.getUserById(this.post.userId).then(response => {
        this.user = response.data;
      }).catch(response => console.log(response));
    },
    getQualifications(){
      PostService.getPostQualifications(this.post.id).then(response => {
        this.ratings = response.data;

        if (response.data.length === 0){
          this.rating = 0;
        }else{
          let i;
          for(i = 0; i< this.ratings.length; i++){
            this.rating = this.rating + this.ratings[i].qualificate;
          }
          this.rating = this.rating/this.ratings.length;
        }
      }).catch(response => console.log(response));
    }
  },

  mounted(){
    this.getUsername();
    this.getQualifications();
    this.loading = false;
  }
}
</script>
