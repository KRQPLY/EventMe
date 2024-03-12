import FindEventsView from '@/views/FindEventsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'findEvents',
      component: FindEventsView
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('@/views/EventView.vue'),
      props: (route) => ({ name: route.query.name }),
      beforeEnter: (to, from) => {
        if (!to.query.name) {
          return { name: 'findEvents' }
        }
      }
    },
    {
      path: '/edit-event',
      name: 'editEvent',
      component: () => import('@/views/EditEventView.vue'),
      props: (route) => ({ name: route.query.name }),
      beforeEnter: (to, from) => {
        if (!to.query.name) {
          return { name: 'findEvents' }
        }
      }
    },
    {
      path: '/create-event',
      name: 'createEvent',
      component: () => import('@/views/CreateEventView.vue')
    },
    {
      path: '/:matchAll(.*)*',
      redirect: `/`
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
