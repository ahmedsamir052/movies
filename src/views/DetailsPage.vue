<script setup>
import { ref } from 'vue';
import HeroDetails from '@/components/MovieDetails/HeroDetails.vue';
import MoreLikethis from '@/components/MovieDetails/MoreLikethis.vue';
import NavDetails from '@/components/MovieDetails/NavDetails.vue';

import { useRoute } from 'vue-router'
const route = useRoute()
const id = Number(route.params.id)
const currentTab = ref('overview')
const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Photos', value: 'photos' },
]
</script>

<template>
    <HeroDetails :movieId="id" />
    <NavDetails/>
    <MoreLikethis/>
</template>
