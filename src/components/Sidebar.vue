<template>
  <div class="sidebar" :class="{ bottom: isMobile }">
    <div class="links">
      <router-link to="/Home" class="link" active-class="active-link">
        <i class="fa-solid fa-house"></i>
      </router-link>
      <router-link to="/Movies" class="link" active-class="active-link">
        <i class="fa-solid fa-film"></i>
      </router-link>
      <router-link to="/TVs" class="link" active-class="active-link">
        <i class="fa-solid fa-tv"></i>
      </router-link>

      <button @click="$emit('open-search')" class="link">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isMobile = ref(false);

onMounted(() => {
  const handleResize = () => {
    isMobile.value = window.innerWidth <= 1240;
  };

  handleResize();
  window.addEventListener("resize", handleResize);
});

const emit = defineEmits(['open-search'])

</script>

<style scoped>
.sidebar {
  width: 6.25%;
  height: 100%;
  background-color: black;
  border-right: 1px solid #202124;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  transition: all 0.3s ease;
}
.sidebar.bottom {
  width: 100%;
  height: 60px;
  flex-direction: row;
  bottom: 0;
  top: auto;
  border-right: none;
  border-top: 1px solid #202124;
}
.links {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.sidebar.bottom .links {
  height: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25%;
  font-size: 25px;
  color: white;
  transition: transform 0.2s ease, color 0.2s ease;
}
button {
  background: none;
  border: none;
}
.sidebar.bottom .link {
  height: 100%;
  flex: 1;
}

.link:not(.active-link):hover {
  color: rgb(221, 219, 219);
}
.active-link {
  color: #2196f3;
}
@media screen and (max-width: 1240px) {
  .sidebar {
    height: 60px;
    border-right: none;
    border-top: 1px solid #202124;
    flex-direction: row;
    bottom: 0;
    left: 0;
    top: auto;
  }
  .links {
    height: 100%;
    width: 100%;
  }
  .link {
    flex: 1;
    height: 100%;
    font-size: 22px;
  }
}
</style>
