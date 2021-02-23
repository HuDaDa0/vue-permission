import { getBannerList } from "@/api/public";

export default {
  state: {
    bannerList: []
  },
  mutations: {
    SET_BANNERLIST(state, playlod) {
      state.bannerList = playlod;
    }
  },
  actions: {
    async getBannerList({ commit }) {
      const result = await getBannerList();
      commit("SET_BANNERLIST", result);
    }
  }
};
