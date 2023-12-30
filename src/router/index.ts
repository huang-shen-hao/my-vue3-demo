import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "login"
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login/index.vue"),
        meta: {
            title: "登陆"
        }
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/views/Register/index.vue"),
        meta: {
            title: "注册"
        }
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home/index.vue"),
        meta: {
            title: "首页"
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
