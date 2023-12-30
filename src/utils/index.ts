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

