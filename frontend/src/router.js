import { createRouter, createWebHistory } from "vue-router"
import TeamsGenerator from './components/team-list/TeamsGenerator.vue'
import ProfilePage from './components/profile/ProfilePage.vue'
import Dashboard from './components/dashboard/DashboardPage.vue'

const routeInfos = [
{
    path : "/",
    component : Dashboard
},
{
    path : "/teams",
    component : TeamsGenerator
},
{
    path : "/profile",
    component : ProfilePage
}
]

const router = createRouter({
    history : createWebHistory(),
    routes : routeInfos
})

export default router;