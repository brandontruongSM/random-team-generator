import { createRouter, createWebHistory } from "vue-router"
import TeamsGenerator from './components/TeamsGenerator'
import ProfilePage from './components/ProfilePage'

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