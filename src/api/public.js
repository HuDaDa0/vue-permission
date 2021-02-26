import axios from "@/utils/axios.js";

export const getBannerList = () => {
  return axios.get("/bannerList");
};

export const login = options => {
  return axios.post("/users/login", options);
};

export const validate = () => {
  return axios.get("/users/validate");
};
