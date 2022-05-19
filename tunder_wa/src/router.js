import { createRouter, createWebHistory} from "vue-router";
import LoginPane from "./components/LoginPane.vue";
import Home from "./components/Home.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPane
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;