import { createApp, h, provide } from 'vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router"

const httpLink = createHttpLink({
    uri:'http://localhost:8000/graphql'
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient(
    {
        link: httpLink,
        cache
    }
)
const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: ()=>h(App),
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus)
app.use(router)
app.mount('#app')

