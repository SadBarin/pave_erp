import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
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
      path: '/sites/edit/city:id',
      name: 'cityEdit',
      meta: { layout: 'main' },
      component: () => import('../components/sites/EditCity')
    },
    {
      path: '/employees',
      name: 'employees',
      meta: { layout: 'main' },
      component: () => import('../views/Employees')
    },
    {
      path: '/employees/edit/employee:id',
      name: 'employeeEdit',
      meta: { layout: 'main' },
      component: () => import('../components/employees/EditEmployee')
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
    },
    {
      path: '/workers/search',
      name: 'workersSearch',
      meta: { layout: 'main' },
      component: () => import('../components/workers/SearchWorkers')
    },
    {
      path: '/workers/about',
      name: 'workersAbout',
      meta: { layout: 'main' },
      component: () => import('../components/workers/about/AboutWorker')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
