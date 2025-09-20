<template>
  <div class="form-wrapper">
    <form @submit.prevent>
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Search for a movie, tv show or person..."
        class="search-input"
      />
    </form>
    <button class="close-btn" @click="$emit('close')">✖</button>
  </div>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue", "close"]);
</script>

<style scoped>
.form-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  background-color: #202124;
  margin-bottom: 3rem;
}
.form-wrapper form {
    width: 100%;
}
.search-input {
  width: 100%;
  padding: 1.5rem 3rem;
  font-size: 1.1rem;
  border: none;
  background-color: transparent;
  color: white;
}

.close-btn {
  position: absolute;
  right: 2rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}
@media (max-width: 576px) {
  .form-wrapper {
    margin-bottom: 1.5rem;
  }
  .search-input::placeholder {
    font-size: 15px;
  }
  .search-input {
    padding: 1rem 0.5rem;
    font-size: 15px;
  }
  .close-btn {
    right: 0.8rem;
    font-size: 1rem;
  }
}
@media screen and (min-width: 577px) and (max-width: 768px) {
  .form-wrapper {
    margin-bottom: 1.5rem;
  }
  .search-input::placeholder {
    font-size: 16px;
  }
  .search-input {
    padding: 1rem 1rem;
    font-size: 16px;
  }
  .close-btn {
    right: 1rem;
    font-size: 1.2rem;
  }
}
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .form-wrapper {
    margin-bottom: 1.5rem;
  }
  .search-input::placeholder {
    font-size: 16px;
  }
  .search-input {
    padding: 1rem 2rem;
    font-size: 16px;
  }
  .close-btn {
    right: 1.5rem;
    font-size: 1.3rem;
  }
}
</style>
