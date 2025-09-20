<template>
  <div class="overlay">
    <div class="form-container">
      <SearchForm v-model="query" @close="$emit('close')" />
      <SearchResults
        :results="results"
        :query="query"
        @close="$emit('close')"
        @stop-typing="$emit('stop-typing')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import SearchForm from "./SearchForm.vue";
import SearchResults from "./SearchResults.vue";

const emit = defineEmits(["close", "typing", "stop-typing"]);
const props = defineProps(["searchQuery"]);

const query = ref(props.searchQuery || "");
const results = ref([]);

watch(query, async (newQuery) => {
  if (newQuery.length > 1) {
    emit("typing");
    const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "21031c3b7b4a38cec4343b269656b52e",
        query: newQuery,
        language: "en-EG",
      },
    });
    results.value = res.data.results;
  } else {
    emit("stop-typing");
    results.value = [];
  }
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  overflow-y: auto;
}

.form-container {
  width: 100%;
  margin-left: 6.25%;
}
@media screen and (max-width: 1240px) {
  .form-container {
    margin-left: 0;
  }
}
</style>
