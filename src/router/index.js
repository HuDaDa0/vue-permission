import Vue from "vue";
import VueRouter from "vue-router";

import HomeRoutes from "./routers/home.router";
import ArticleRoutes from "./routers/article.router";
import UserRoutes from "./routers/user.router";

import hooks from "./hooks";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  ...HomeRoutes,
  ...ArticleRoutes,
  ...UserRoutes

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

Object.values(hooks).forEach(hook => {
  router.beforeEach(hook.bind(router));
});

export default router;
