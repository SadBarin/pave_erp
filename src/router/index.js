import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      meta: { layout: 'empty' },
      component: () => import('../views/TheLogin')
    },
    {
      path: '/sites',
      name: 'sites',
      meta: { layout: 'main' },
      component: () => import('../views/TheSites')
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
      component: () => import('../views/TheEmployees')
    },
    {
      path: '/employees/edit/employee:id',
      name: 'employeeEdit',
      meta: { layout: 'main' },
      component: () => import('../components/employees/EditEmployee')
    },
    {
      path: '/employees/history/employee:id',
      name: 'employeeHistory',
      meta: { layout: 'main' },
      component: () => import('../components/employees/HistoryEmployee')
    },

    {
      path: '/workers',
      name: 'workers',
      meta: { layout: 'main' },
      component: () => import('../views/TheWorkers')
    },
    {
      path: '/workers/edit/worker:id',
      name: 'workerEdit',
      meta: { layout: 'main' },
      component: () => import('../components/workers/EditWorker')
    },
    {
      path: '/workers/search',
      name: 'workersSearch',
      meta: { layout: 'main' },
      component: () => import('../components/workers/SearchWorkers')
    },
    {
      path: '/workers/about/worker:id',
      name: 'workerAbout',
      meta: { layout: 'main' },
      component: () => import('../components/workers/AboutWorker')
    },
    {
      path: '/workers/history/worker:id',
      name: 'workerHistory',
      meta: { layout: 'main' },
      component: () => import('../components/workers/HistoryWorker')
    },
    {
      path: '/workers/calendar/worker:id',
      name: 'workerCalendar',
      meta: { layout: 'main' },
      component: () => import('../components/workers/calendar/CalendarWorker')
    },

    {
      path: '/settings',
      name: 'settings',
      meta: { layout: 'main' },
      component: () => import('../views/TheSettings')
    },

    {
      path: '/customers',
      name: 'customers',
      meta: { layout: 'main' },
      component: () => import('../views/TheCustomers')
    },
    {
      path: '/customers/about/customer:id',
      name: 'customerAbout',
      meta: { layout: 'main' },
      component: () => import('../components/customers/AboutCustomer')
    },
    {
      path: '/customers/edit/customer:id',
      name: 'customerEdit',
      meta: { layout: 'main' },
      component: () => import('../components/customers/EditCustomers')
    }
  ]
})

export default router
