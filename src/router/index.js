import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    alias: '/search',
    name: 'search',
    component: () => import('../views/search.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detail.vue')
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import('../views/analysis.vue')
  },
  {
    path: '/collection/:name',
    name: 'collection',
    component: () => import('../views/collection.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
