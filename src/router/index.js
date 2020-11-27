import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/interface/home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: () => import('../components/authentication/login')},
  { path: '/register', name: 'register', component: () => import('../components/authentication/register')},
  { path: '/hashtags', name: 'hashtags', component: () => import('../components/hashtags/hashtag-list')},
  { path: '/hashtag/:id', name: 'hashtag', component: () => import('../components/hashtags/hashtag-posts')},
  { path: '/bookmarks', name: 'bookmarks', component: () => import('../components/bookmarks/bookmark-list')},
  { path: '/profile/:id', name: 'profile', component: () => import('../components/profile/view-profile')},
  { path: '/post/:id', name: 'post', component: () => import('../components/posts/view-post')},
  { path: '/post/:id/edit', name: 'edit-post', component: () => import('../components/posts/edit-post')},
  { path: '/profile/:id/edit', name: 'edit-profile', component: () => import('../components/profile/edit-profile')},
  { path: '/new-post', name: 'new-post', component: () => import('../components/posts/new-post')},
  { path: '/users', name: 'users', component: () => import('../components/profile/users-list')},
  { path: '/feed', name: 'feed', component: () => import('../components/posts/feed')},
  { path: '*', name: '404', component: () => import('../components/interface/page-not-found')}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
