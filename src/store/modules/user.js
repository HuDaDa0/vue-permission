import router from "@/router";

import { login, validate } from "@/api/public";
import managerRoutes from "@/router/routers/manager";

function filterRouter(authList) {
  let auths = authList.map(item => item.auth);
  const filter = authRoutes => {
    let result = authRoutes.filter(route => {
      if (auths.includes(route.meta.auth)) {
        if (route.children) {
          route.children = filter(route.children);
        }
        return route;
      }
    });
    return result;
  };
  return filter(managerRoutes);
}

export default {
  state: {
    userInfo: {},
    hasPermission: false,
    menuPermission: false,
    btnPermission: { edit: true, delete: false }
  },
  mutations: {
    SET_USER(state, payload) {
      state.userInfo = payload;
      if (state.userInfo && state.userInfo.token) {
        localStorage.setItem("token", state.userInfo.token);
      }
    },
    SET_PERMISSION(state, has) {
      state.hasPermission = has;
    },
    SET_LOGOUT(state) {
      state.userInfo = {};
      state.hasPermission = false;
      localStorage.removeItem("token");
    },
    SET_MENU_PERMISSION(state, has) {
      state.menuPermission = has;
    }
  },
  actions: {
    async setUser({ commit }, { payload, hasPermission }) {
      commit("SET_USER", payload);
      commit("SET_PERMISSION", hasPermission);
    },
    async login({ dispatch }, options) {
      const result = await login(options);
      dispatch("setUser", {
        payload: result.user,
        hasPermission: true
      });
      return result;
    },
    logout({ commit }) {
      commit("SET_LOGOUT");
    },
    async setUserValidate({ commit }) {
      // 页面每次刷新 或者 进入下一个页面，就会验证一次用户是否登录
      if (!localStorage.getItem("token")) return false;
      try {
        const result = await validate();
        commit("SET_USER", result.user);
        commit("SET_PERMISSION", true);
      } catch (e) {
        commit("SET_USER", {});
        commit("SET_PERMISSION", false);
      }
    },
    setRoute({ commit, state }) {
      let authList = state.userInfo.authList;

      if (authList) {
        // 开始规划路由
        let routes = filterRouter(authList);
        let route = router.options.routes.find(
          item => item.path === "/manager"
        );
        route.children = routes;
        router.addRoutes([route]);
      }
      commit("SET_MENU_PERMISSION", true);
    }
  }
};
