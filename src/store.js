// import Vue from "vue";
// import Vuex from "vuex";
// import axios from "axios";

// Vue.use(Vuex);

// const fetchImageData = async () => {
//   await axios.get("https://wfc-2019.firebaseapp.com/images").then(response => {
//     return response.data.data.images.map(v => {
//       return {
//         src: v.url,
//         location: v.location,
//         id: v.id,
//         title: v.title,
//         caption: v.description,
//         postDatetime: v.postDatetime,
//         width: v.width,
//         height: v.height
//       };
//     });
//   });
// };

// export default new Vuex.Store({
//   state: { images: [] },
//   mutations: {
//     hogehoge(state) {
//       state.images = fetchImageData();
//     }
//   },
//   actions: {
//     increment(context) {
//       context.commit("hogehoge");
//     },
//     getImages(state) {
//       return state.images;
//     },
//     getImageById(state, id) {
//       return state.images.find(v => v.id === id);
//     }
//   }
// });

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {}
});
