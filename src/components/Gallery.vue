<template>
  <div class="gallery">
    <div class="card" v-for="image in images" :key="image.id">
      <router-link :to="`detail/${image.id}/`">
        <img :src="image.src" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  data: function() {
    return {
      images: []
    };
  },
  created() {
    this.axios
      .get("https://wfc-2019.firebaseapp.com/images?limit=100")
      .then(response => {
        this.images = response.data.data.images.map(v => {
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
      });
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
</style>
