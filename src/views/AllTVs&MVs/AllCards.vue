<template>
  <div class="all">
    <div class="head">
      <h4>{{ pageTitle }}</h4>
    </div>
    <div class="cards-wrapper">
      <div v-for="(item, index) in movies" :key="index" class="card1">
        <div class="card-img">
          <img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" />
        </div>
        <div class="card-text">
          <h2>{{ item.title || item.name }}</h2>
          <div class="rate">
            <div class="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <div class="rate-num">{{ item.vote_average }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchFromTMDB } from "@/api/api.js";

const route = useRoute();
const movies = ref([]);

const endpoint = route.query.endpoint || "/movie/popular";
const pageTitle = route.query.title || "Movies";

onMounted(async () => {
  const data = await fetchFromTMDB(endpoint);
  const results = data.results || [];
  const repet = [...results];
  while (repet.length < 40) {
    repet.push(...results);
  }
  movies.value = repet.slice(0, 40);
});
</script>

<style scoped>
.all {
  margin: 50px;
}
.head {
  margin-bottom: 1.5rem;
}
.head h4 {
  color: white;
}
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
}
.card1 {
  width: 16%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}
.card-img {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.card-img img {
  width: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.card1:hover img {
  transform: scale(1.02);
}
.card1 .card-text h2 {
  font-size: 15px;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.7rem 0;
}
.card-text .rate {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rate .stars {
  display: flex;
  gap: 0.2rem;
}
.rate .stars .fa-star {
  color: #2196f3;
  font-size: 12px;
}
.rate .rate-num {
  font-size: 14px;
  color: #80868b;
}
@media (max-width: 576px) {
  .all {
    margin: 20px;
  }
  .head {
    margin-bottom: 1rem;
  }
  .head h4 {
    font-size: 18px;
  }
  .card1 {
    width: 48%;
    margin-bottom: 0rem;
  }
  .card1 .card-text {
    display: none;
  }
}
@media screen and (min-width: 577px) and (max-width: 768px) {
  .all {
    margin: 20px;
  }
  .head {
    margin-bottom: 1rem;
  }
  .head h4 {
    font-size: 19px;
  }
  .card1 {
    width: 32%;
  }
  .card1 .card-text h2 {
    font-size: 12px;
    margin: 0.5rem 0;
    margin-bottom: 0;
  }
  .rate .stars {
    gap: 0.1rem;
  }
}
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .all {
    margin: 20px;
  }
  .head {
    margin-bottom: 1rem;
  }
  .head h4 {
    font-size: 19px;
  }
  .card1 {
    width: 23.9%;
  }
  .card1 .card-text h2 {
    font-size: 13px;
    margin-top: 0.6rem;
    margin-bottom: 0.2rem;
  }
}
@media screen and (min-width: 1025px) and (max-width: 1240px) {
  .all {
    margin: 20px;
  }
  .head h4 {
    font-size: 20px;
  }
  .card1 {
    width: 19.1%;
  }
  .card1 .card-text h2 {
    font-size: 14px;
    margin-top: 0.6rem;
    margin-bottom: 0.2rem;
  }
}
</style>
