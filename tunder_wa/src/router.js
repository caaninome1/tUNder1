import { createRouter, createWebHistory } from "vue-router";
import LoginPane from "./components/LoginPane.vue";
import Home from "./components/Home.vue";
import SignUp from "./views/SignUp.vue";
import Comics from "./views/Comics.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPane,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/comics",
    name: "comics",
    component: Comics,
  },
  {
    path: "/",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
