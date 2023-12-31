import { createApp } from "vue";
import "./style.css";
// 自定义全局css
import "./assets/css/global.css";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/src/index.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 阿里图标库
import "./assets/aliIcontFont/iconfont.css";

const app = createApp(App);
// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // @ts-ignore
    app.component(key, component);
}
app.use(router).use(ElementPlus).use(store);
app.mount("#app");


