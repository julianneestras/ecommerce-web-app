import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import Index from "../layout/index.vue";
import Products from "../views/Products.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "",
        name: "Home",
        component: Index,
      },
      {
        path: "/products",
        name: "Products",
        component: Products,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
