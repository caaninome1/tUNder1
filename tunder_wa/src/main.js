import { createApp } from 'vue'
import App from './App.vue'
import * as apolloProvider from './apollo.provider'
import store from "./store"

const app = createApp(App)

app.use(apolloProvider.provider)
app.use(store)
app.mount('#app')
