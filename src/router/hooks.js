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
    await store.dispatch("user/setUserValidate");
    next();
  }
};
