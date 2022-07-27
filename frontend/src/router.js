import { createRouter, createWebHistory } from "vue-router"
import TeamsGenerator from './components/team-list/TeamsGenerator.vue'
import ProfilePage from './components/profile/ProfilePage.vue'

const routeInfos = [
{
    path : "/",
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