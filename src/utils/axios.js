import axios from "axios";

// 封装公共的拦截器   每个实例都有单独自己的拦截器

// http://www.fullstackjavascript.cn:8888
class Http {
  constructor() {
    this.timeout = 3000;
    this.baseURL =
      process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";
  }

  mergeOption(options) {
    return {
      timeout: this.timeout,
      baseURL: this.baseURL,
      ...options
    };
  }

  setInterceptors(axiosInstance) {
    axiosInstance.interceptors.request.use(config => {
      return config;
    });

    axiosInstance.interceptors.response.use(
      res => {
        if (res.status == 200) {
          if (res.data.err == 1) {
            return Promise.reject(res.data);
          }
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res);
        }
      },
      err => {
        return Promise.reject(err);
      }
    );
  }

  request(options) {
    const opts = this.mergeOption(options);
    const axiosInstance = axios.create();
    this.setInterceptors(axiosInstance);
    return axiosInstance(opts);
  }

  get(url, config = {}) {
    return this.request({
      url: url,
      method: "get",
      config
    });
  }

  post(url, data = {}) {
    return this.request({
      url: url,
      method: "post",
      data
    });
  }
}

export default new Http();
