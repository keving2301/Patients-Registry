import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import NewPatient from '@/views/NewPatient.vue'
import ViewPatient from '@/views/ViewPatient.vue'
import EditPatient from '@/views/EditPatient.vue'

Vue.use(Router)

const router = new Router({
  // Hash mode keeps every address working on a static host without rewrite rules.
  mode: 'hash',
  routes: [
    { path: '/', name: 'dashboard', component: Dashboard, meta: { title: 'Patients' } },
    { path: '/new', name: 'new-patient', component: NewPatient, meta: { title: 'New patient' } },
    { path: '/edit/:userID', name: 'edit-patient', component: EditPatient, meta: { title: 'Edit patient' } },
    { path: '/:userID', name: 'view-patient', component: ViewPatient, meta: { title: 'Patient record' } },
    { path: '*', redirect: '/' }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

router.afterEach(to => {
  document.title = `${to.meta.title || 'Patients'} | Clinical Registry`
})

export default router
