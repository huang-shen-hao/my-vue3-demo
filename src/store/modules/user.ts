import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: () => {
        return {
            userInfo: [{
                name: "黄沈浩",
                passWord: "admin",
                canDelete: false,
                avatarUrl: "https://p.qqan.com/up/2021-7/16260556071353315.jpg"
            }]
        };
    },
    getters: {},
    actions: {
        addUser(name: string, passWord: string, avatarUrl: string) {
            this.userInfo.push({ name: name, passWord: passWord, canDelete: true, avatarUrl: avatarUrl });
        },
        delete(name: string) {
            const nameIndex = this.userInfo.findIndex(item => item.name === name);
            if (nameIndex >= 0) this.userInfo.splice(nameIndex, 1);
        }
    }
});