import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/main.js";
import { createPinia } from "pinia";
import SvgIcon from "./components/SvgIcon.vue";
import "virtual:svg-icons-register";

const app = createApp(App);
const pinia = createPinia();

app.component("SvgIcon", SvgIcon);
app.use(pinia);
app.use(router);
app.mount("#app");
