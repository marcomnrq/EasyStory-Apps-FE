<template>
  <div>
    <v-card
        class="mx-auto"
        max-width="600"
    >
      <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>{{ user.firstName }} {{ user.lastName }} - @{{ user.username }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        Usuario de EasyStory
      </v-card-subtitle>
      <v-card-text class="text--primary">
        <div v-if="user.id !== currentUser.id">
          <v-chip v-if="is_subscribed === false" @click="subscribe" class="ma-2" color="success" label link>
            <v-icon left>
              mdi-account-plus
            </v-icon>
            Suscribirse
          </v-chip>
          <v-chip v-else-if="is_subscribed === true" @click="unsubscribe" class="ma-2" color="alert" label link>
            <v-icon left>
              mdi-account-remove
            </v-icon>
            Cancelar suscripcion
          </v-chip>
        </div>
        <div v-else>
          <v-chip @click="$router.push(`/profile/${id}/edit`)"
                  class="ma-2"
                  label
                  link>
            <v-icon left>
              mdi-pencil
            </v-icon>
            Editar perfil
          </v-chip>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-chip class="ma-2" color="blue accent-4" outlined>
          <v-icon left>mdi-pencil</v-icon>{{ posts.length }} publicaciones
        </v-chip>
        <v-chip class="ma-2" color="orange accent-4" outlined>
          <v-icon left>mdi-account-star</v-icon>{{ subscribers.length }} suscriptores
        </v-chip>
        <v-chip class="ma-2" color="green accent-4" outlined>
          <v-icon left>mdi-account-multiple</v-icon>{{ subscriptions.length }} suscripciones
        </v-chip>
      </v-card-actions>
      <v-divider class="mx-auto"></v-divider>
      <v-timeline
          align-top
          :dense="$vuetify.breakpoint.smAndDown"
      >
        <v-timeline-item
            v-for="post in posts" v-bind:key="post.id"
            color="indigo"
            icon="mdi-star"
            fill-dot
        >
          <v-card
              color="indigo"
              dark
          >
            <v-card-title>{{post.title}}</v-card-title>
            <v-card-text>
              <p>{{post.description}}</p>
              <v-btn
                  @click="$router.push(`/post/${post.id}`)"
                  class="mx-0"
                  outlined
              >
                Ver mas
              </v-btn>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card>
  </div>
</template>

<script>
import UsersService from '@/services/user.service'
import User from "@/models/user";
export default {
  name: "view-profile",
  data() {
    return {
      id: this.$route.params.id,
      user: User,
      posts: {},
      subscriptions: {},
      subscribers: {},
      is_subscribed: null,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getContent() {
      UsersService.getUserById(this.id).then(response => {
        this.user = response.data;
        this.getPosts();
        if(this.user.id !== this.currentUser.id){
          this.getSubscription()
        }
        this.getAllSubscriptions();
        this.getSubscribers();
      })
    },
    getAllSubscriptions(){
      UsersService.getAllSubscriptions(this.id).then(response => {
        this.subscriptions = response.data;
      }).catch(response=>{console.log(response)})
    },
    getSubscription(){
      UsersService.getSubscription(this.currentUser.id, this.user.id).then(() => {
        this.is_subscribed = true
      }).catch(()=>{this.is_subscribed = false})
    },
    getSubscribers(){
      UsersService.getSubscribers(this.id).then(response => {
        this.subscribers = response.data;
      })
    },
    getPosts() {
      UsersService.getPostCount(this.id).then(response => {
        this.posts = response.data.reverse()
      })
    },
    subscribe() {
      UsersService.subscribe(this.currentUser.id, this.id, { "price": 0 }).then(() => {
        this.$router.go();
      }).catch(response => console.log(response))
    },
    unsubscribe() {
      UsersService.unsubscribe(this.currentUser.id, this.id).then(() => {
        this.$router.go();
      }).catch(response => console.log(response))
    }
  },
  mounted(){
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    UsersService.getUserById(this.id).then(response => {
      this.user = response.data;
    }).catch(() => {
      console.log("USER DOES NOT EXISTS");
      this.$router.push('/feed');
    })
    this.getContent();
  }
}
</script>

<style scoped>

</style>
