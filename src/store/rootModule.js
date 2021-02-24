import { getBannerList } from "@/api/public";

export default {
  state: {
    bannerList: [],
    ajaxTokens: []
  },
  mutations: {
    SET_BANNERLIST(state, payload) {
      state.bannerList = payload;
    },
    SET_REQUEST_TOKEN(state, payload) {
      if (payload === "clear") {
        state.ajaxTokens = [];
      } else {
        state.ajaxTokens = [...state.ajaxTokens, payload];
      }
    }
  },
  actions: {
    async getBannerList({ commit }) {
      const result = await getBannerList();
      commit("SET_BANNERLIST", result);
    }
  }
};
