<script setup >
import Commsec from '../Commsec.vue';
const props = defineProps({
  movieId: Number
})
</script>

<template>
    <Commsec :movieId="movieId"/>
</template>