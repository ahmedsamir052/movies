<template>
  <div class="hero" v-if="movie">
    <div class="hero-sec">
      <div class="hero-text">
        <h1>{{ movie.title || movie.name }}</h1>
        <div class="rate">
          <div class="reviews">
            <div class="icons">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <div class="review">
              <span>{{ movie.vote_count }} Reviews</span>
            </div>
          </div>
          <div class="info">
            <span>Season 1</span>
            <span>2025</span>
            <span>Cert. TV-MA</span>
          </div>
        </div>
        <p class="desc">
          {{ movie.overview }}
        </p>
        <button class="trailer-btn">
          <i class="fa-solid fa-play"></i>
          <span>Watch Trailer</span>
        </button>
      </div>

      <div class="img-container">
        <img
          :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
          class="hero-img"
        />
        <i class="fa-solid fa-play play-icon"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchFromTMDB } from "@/api/api.js";

const movie = ref(null);
const props = defineProps({
  movieId: Number,
});

onMounted(async () => {
  if (props.movieId) {
    movie.value = await fetchFromTMDB(`/movie/${props.movieId}`);
  } else {
    const popular = await fetchFromTMDB("/movie/popular");
    const results = popular.results;
    const randomIndex = Math.floor(Math.random() * results.length);
    const randomMovie = results[randomIndex];
    const fullDetails = await fetchFromTMDB(`/movie/${randomMovie.id}`);
    movie.value = fullDetails;
  }
});
</script>

<style scoped>
.hero {
  width: 100%;
  background-color: rgb(0, 0, 0);
}

.hero-sec {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.img-container {
  position: relative;
  width: 71%;
  overflow: hidden;
}

.hero-img {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  z-index: 0;
}

.img-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 55%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 1%,
    rgba(0, 0, 0, 0.88) 10%,
    rgba(0, 0, 0, 0.7) 25%,
    rgba(0, 0, 0, 0.55) 40%,
    rgba(0, 0, 0, 0.35) 55%,
    rgba(0, 0, 0, 0.2) 70%,
    rgba(0, 0, 0, 0.05) 85%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
  pointer-events: none;
}

.hero-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 43%;
  height: 100%;
  padding: 50px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  background: transparent;
}
.rate {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
}
.reviews {
  display: flex;
  gap: 0.7rem;
}
.review {
  color: #ccc;
  font-size: 14px;
}
.rate .icons {
  display: flex;
  gap: 0.2rem;
}
.icons .fa-star {
  color: #2196f3;
}
.rate .info span {
  color: #ccc;
  font-size: 14px;
  margin-right: 0.5rem;
}
.hero-text .desc {
  font-size: 15px;
  margin-bottom: 20px;
  color: white;
}
.trailer-btn {
  background-color: #202124;
  color: white;
  border: none;
  padding: 0.7rem 0.9rem;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 34%;
}
.trailer-btn span {
  font-size: 15px;
}
.trailer-btn:hover {
  background-color: #333438;
}
.img-container .fa-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: white;
  border: 2px solid white;
  border-radius: 50%;
  padding: 15px;
  display: none;
  z-index: 3;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .desc,
  .trailer-btn {
    display: none;
  }
  .hero-sec {
    flex-direction: column-reverse;
  }
  .img-container {
    width: 100%;
  }
  .img-container::after {
    width: 100%;
    background-image: linear-gradient(
      to top,
      #000 0,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.1)
    );
  }
  .img-container img {
    height: 230px;
    width: 100%;
    object-fit: cover;
  }
  .hero-text {
    position: static;
    width: 100%;
    padding: 0 15px;
    padding-bottom: 15px;
  }
  .rate {
    display: block;
    padding: 0rem;
  }
  .reviews {
    gap: 0.4rem;
    padding: 13px 0;
  }
  .icons .fa-star {
    font-size: 14px;
  }
  .img-container .fa-play {
    display: block;
  }
}
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .trailer-btn {
    display: none;
  }
  .hero-sec {
    flex-direction: column-reverse;
  }
  .hero-text {
    position: static;
    width: 100%;
    padding: 0 40px;
    padding-bottom: 40px;
  }
  .hero-text h1 {
    font-size: 28px;
    margin: 0;
  }
  .img-container {
    width: 100%;
  }
  .img-container img {
    height: 315px;
    width: 100%;
    object-fit: cover;
  }
  .img-container::after {
    width: 100%;
    background-image: linear-gradient(
      to top,
      #000 0,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.1)
    );
  }
  .img-container .fa-play {
    display: block;
  }
}
@media screen and (min-width: 1025px) and (max-width: 1240px) {
  .img-container .fa-play {
    display: none;
  }
  .hero-text {
    width: 55%;
    padding: 50px 40px;
  }
  .hero-text h1 {
    font-size: 28px;
    margin: 0;
  }
  .trailer-btn {
    padding: 0.7rem 1.5rem;
    gap: 0.5rem;
    width: 36%;
  }
  .img-container::after {
    width: 100%;
    background-image: linear-gradient(
      to right,
      #000 0,
      transparent 50%,
      transparent
    );
  }
  .img-container .fa-play {
    display: none;
  }
}
</style>
