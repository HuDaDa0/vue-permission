import store from "../store";

export default {
  // key 是给用户看的  value 才是 beforeEach
  cancelToken: function(to, from, next) {
    // 取消上个页面的请求
    store.state.ajaxTokens.forEach(fn => fn());
    store.commit("SET_REQUEST_TOKEN", "clear");
    next();
  },
  loginPermission: async function(to, from, next) {
    // 返回的结果存放到 vuex 中
    // whiteList 白名单 可以配置哪些页面不需要验证的
    await store.dispatch("user/setUserValidate");

    if (store.state.user.hasPermission) {
      if (to.path === "/login") {
        next("/");
      } else {
        next();
      }
    } else {
      // 看看哪些接口需要权限访问
      let needLogin = to.matched.some(item => item.meta.needLogin);
      if (needLogin) {
        next("/login");
      }
      next();
    }
  }
};
