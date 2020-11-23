import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from "@/components/Dashboard";
import NewPatient from "@/components/NewPatient"
import ViewPatient from "@/components/ViewPatient"
import EditPatient from "@/components/EditPatient"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/new',
            name: 'new-patient',
            component: NewPatient
        },
        {
            path: '/:userID',
            name: 'view-patient',
            component: ViewPatient
        },
        {
            path: '/edit/:userID',
            name: 'edit-patient',
            component: EditPatient
        }
    ]
})
