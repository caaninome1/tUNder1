import { createRouter, createWebHistory} from "vue-router";
import LoginPane from "./components/LoginPane.vue";
import Home from "./components/Home.vue";
import SignUp from "./views/SignUp.vue";

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
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;