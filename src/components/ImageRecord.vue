<template>
  <div class="container">
    <div class="wrapper">
      <div v-for="image in images" :key="image.id" class="card">
        <router-link :to="`/detail/${image.id}/`">
          <img :src="image.url" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["images"]
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  -webkit-overflow-scrolling: touch;
  position: relative;
  width: 100%;
}

.container::before {
  content: "";
  width: 80px;
  height: 130px;
  position: absolute;
  display: block;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.5) 50%
  );
  z-index: 100;
}

.container::after {
  content: "";
  width: 80px;
  height: 130px;
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.5) 50%
  );
  z-index: 100;
}

::-webkit-scrollbar {
  display: none;
}

.wrapper {
  display: flex;
  overflow-x: auto;
  width: 100%;
}

.card {
  margin-right: 20px;
}

.card img {
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  transition: all 0.25s ease;
  width: 180px;
  height: 130px;
  object-fit: cover;
}

.card:last-child {
  margin-right: 0;
}

.card img:hover {
  box-shadow: 3px 3px 12px 0px rgba(0, 0, 0, 0.8);
  transform: scale(1.04);
}
</style>
