import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      meta: { layout: 'empty' },
      component: () => import('../views/Login')
    },
    {
      path: '/sites',
      name: 'sites',
      meta: { layout: 'main' },
      component: () => import('../views/Sites')
    },
    {
      path: '/addEmployees',
      name: 'addEmployees',
      meta: { layout: 'main' },
      component: () => import('../views/AddEmployees')
    },
    {
      path: '/addWorkers',
      name: 'addWorkers',
      meta: { layout: 'main' },
      component: () => import('../views/AddWorkers')
    }
  ]
})

export default router
