import Vue from "vue";
import Vuex from "vuex";
import rootModule from "./rootModule";

Vue.use(Vuex);

const files = require.context("./modules", false, /\.js$/);

files.keys().forEach(key => {
  // ["./article.js", "./user.js"]
  let moduleName = key.replace(/\.\//, "").replace(/\.js/, "");
  let store = files(key).default;
  let module = (rootModule.modules = rootModule.modules || {});
  module[moduleName] = store;
  // 命名空间
  module[moduleName].namespaced = true;
});

export default new Vuex.Store(rootModule);
