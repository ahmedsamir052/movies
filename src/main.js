import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/main.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
AOS.init();
app.use(router);

app.mount("#app");
