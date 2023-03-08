import { createRouter, createWebHistory } from 'vue-router'
import FindEventsView from '../views/FindEventsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'findEvents',
      component: FindEventsView
    },
    {
      path: '/my-events',
      name: 'myEvents',
      component: () => import('@/views/MyEventsView.vue')
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('@/views/EventView.vue'),
      props: (route) => ({ id: route.query.id })
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('@/views/FriendsView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/LoginView.vue'),
      props: (route) => ({
        redirect: route.query.redirect,
        redirectId: Number(route.query.redirectId)
      })
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/LoginView.vue'),
      props: (route) => ({
        redirect: route.query.redirect,
        redirectId: Number(route.query.redirectId)
      })
    },
    {
      path: '/signin/:matchAll(.*)*',
      redirect: `/signin`
    },
    {
      path: '/signup/:matchAll(.*)*',
      redirect: `/signup`
    },
    {
      path: '/:matchAll(.*)*',
      redirect: `/`
    }
  ]
})

export default router
