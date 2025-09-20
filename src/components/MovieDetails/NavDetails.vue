<template>
  <div class="tabs">
    <button
      @click="activeTab = 'overview'"
      :class="{ active: activeTab === 'overview' }"
    >
      Overview
    </button>

    <button
      @click="activeTab = 'photos'"
      :class="{ active: activeTab === 'photos' }"
    >
      Photos
    </button>
  </div>

  <div class="tab-content">
    <Overview v-if="activeTab === 'overview'" />
    <Photos v-if="activeTab === 'photos'" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Overview from "./Overview.vue";
import Photos from "./Photos.vue";

const activeTab = ref("overview");
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #585858;
  position: relative;
  padding-bottom: 4px;
}

button.active {
  color: white;
}

button.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  background-color: white;
}
@media screen and (max-width: 768px) {
  .tabs {
    margin: 1rem 0;
  }
}
</style>
