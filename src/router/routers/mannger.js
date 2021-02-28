export default [
  {
    path: "userStatistics",
    meta: {
      auth: "userStatistics"
    },
    name: "userStatistics",
    component: () => import("@/views/Manager/userStatistics.vue")
  },
  {
    path: "userAuth",
    name: "userAuth",
    meta: {
      auth: "userAuth"
    },
    component: () => import("@/views/Manager/userAuth.vue")
  },
  {
    path: "infoPublish",
    name: "infoPublish",
    meta: {
      auth: "infoPublish"
    },
    component: () => import("@/views/Manager/infoPublish.vue")
  },
  {
    path: "privateMessage",
    name: "privateMessage",
    meta: {
      auth: "privateMessage"
    },
    component: () => import("@/views/Manager/privateMessage.vue")
  },
  {
    path: "personal",
    name: "personal",
    meta: {
      auth: "personal"
    },
    component: () => import("@/views/Manager/personal.vue")
  },
  {
    path: "myArticle",
    name: "myArticle",
    meta: {
      auth: "myArticle"
    },
    component: () => import("@/views/Manager/myArticle.vue")
  },
  {
    path: "myCollection",
    name: "myCollection",
    meta: {
      auth: "myCollection"
    },
    component: () => import("@/views/Manager/myCollection.vue")
  },
  {
    path: "articleManager",
    name: "articleManager",
    meta: {
      auth: "articleManager"
    },
    component: () => import("@/views/Manager/articleManager.vue")
  }
];
