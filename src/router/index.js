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
      path: '/sites/editor',
      name: 'sitesEditor',
      meta: { layout: 'main' },
      component: () => import('../components/sites/EditorSites')
    },
    {
      path: '/employees',
      name: 'employees',
      meta: { layout: 'main' },
      component: () => import('../views/Employees')
    },
    {
      path: '/employees/editor',
      name: 'employeesEditor',
      meta: { layout: 'main' },
      component: () => import('../components/employees/EditorEmployees')
    },
    {
      path: '/workers',
      name: 'workers',
      meta: { layout: 'main' },
      component: () => import('../views/Workers')
    },
    {
      path: '/workers/editor',
      name: 'workersEditor',
      meta: { layout: 'main' },
      component: () => import('../components/workers/EditorWorkers')
    }
  ]
})

export default router
