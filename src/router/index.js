import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Note from '../views/Note.vue'
// import { getAuth } from "firebase/auth";
import { auth } from '@/firebase'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      let user = auth.currentUser;
      if(user){
        next('/note');
      }else{
        next();
      }
    }
  },
  {
    path: '/note',
    name: 'note',
    component: Note,
    beforeEnter: (to, from, next) => {
      let user = auth.currentUser;
      if(!user){
        next('/');
      }else{
        next();
      }
    }
  }

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
