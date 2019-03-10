<template>
  <div class="wrapper">
    <template v-if="this.image.url">
      <div class="imgWrapper">
        <img :src="this.image.url" alt="" />
      </div>

      <div class="properties">
        <h3>タイトル</h3>
        <h5>{{ this.image.title }}</h5>

        <h3>ユーザーネーム</h3>
        <h5>{{ this.userName }}</h5>

        <h3>投稿日時</h3>
        <h5>{{ this.postDateTime }}</h5>
      </div>
    </template>

    <template v-if="!this.image.url">
      <div>
        <p>この画像は存在しません。</p>
      </div>
    </template>

    <image-record :images="imageAround" />
  </div>
</template>

<script>
import moment from "moment";
import ImageRecord from "../components/ImageRecord";

export default {
  name: "Detail",
  components: {
    ImageRecord
  },
  data: function() {
    return {
      image: {},
      imageAround: []
    };
  },
  computed: {
    userName() {
      return this.image.description.slice(0, -7);
    },
    postDateTime() {
      return moment(this.image.postDateTime).format("YYYY/MM/DD(ddd) HH:mm:ss");
    }
  },
  created() {
    this.axios
      .get(`https://wfc-2019.firebaseapp.com/image/${this.$route.params.id}/`)
      .then(response => {
        this.image = response.data.data;
      });
    this.getAround();
  },
  methods: {
    getAround: function() {
      this.axios
        .get(
          `https://wfc-2019.firebaseapp.com/image/around/${
            this.$route.params.id
          }?limit=10/`
        )
        .then(response => {
          this.imageAround = [...response.data.prev, ...response.data.next];
        });
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.imgWrapper {
  width: 50%;
  align-self: center;
  align-content: center;
}

@media screen and (max-width: 768px) {
  .imgWrapper {
    width: 100%;
    align-self: center;
    align-content: center;
  }
}

.imgWrapper img {
  width: 100%;
  height: auto;
  display: block;
  margin: auto;
}

.properties {
  flex: 1;
  padding: 50px;
}
</style>
