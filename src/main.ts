import { createApp } from "vue";
import "./style.css";
// 自定义全局css
import "./assets/css/global.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/src/index.scss";

const app = createApp(App);
app.use(router).use(ElementPlus);
app.mount("#app");


