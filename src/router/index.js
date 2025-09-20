import { createRouter , createWebHistory} from "vue-router";
import Home from "@/views/HomePage.vue";
import HomePage from "@/views/HomePage.vue";
import MoviesPage from "@/views/MoviesPage.vue";
import TVsPage from "@/views/TVsPage.vue";
import SearchPage from "@/views/SearchPage.vue";
import AllMovies from "@/views/AllTVs&MVs/AllCards.vue"
import DetailsPage from "@/views/DetailsPage.vue"
import SearchSection from "@/components/Search/Searchsec.vue"

const routes = [
  { path:'/', name:'HomeDefault',component:Home},
  { path:'/home', name:'HomePage',component:HomePage},
  { path:'/movies', name:'MoviesPage',component:MoviesPage},
  { path:'/tvs', name:'TVsPage',component:TVsPage},
  { path:'/search', name:'Search',component:SearchPage},
  { path:'/AllMovies', name:'AllMovies',component:AllMovies},
  { path:'/detailsPage/:id', name:'DetailsPage',component:DetailsPage},
  { path:'/Searchsec/:id', name:'SearchSection',component:SearchSection},

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})
export default router;

