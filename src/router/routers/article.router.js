export default [
  {
    path: "/post",
    component: () =>
      import(/* webpackChunkName: 'post' */ "@/views/Article/post.vue")
  }
];
