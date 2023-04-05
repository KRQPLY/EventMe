import FindEventsView from '@/views/FindEventsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import validateToken from '@/helpers/validateToken'

async function checkIfUserLoggedIn() {
  const isTokenValid = await validateToken()

  if (isTokenValid) {
    return { name: 'findEvents' }
  }
}

async function checkIfTokenValid(to) {
  const isTokenValid = await validateToken()

  if (!isTokenValid && to.meta.requiresAuth) {
    return { name: 'signin', query: { redirect: to.name, redirectId: to.query.id } }
  }
}

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
      path: '/edit-event',
      name: 'editEvent',
      component: () => import('@/views/EditEventView.vue'),
      props: (route) => ({ id: Number(route.query.id) }),
      meta: { requiresAuth: true },
      beforeEnter: (to, from) => {
        if (!to.query.id) {
          return { name: 'findEvents' }
        }
      }
    },
    {
      path: '/create-event',
      name: 'createEvent',
      component: () => import('@/views/CreateEventView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountView.vue'),
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
      meta: { requiresAuth: false },
      beforeEnter: checkIfUserLoggedIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/LoginView.vue'),
      props: (route) => ({
        redirect: route.query.redirect,
        redirectId: Number(route.query.redirectId)
      }),
      meta: { requiresAuth: false },
      beforeEnter: checkIfUserLoggedIn
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
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeResolve(checkIfTokenValid)

export default router
