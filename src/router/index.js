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
      component: () => import('../components/sites/CityEdit')
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
      component: () => import('../components/employees/EmployeeEdit')
    },
    {
      path: '/employees/history/employee:id',
      name: 'employeeHistory',
      meta: { layout: 'main' },
      component: () => import('../components/employees/EmployeeHistory')
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
      component: () => import('../components/workers/WorkerEdit')
    },
    {
      path: '/workers/search',
      name: 'workersSearch',
      meta: { layout: 'main' },
      component: () => import('../components/workers/WorkersSearch')
    },
    {
      path: '/workers/about/worker:id',
      name: 'workerAbout',
      meta: { layout: 'main' },
      component: () => import('../components/workers/WorkerAbout')
    },
    {
      path: '/workers/history/worker:id',
      name: 'workerHistory',
      meta: { layout: 'main' },
      component: () => import('../components/workers/WorkerHistory')
    },
    {
      path: '/workers/calendar/worker:id',
      name: 'workerCalendar',
      meta: { layout: 'main' },
      component: () => import('../components/workers/calendar/WorkerCalendar')
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
      component: () => import('../components/customers/CustomerAbout')
    },
    {
      path: '/customers/edit/customer:id',
      name: 'customerEdit',
      meta: { layout: 'main' },
      component: () => import('../components/customers/CustomerEdit')
    },

    {
      path: '/customers/subdivisions/customer:id',
      name: 'customerSubdivisions',
      meta: { layout: 'main' },
      component: () => import('../components/customers/subdivisions/CustomerSubdivisions')
    },
    {
      path: '/customers/subdivisions/customer:id/about/subdivision:subId',
      name: 'customerAboutSubdivision',
      meta: { layout: 'main' },
      component: () => import('../components/customers/subdivisions/CustomerSubdivisionAbout')
    },
    {
      path: '/customers/subdivisions/customer:id/edit/subdivision:subId',
      name: 'customerEditSubdivision',
      meta: { layout: 'main' },
      component: () => import('../components/customers/subdivisions/CustomerSubdivisionEdit')
    },

    {
      path: '/customers/subdivisions/customer:id/subdivision:subId/employees',
      name: 'subdivisionEmployees',
      meta: { layout: 'main' },
      component: () => import('../components/customers/subdivisions/employees/CustomerEmployees')
    },
    {
      path: '/customers/subdivisions/customer:id/subdivision:subId/employees/about/employee:empId',
      name: 'subdivisionAboutEmployee',
      meta: { layout: 'main' },
      component: () => import('../components/customers/subdivisions/employees/CustomerEmployeeAbout')
    },
    {
      path: '/customers/subdivisions/customer:id/subdivision:subId/employees/edit/employee:empId',
      name: 'subdivisionEditEmployee',
      meta: { layout: 'main' },
      component: () => import('../components/customers/subdivisions/employees/CustomerEmployeeEdit')
    }
  ]
})

export default router
