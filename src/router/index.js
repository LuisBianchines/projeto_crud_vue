// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
      { 
        path: '',
        name: 'Home',
  
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/Cadastro',
        name: 'Cadastro',

        component: () => import(/* webpackChunkName: "Cadastro" */'@/views/Cadastro.vue')
      }
    ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
