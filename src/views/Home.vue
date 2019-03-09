<template>
  <div class="home">
    <Gallery></Gallery>
  </div>
</template>

<script>
// @ is an alias to /src
import Gallery from "@/components/Gallery.vue";

export default {
  name: "home",
  components: {
    Gallery
  }
};
</script>
