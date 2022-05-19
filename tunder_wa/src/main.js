import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

import * as apolloProvider from './apollo.provider'
import store from "./store"

const app = createApp(App)

app.use(router)
app.use(apolloProvider.provider)
app.use(store)

app.mount('#app')
