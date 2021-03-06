import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import InfiniteLoading from "vue-infinite-loading";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(VueAxios, axios);
Vue.use(InfiniteLoading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
