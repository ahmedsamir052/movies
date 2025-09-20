<template>
  <h2 class="query-heading" v-if="query && results.length > 0">
    Results For: {{ query }}
  </h2>
  <transition name="fade-results">
    <div v-if="results.length > 0" class="cards-wrapper">
      <div
        v-for="(movie, index) in results"
        :key="index"
        class="card1"
        @click="goToDetails(movie.id)"
      >
        <div class="card-img">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" />
        </div>
        <div class="card-text">
          <h2>{{ movie.title || movie.name }}</h2>
          <div class="rate">
            <div class="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <div class="rate-num">{{ movie.vote_average }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(["results", "query"]);
console.log(router);
const emit = defineEmits(["close", "stop-typing"]);
function goToDetails(id) {
  emit("stop-typing");
  emit("close");

  setTimeout(() => {
    router.push({ name: "DetailsPage", params: { id } });
  }, 100);
}
const getImageUrl = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "no-image.jpg";
</script>

<style scoped>
.fade-results-enter-active,
.fade-results-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}

.fade-results-enter-from,
.fade-results-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-results-enter-to,
.fade-results-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.query-heading {
  color: white;
  font-size: 24px;
  padding-left: 0.5rem;
  width: 95%;
  margin: auto;
  margin-bottom: 1.5rem;
}
.cards-wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  width: 95%;
  margin: auto;
  padding: 0;
}

.card1 {
  width: 15.9%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
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
  margin-bottom: 0.5rem;
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
.card1.add-card {
  justify-content: center;
  font-weight: 500;
  color: #fff;
  background-color: #202124;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 16px;
  text-decoration: none;
}

.card1.add-card:hover {
  transform: scale(1.02);
}
@media (max-width: 576px) {
  .query-heading {
    font-size: 18px;
    margin-bottom: 0.8rem;
  }
  .card1 {
    width: 48%;
  }
  .card1 .card-text {
    display: none;
  }
}
@media screen and (min-width: 577px) and (max-width: 768px) {
  .query-heading {
    font-size: 18px;
    margin-bottom: 0.8rem;
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
  .query-heading {
    font-size: 18px;
    margin-bottom: 0.8rem;
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
  .query-heading {
    font-size: 18px;
    margin-bottom: 0.8rem;
  }
  .card1 {
    width: 19%;
  }
  .card1 .card-text h2 {
    font-size: 14px;
    margin-top: 0.6rem;
    margin-bottom: 0.2rem;
  }
}
</style>
