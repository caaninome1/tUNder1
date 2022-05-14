import { createApp } from 'vue'
import App from './App.vue'
import * as apolloProvider from './apollo.provider'

const app = createApp(App)

app.use(apolloProvider.provider);
app.mount('#app')
