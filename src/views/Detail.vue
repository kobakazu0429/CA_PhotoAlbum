<template>
  <div v-if="this.image.url">
    <img :src="this.image.url" alt="" />
    <p>url : {{ this.image.url }}</p>
    <p>location : {{ this.image.location }}</p>
    <p>id : {{ this.image.id }}</p>
    <p>title : {{ this.image.title }}</p>
    <p>description : {{ this.image.description }}</p>
    <p>postDatetime : {{ this.image.postDatetime }}</p>
    <p>width : {{ this.image.width }}</p>
    <p>height : {{ this.image.height }}</p>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data: function() {
    return {
      image: {}
    };
  },
  created() {
    this.axios
      .get(`https://wfc-2019.firebaseapp.com/image/${this.$route.params.id}/`)
      .then(response => {
        this.image = response.data.data;
      });
  }
};
</script>

<style></style>
