export default [
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: 'login' */ "@/views/User/login.vue")
  },
  {
    path: "/forget",
    component: () =>
      import(/* webpackChunkName: 'forget' */ "@/views/User/forget.vue")
  },
  {
    path: "/reg",
    component: () =>
      import(/* webpackChunkName: 'reg' */ "@/views/User/reg.vue")
  }
];
