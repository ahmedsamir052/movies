<script setup>
import Minisec from '../minisec.vue';

</script>

<template>
    <Minisec
    TypeName="More Like This"
    NamePage="AllMovies"
    apiEndpoint="/movie/popular"
    :showExplore="false"
    />
</template>