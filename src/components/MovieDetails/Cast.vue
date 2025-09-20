<template>
  <div class="head">
    <h4>Cast</h4>
  </div>
  <div class="carousel-container">
    <button v-if="showLeft" class="nav-button left" @click="scrollLeft">
      ‹
    </button>

    <div class="cards-wrapper" ref="slider">
      <div class="card1 ghost"></div>

      <div v-for="(actor, index) in movies" :key="index" class="card1">
        <div class="card-img">
          <img
            :src="
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : ''
            "
          />
        </div>
        <div class="card-text">
          <h2>{{ actor.name ||actor.original_name }}</h2>
          <p>{{ actor.character }}</p>
        </div>
      </div>

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
import { useRoute } from "vue-router";

const props = defineProps({
  apiEndpoint: String,
});

const slider = ref(null);
const showLeft = ref(false);
const showRight = ref(true);
const moviesToScroll = ref(7);
const movies = ref([]);
const route = useRoute();
const id = route.params.id;

const checkScroll = () => {
  const el = slider.value;
  if (!el) return;

  showLeft.value = el.scrollLeft > 5;
  showRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 5;
};

const scrollRight = () => {
  const card = slider.value.querySelector(".card1:not(.ghost)");
  if (card) {
    const scrollAmount = card.offsetWidth * moviesToScroll.value + 70;
    slider.value.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(checkScroll, 500);
  }
};

const scrollLeft = () => {
  const card = slider.value.querySelector(".card1:not(.ghost)");
  if (card) {
    const scrollAmount = card.offsetWidth * moviesToScroll.value + 70;
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
    moviesToScroll.value = 7;
  }
};

onMounted(async () => {
  const data = await fetchFromTMDB(`/movie/${id}/credits`);
  movies.value = data.cast;
  console.log(data);

  await nextTick();
  checkScroll();

  slider.value?.addEventListener("scroll", checkScroll);
  updateCardsToScroll();
  window.addEventListener("resize", updateCardsToScroll);
});
</script>

<style scoped>
.head {
  margin-top: 3rem;
  padding-left: 40px;
  display: flex;
  gap: 0.5rem;
}
.head h4 {
  color: white;
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
  flex: 0 0 12.8%;
  max-width: 12.8%;
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
.card1.ghost {
  flex: 0 0 30px;
  max-width: 30px;
  background: transparent;
  border: none;
  box-shadow: none;
  pointer-events: none;
}

.card1 .card-text h2 {
  font-size: 15px;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.7rem;
  margin-bottom: 0.3rem;
}
.card1 .card-text p {
  color: #535659;
  font-size: 14px;
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
  .card1.ghost {
    max-width: 100px;
  }
}
</style>
