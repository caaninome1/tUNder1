import { createRouter, createWebHistory} from "vue-router";
import LoginPane from "./components/LoginPane.vue";
import MatchesPane from "./components/MatchesPane.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPane
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;