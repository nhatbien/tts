import { createRouter, createWebHistory } from 'vue-router'
import ConvertVue from '../views/Convert.vue'
import ConvertListVue from '../views/ConvertList.vue'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Sigup from '../views/Sigup.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { layout: 'empty' }
    },
    {
      path: '/register',
      name: 'register',
      component: Sigup,
      meta: { layout: 'empty' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/convert',
      name: 'convert',
      component: ConvertVue ,
      meta: { title: 'Add Text To Speech' }
    },
    {
      path: '/listconvert',
      name: 'listconvert',
      component: ConvertListVue ,
      meta: { title: 'List Text To Speech' }

    },
  ]
})

export default router
