import axios from "axios";

import store from "../store";

// 封装公共的拦截器   每个实例都有单独自己的拦截器

// http://www.fullstackjavascript.cn:8888
class Http {
  constructor() {
    this.timeout = 3000;
    this.baseURL =
      process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

    this.queue = {}; // 存放所有的请求队列     /getBannerList : true
  }

  mergeOption(options) {
    return {
      timeout: this.timeout,
      baseURL: this.baseURL,
      ...options
    };
  }

  setInterceptors(axiosInstance, url) {
    // 每条请求都会走这个拦截器函数   缓存 url
    axiosInstance.interceptors.request.use(config => {
      // 记录每次请求的 url 方便做全局loading效果
      // 只有 this.queue.length ==== 0 的时候，说明开始发起请求，弹出全局loading
      this.queue[url] = true;

      const CancelToken = axios.CancelToken;
      // let cancel = null;

      config.cancelToken = new CancelToken(function executor(c) {
        // cancel = c;
        // 保存每次请求的cancelToken  这样在切换页面的时候，就是执行这些 cancel 回调函数了
        store.commit("SET_REQUEST_TOKEN", c);
      });

      // 每次请求都要携带 token
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");

      return config;
    });

    // 请求完成， delete this.queue[url]  从队列中删除url
    axiosInstance.interceptors.response.use(
      res => {
        delete this.queue[url];
        if (res.status == 200) {
          if (res.data.err == 1) {
            return Promise.reject(res.data.msg);
          }
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res.data.msg);
        }
      },
      err => {
        delete this.queue[url];
        return Promise.reject(err);
      }
    );
  }

  request(options) {
    const opts = this.mergeOption(options);
    const axiosInstance = axios.create();
    this.setInterceptors(axiosInstance, opts.url);
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
