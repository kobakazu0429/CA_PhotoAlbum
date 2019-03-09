import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import lightbox from "vlightbox";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(VueAxios, axios);
Vue.use(lightbox);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
