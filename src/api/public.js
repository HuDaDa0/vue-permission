import axios from "@/utils/axios.js";

export const getBannerList = () => {
  return axios.get("/bannerList");
};
