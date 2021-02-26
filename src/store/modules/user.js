import { login, validate } from "@/api/public";

export default {
  state: {
    userInfo: {},
    hasPermission: false
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
    }
  }
};
