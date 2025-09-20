<template>
  <div class="backdrops">
    <div class="head">
      <h4>Backdrops</h4>
    </div>
    <div class="backdrops-container">
      <div
        v-for="(img, index) in backdrops.slice(0, 8)"
        :key="index"
        class="backdrops-imgs"
      >
        <div class="image-item">
          <img :src="`https://image.tmdb.org/t/p/w500${img.file_path}`" />
        </div>
      </div>
    </div>
  </div>
  <div class="posters">
    <div class="head">
      <h4>Posters</h4>
    </div>
    <div class="posters-container">
      <div v-for="(img, index) in posters" :key="index" class="posters-imgs">
        <div class="image-item">
          <img :src="`https://image.tmdb.org/t/p/w500${img.file_path}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchFromTMDB } from "@/api/api.js";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
const backdrops = ref([]);
const posters = ref([]);

onMounted(async () => {
  const data = await fetchFromTMDB(
    `/movie/${id}/images?include_image_language=en,null`
  );
  console.log(data);
  backdrops.value = data.backdrops;
  posters.value = data.posters;
});
</script>

<style scoped>
.backdrops {
  width: 95%;
  margin: auto;
}
.head {
  display: flex;
  gap: 0.5rem;
}
.head h4 {
  margin-bottom: 2rem;
  color: white;
}
.backdrops-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.backdrops-imgs {
  width: 19%;
}
.backdrops-imgs .image-item {
  width: 100%;
}
.backdrops-imgs .image-item img {
  width: 100%;
}
.posters {
  width: 95%;
  margin: auto;
  margin-top: 3rem;
}
.posters-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}
.posters-imgs {
  width: 16%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  position: relative;
}
.posters-imgs .image-item {
  width: 100%;
  height: 100%;
}
.posters-imgs .image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (max-width: 576px) {
  .head h4 {
    font-size: 18px;
    margin-bottom: 1rem;
  }
  .backdrops {
    width: 92%;
  }
  .backdrops-imgs {
    width: 48%;
  }
  .posters {
    width: 92%;
  }
  .posters-imgs {
    width: 48%;
  }
}
@media screen and (min-width: 577px) and (max-width: 768px) {
  .head h4 {
    font-size: 19px;
    margin-bottom: 1rem;
  }
  .backdrops {
    width: 92%;
  }
  .backdrops-imgs {
    width: 32.3%;
  }
  .posters {
    width: 92%;
  }
  .posters-imgs {
    width: 32.3%;
  }
}
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .head h4 {
    font-size: 19px;
    margin-bottom: 1rem;
  }
  .backdrops {
    width: 91%;
  }
  .backdrops-imgs {
    width: 24%;
  }
  .posters {
    width: 91%;
  }
  .posters-imgs {
    width: 24%;
  }
}
@media screen and (min-width: 1025px) and (max-width: 1240px) {
  .head h4 {
    font-size: 20px;
    margin-bottom: 1rem;
  }
  .backdrops {
    width: 91%;
  }
  .posters {
    width: 91%;
  }
  .posters-imgs {
    width: 19.3%;
  }
}
</style>
