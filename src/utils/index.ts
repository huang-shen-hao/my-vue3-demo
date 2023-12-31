import { useUserStore } from "@/store/modules/user.ts";

const user = useUserStore();

export function hasUserName(name: string) {
    const { userInfo } = user;
    const userIndex = userInfo.findIndex(item => item.name === name);
    if (userIndex >= 0) {
        return false;
    }
    return true;
}

/**
 * 博客地址
 * https://juejin.cn/post/7125274210120761352?searchId=202312311824576FEC53D9E59EF223E7EF
 * **/
// 引入本地图片
export function getImageUrl(url: string) {
    return new URL(url, import.meta.url).href;
}


