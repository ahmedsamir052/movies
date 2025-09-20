<!-- <script setup>
import { RouterLink, RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <Sidebar />
  <div class="content">
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>
main {
  min-height: 80vh;
}
.content{
  margin-left: 6.25%;
}
@media screen and (max-width: 1240px) {
  .content{
    margin-left: 0;
  }
}
</style> -->

<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
import Sidebar from "./components/Sidebar.vue";
import Searchsec from "./components/Search/Searchsec.vue";

const showSearch = ref(false);
const isTyping = ref(false);
</script>

<template>
  <Sidebar @open-search="showSearch = true" />
  <transition name="drop-down">
    <Searchsec
      v-if="showSearch"
      @close="showSearch = false"
      @typing="isTyping = true"
      @stop-typing="isTyping = false"
    />
  </transition>
  <div class="content" v-if="!showSearch || !isTyping">
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>
main {
  min-height: 80vh;
}

.content {
  margin-left: 6.25%;
}

@media screen and (max-width: 1240px) {
  .content {
    margin-left: 0;
  }
}
</style>
