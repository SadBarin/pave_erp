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
      component: () => import('../components/section/sites/CityEdit')
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
      component: () => import('../components/section/employees/EmployeeEdit')
    },
    {
      path: '/employees/history/employee:id',
      name: 'employeeHistory',
      meta: { layout: 'main' },
      component: () => import('../components/section/employees/EmployeeHistory')
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
      component: () => import('../components/section/workers/WorkerEdit')
    },
    {
      path: '/workers/search',
      name: 'workersSearch',
      meta: { layout: 'main' },
      component: () => import('../components/section/workers/WorkersSearch')
    },
    {
      path: '/workers/about/worker:id',
      name: 'workerAbout',
      meta: { layout: 'main' },
      component: () => import('../components/section/workers/WorkerAbout')
    },
    {
      path: '/workers/history/worker:id',
      name: 'workerHistory',
      meta: { layout: 'main' },
      component: () => import('../components/section/workers/WorkerHistory')
    },
    {
      path: '/workers/calendar/worker:id',
      name: 'workerCalendar',
      meta: { layout: 'main' },
      component: () => import('../components/section/workers/calendar/WorkerCalendar')
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
      component: () => import('../components/section/customers/CustomerAbout')
    },
    {
      path: '/customers/edit/customer:id',
      name: 'customerEdit',
      meta: { layout: 'main' },
      component: () => import('../components/section/customers/CustomerEdit')
    },

    {
      path: '/customers/subdivisions/customer:id',
      name: 'customerSubdivisions',
      meta: { layout: 'main' },
      component: () => import('../components/section/customers/subdivisions/CustomerSubdivisions')
    },
    {
      path: '/customers/subdivisions/customer:id/about/subdivision:subId',
      name: 'customerAboutSubdivision',
      meta: { layout: 'main' },
      component: () => import('../components/section/customers/subdivisions/CustomerSubdivisionAbout')
    },
    {
      path: '/customers/subdivisions/customer:id/edit/subdivision:subId',
      name: 'customerEditSubdivision',
      meta: { layout: 'main' },
      component: () => import('../components/section/customers/subdivisions/CustomerSubdivisionEdit')
    },

    {
      path: '/customers/subdivisions/customer:id/subdivision:subId/employees',
      name: 'subdivisionEmployees',
      meta: { layout: 'main' },
      component: () => import('../components/section/customers/subdivisions/employees/CustomerEmployees')
    },
    {
      path: '/customers/subdivisions/customer:id/subdivision:subId/employees/about/employee:empId',
      name: 'subdivisionAboutEmployee',
      meta: { layout: 'main' },
      component: () => import('../components/section/customers/subdivisions/employees/CustomerEmployeeAbout')
    },
    {
      path: '/customers/subdivisions/customer:id/subdivision:subId/employees/edit/employee:empId',
      name: 'subdivisionEditEmployee',
      meta: { layout: 'main' },
      component: () => import('../components/section/customers/subdivisions/employees/CustomerEmployeeEdit')
    },

    {
      path: '/deals',
      name: 'deal',
      meta: { layout: 'main' },
      component: () => import('../views/TheDeals')
    },
    {
      path: '/deals/edit/deal:id',
      name: 'dealEdit',
      meta: { layout: 'main' },
      component: () => import('../components/section/deals/DealEdit')
    },
    {
      path: '/deals/history/deal:id',
      name: 'dealHistory',
      meta: { layout: 'main' },
      component: () => import('../components/section/deals/DealHistory')
    }
  ]
})

export default router
