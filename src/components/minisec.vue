<template>
  <div class="head">
    <h4>{{ TypeName }}</h4>
    <router-link
      v-if="showExplore"
      :to="`/${NamePage}?endpoint=${props.apiEndpoint}&title=${TypeName}`"
      class="explore"
    >
      Explore All
    </router-link>
  </div>
  <div class="carousel-container">
    <button v-if="showLeft" class="nav-button left" @click="scrollLeft">
      ‹
    </button>

    <div class="cards-wrapper" ref="slider">
      <div class="card1 ghost"></div>

      <div
        v-for="(movie, index) in movies"
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
      <router-link
        v-if="showExplore"
        :to="`/${NamePage}?endpoint=${props.apiEndpoint}&title=${TypeName}`"
        class="card1 add-card"
      >
        <div class="add-content">Explore All</div>
      </router-link>
      <div class="card1 ghost"></div>
    </div>

    <button v-if="showRight" class="nav-button right" @click="scrollRight">
      ›
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { fetchFromTMDB } from "@/api/api.js";
import { useRouter } from "vue-router";
import router from "@/router";

const props = defineProps({
  apiEndpoint: String,
  NamePage: String,
  TypeName: String,
  showExplore: {
    type: Boolean,
    default: true,
  },
});

const slider = ref(null);
const showLeft = ref(false);
const showRight = ref(true);
const moviesToScroll = ref(6);
const movies = ref([]);
const route = useRouter();

const checkScroll = () => {
  const el = slider.value;
  if (!el) return;

  showLeft.value = el.scrollLeft > 5;
  showRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 5;
};

const scrollRight = () => {
  const card = slider.value.querySelector(".card1:not(.ghost)");
  if (card) {
    const scrollAmount = card.offsetWidth * moviesToScroll.value + 50;
    slider.value.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(checkScroll, 500);
  }
};

const scrollLeft = () => {
  const card = slider.value.querySelector(".card1:not(.ghost)");
  if (card) {
    const scrollAmount = card.offsetWidth * moviesToScroll.value + 50;
    slider.value.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    setTimeout(checkScroll, 500);
  }
};

const updateCardsToScroll = () => {
  const width = window.innerWidth;

  if (width >= 768 && width <= 1024) {
    moviesToScroll.value = 4;
  } else if (width >= 1025 && width <= 1240) {
    moviesToScroll.value = 5;
  } else {
    moviesToScroll.value = 6;
  }
};
onMounted(async () => {
  const data = await fetchFromTMDB(props.apiEndpoint);
  movies.value = data.results;

  await nextTick();
  checkScroll();

  slider.value.addEventListener("scroll", checkScroll);
  updateCardsToScroll();
  window.addEventListener("resize", updateCardsToScroll);
});
function goToDetails(id) {
  router.push({ name: "DetailsPage", params: { id } });
}
</script>

<style scoped>
.head {
  margin-top: 3rem;
  padding-left: 50px;
  display: flex;
  gap: 0.5rem;
}
.head h4 {
  color: white;
}
.explore {
  text-decoration: none;
  color: #2196f3;
  font-size: 14px;
  font-weight: 600;
  height: 35px;
  display: flex;
  align-items: center;
}

.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 1rem 0;
}

.cards-wrapper {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0;
}

.card1 {
  flex: 0 0 15%;
  max-width: 15%;
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

.add-content {
  text-align: center;
}
.card1.ghost {
  flex: 0 0 30px;
  max-width: 30px;
  background: transparent;
  border: none;
  box-shadow: none;
  pointer-events: none;
}

.nav-button {
  position: absolute;
  top: 0;
  bottom: 0;
  color: white;
  background-color: #00000080;
  font-size: 2rem;
  padding: 0 15px;
  z-index: 2;
  cursor: pointer;
  align-items: center;
  border: none;
  transition: 0.3s;
}
.nav-button:hover {
  background-color: #000000c7;
}
.left {
  left: 0px;
}

.right {
  right: 0px;
}

.cards-wrapper::-webkit-scrollbar {
  display: none;
}
.cards-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
@media (max-width: 576px) {
  .head {
    margin-top: 2rem;
    padding-left: 15px;
  }
  .head h4 {
    font-size: 18px;
  }
  .explore {
    font-size: 12px;
    height: 25px;
  }
  .carousel-container {
    margin: 0.5rem 0;
  }
  .card1 {
    flex: 0 0 43%;
    max-width: 43%;
  }
  .card1 .card-text {
    display: none;
  }
  .card1.ghost {
    max-width: 10px;
  }
  .nav-button {
    display: none;
  }
}
@media screen and (min-width: 577px) and (max-width: 768px) {
  .head {
    margin-top: 2rem;
    padding-left: 15px;
  }
  .head h4 {
    font-size: 19px;
  }
  .explore {
    font-size: 13px;
    height: 25px;
  }
  .carousel-container {
    margin: 0.8rem 0;
  }
  .card1 {
    flex: 0 0 30%;
    max-width: 30%;
  }
  .card1 .card-text h2 {
    font-size: 12px;
    margin: 0.5rem 0;
    margin-bottom: 0;
  }
  .rate .stars {
    gap: 0.1rem;
  }
  .card1.ghost {
    max-width: 10px;
  }
  .nav-button {
    display: none;
  }
}
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .head {
    margin-top: 2rem;
    padding-left: 40px;
  }
  .head h4 {
    font-size: 19px;
  }
  .explore {
    font-size: 13px;
    height: 25px;
  }
  .carousel-container {
    margin: 0.8rem 0;
  }
  .card1 {
    flex: 0 0 22%;
    max-width: 22%;
  }
  .card1 .card-text h2 {
    font-size: 13px;
    margin-top: 0.6rem;
    margin-bottom: 0.2rem;
  }
  .card1.ghost {
    max-width: 100px;
  }
}
@media screen and (min-width: 1025px) and (max-width: 1240px) {
  .head {
    margin-top: 2rem;
    padding-left: 40px;
  }
  .head h4 {
    font-size: 20px;
  }
  .explore {
    font-size: 13px;
    height: 25px;
  }
  .carousel-container {
    margin: 0.8rem 0;
  }
  .card1 {
    flex: 0 0 18%;
    max-width: 18%;
  }
  .card1 .card-text h2 {
    font-size: 14px;
    margin-top: 0.6rem;
    margin-bottom: 0.2rem;
  }
  .card1.ghost {
    max-width: 100px;
  }
}
</style>
