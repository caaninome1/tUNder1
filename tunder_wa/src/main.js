import { createApp } from "vue";
import App from "./App.vue";
import { apolloProvider } from "./apollo.provider";
import store from "./store";

const app = createApp(App);

app.use(apolloProvider);
app.use(store);
app.mount("#app");
