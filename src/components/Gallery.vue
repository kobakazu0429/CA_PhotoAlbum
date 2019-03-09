<template>
  <lightbox :images="images"></lightbox>
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
    this.axios.get("https://wfc-2019.firebaseapp.com/images").then(response => {
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

<style></style>
