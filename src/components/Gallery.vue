<template>
  <div>
    <div class="gallery">
      <div class="card" v-for="image in images" :key="image.id">
        <router-link :to="`detail/${image.id}/`">
          <img :src="image.src" />
        </router-link>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler" :distance="1000" />
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "Gallery",
  components: {
    InfiniteLoading
  },
  data: function() {
    return {
      images: []
    };
  },
  methods: {
    infiniteHandler: function($state) {
      const api = "https://wfc-2019.firebaseapp.com/images/";

      this.axios
        .get(api, {
          params: {
            limit: 10,
            offset: this.images.length
          }
        })
        .then(response => {
          const newData = response.data.data.images.map(v => {
            return {
              src: v.url,
              location: v.location,
              id: v.id,
              title: v.title,
              caption: v.description,
              postDatetime: v.postDatetime,
              width: v.width,
              height: v.height
            };
          });

          if (newData.length !== 0) {
            this.images.push(...newData);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(err => {
          console.log(err);
          $state.complete();
        });
    }
  }
};
</script>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
}

.card img {
  margin-bottom: 20px;
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  transition: all 0.25s ease;
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.card img:hover {
  box-shadow: 3px 3px 12px 0px rgba(0, 0, 0, 0.8);
  transform: scale(1.04);
}

@media screen and (max-width: 475px) {
  .card img {
    width: 100px;
    height: 100px;
  }
}
</style>
