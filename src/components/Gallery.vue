<template>
  <div>
    <div class="buttons">
      <div @click="sortASC()">日付でソート(昇順)</div>
      <div @click="sortDESC()">日付でソート(降順)</div>
    </div>
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
    sortASC: function() {
      this.images.sort(function(a, b) {
        if (a.postDatetime < b.postDatetime) return -1;
        if (a.postDatetime > b.postDatetime) return 1;
        return 0;
      });
    },
    sortDESC: function() {
      this.images.sort(function(a, b) {
        if (a.postDatetime < b.postDatetime) return 1;
        if (a.postDatetime > b.postDatetime) return -1;
        return 0;
      });
    },
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

.buttons {
  margin: 20px 0;
  margin-bottom: 10px;
}

.buttons div {
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: 0.25em 0;
  text-decoration: none;
  color: #67c5ff;
  margin: 0 10px;
}

.buttons div:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 4px;
  top: 100%;
  left: 0;
  border-radius: 3px;
  background: #67c5ff;
  transition: 0.2s;
}

.buttons div:hover:before {
  top: -webkit-calc(100% - 3px);
  top: calc(100% - 3px);
}

@media screen and (max-width: 475px) {
  .card img {
    width: 100px;
    height: 100px;
  }
}
</style>
