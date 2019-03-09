<template>
  <lightbox :images="images" :caption="true"></lightbox>
</template>

<script>
export default {
  name: "Gallery",
  data: function() {
    return {
      images: [
      ]
    };
  },
  created() {
    this.axios.get("https://wfc-2019.firebaseapp.com/images").then(response => {
      console.log(response.data.data.images);
      const hoge = response.data.data.images.map(v => {
        return {
          src: v.url,
          location: v.location,
          id: v.id,
          title: v.title,
          description: v.description,
          postDatetime: v.postDatetime,
          width: v.width,
          height: v.height
        };
      });
      console.log(hoge);
      this.images = hoge;
    });
  }
};
</script>

<style></style>
