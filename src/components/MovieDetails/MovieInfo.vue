<template>
  <div v-if="movie" class="movie-details">
    <div class="img">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" />
    </div>
    <div class="details">
      <h2>{{ movie.title || movie.name }}</h2>
      <p class="desc">{{ movie.overview }}</p>
      <div class="info-wrapper">
        <div class="movie-info">
          <p class="label">Released</p>
          <p class="value">{{ movie.release_date }}</p>
        </div>
        <div class="movie-info">
          <p class="label">Runtime</p>
          <p class="value">{{ movie.runtime }}</p>
        </div>
        <div class="movie-info">
          <p class="label">Director</p>
          <p class="value">
            <a>{{ director }}</a>
          </p>
        </div>
        <div class="movie-info">
          <p class="label">Budget</p>
          <p class="value">{{ movie.budget }}</p>
        </div>
        <div class="movie-info">
          <p class="label">Revenue</p>
          <p class="value">{{ movie.revenue }}</p>
        </div>
        <div class="movie-info">
          <p class="label">Genre</p>
          <p class="value">
            <a>
              {{ movie.genres.map((genre) => genre.name).join(", ") }}
            </a>
          </p>
        </div>
        <div class="movie-info">
          <p class="label">Status</p>
          <p class="value">{{ movie.status }}</p>
        </div>
        <div class="movie-info">
          <p class="label">Language</p>
          <p class="value">
            {{
              movie.spoken_languages.map((lang) => lang.english_name).join(", ")
            }}
          </p>
        </div>
        <div class="movie-info">
          <p class="label">Production</p>
          <p class="value">
            {{ movie.production_countries.map((c) => c.name).join(", ") }}
          </p>
        </div>
      </div>
      <div class="links">
        <i class="fa-brands fa-imdb"></i>
        <i class="fa-solid fa-link"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchFromTMDB } from "@/api/api";

const route = useRoute();
const id = route.params.id;

const movie = ref(null);
const director = ref("");

onMounted(async () => {
  const data = await fetchFromTMDB(`/movie/${id}`);
  movie.value = data;

  const credits = await fetchFromTMDB(`/movie/${id}/credits`);
  const directorObj = credits.crew.find((person) => person.job === "Director");
  if (directorObj) {
    director.value = directorObj.name;
  }
});
</script>

<style scoped>
.movie-details {
  width: 93%;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.img {
  width: 21.5%;
}
.img img {
  width: 100%;
}
.details {
  width: 75%;
}
h2 {
  font-size: 24px;
  color: white;
}
p {
  font-size: 16px;
  color: white;
  margin-bottom: 2rem;
}
.info-wrapper {
  display: grid;
  grid-template-columns: 1fr;
}
.movie-info {
  display: grid;
  grid-template-columns: 8rem 1fr;
  align-items: start;
  column-gap: 0rem;
}
.movie-info .label {
  margin-bottom: 0.5rem;
}
.movie-info .value {
  margin-bottom: 0;
}
.links {
  color: white;
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  font-size: 25px;
}
@media (max-width: 576px) {
  .img {
    display: none;
  }
  .details {
    width: 100%;
  }
  h2 {
    font-size: 18px;
  }
  p {
    font-size: 15px;
  }
  .links {
    font-size: 20px;
  }
}
@media screen and (min-width: 577px) and (max-width: 768px) {
  .img {
    display: none;
  }
  .details {
    width: 100%;
  }
  h2 {
    font-size: 18px;
  }
  p {
    font-size: 15px;
  }
  .links {
    font-size: 22px;
  }
}
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .img {
    display: none;
  }
  .details {
    width: 100%;
  }
  h2 {
    font-size: 19px;
  }
  p {
    font-size: 15px;
  }
  .links {
    font-size: 24px;
  }
}
@media screen and (min-width: 1025px) and (max-width: 1240px) {
  h2 {
    font-size: 19px;
  }
  p {
    font-size: 15px;
  }
  .links {
    font-size: 24px;
  }
  .info-wrapper {
    grid-template-columns: 1fr 1fr;
  }
}
</style>