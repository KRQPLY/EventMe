import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import FindEventsView from '../views/FindEventsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'findEvents',
      component: FindEventsView,
      meta: { requiresAuth: false }
    },
    {
      path: '/my-events',
      name: 'myEvents',
      component: () => import('@/views/MyEventsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('@/views/EventView.vue'),
      props: (route) => ({ id: route.query.id }),
      meta: { requiresAuth: true },
      beforeEnter: (to, from) => {
        if (!to.query.id) {
          return { name: 'findEvents' }
        }
      }
    },
    {
      path: '/add-event',
      name: 'AddEvent',
      component: () => import('@/views/AddEventView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('@/views/FriendsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/LoginView.vue'),
      props: (route) => ({
        redirect: route.query.redirect,
        redirectId: Number(route.query.redirectId)
      }),
      meta: { requiresAuth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/LoginView.vue'),
      props: (route) => ({
        redirect: route.query.redirect,
        redirectId: Number(route.query.redirectId)
      }),
      meta: { requiresAuth: false }
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
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from) => {
  const userStore = useUserStore()

  if (!userStore.token && to.meta.requiresAuth) {
    return { name: 'signin', query: { redirect: to.name, redirectId: to.query.id } }
  } else if (userStore.token && ['signin', 'signup'].includes(to.name)) {
    return { name: 'findEvents' }
  }
})

export default router
