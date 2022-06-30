import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store";

import { createApolloClient } from "./apollo.provider";
import { createApolloProvider } from "@vue/apollo-option";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(
  createApolloProvider({
    defaultClient: createApolloClient(false),
  })
);

app.mount("#app");
