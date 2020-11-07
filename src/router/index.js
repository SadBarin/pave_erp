import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login')
  },
  {
    path: '/addEmployees',
    name: 'addEmployees',
    meta: { layout: 'main' },
    component: () => import('../views/AddEmployees')
  },
  {
    path: '/sites',
    name: 'sites',
    meta: { layout: 'main' },
    component: () => import('../views/Sites')
  },
  {
    path: '/addWorkers',
    name: 'addWorkers',
    meta: { layout: 'main' },
    component: () => import('../views/AddWorkers')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
