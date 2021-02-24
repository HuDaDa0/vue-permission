import { login } from "@/api/public";

export default {
  state: {
    userInfo: {},
    hasPermission: false
  },
  mutations: {
    SET_USER(state, payload) {
      state.userInfo = payload;
    },
    SET_PERMISSION(state, has) {
      state.hasPermission = has;
    },
    SET_LOGOUT(state) {
      state.userInfo = {};
      state.hasPermission = false;
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
    }
  }
};
