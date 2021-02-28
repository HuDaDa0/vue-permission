import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.directive("has", {
  inserted(el, binding) {
    const exists = store.state.user.btnPermission[binding.value];
    if (!exists) {
      el.parentNode.removeChild(el);
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
