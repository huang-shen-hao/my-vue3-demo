<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user.ts";
import { ElMessage } from "element-plus";


const userInfoArr = useUserStore();
const props = defineProps({
    title: {
        type: String,
        required: true
    }
});
type userInfoType = {
  name: string,
  passWord: string,
  canDelete: boolean,
  avatarUrl: string
}
const user = ref<userInfoType>({
    name: "",
    passWord: "",
    canDelete: false,
    avatarUrl: ""
});

onMounted(() => {
    const nameTag = sessionStorage.getItem("countInfo") as string;
    const index = userInfoArr.userInfo.findIndex(item => item.name = nameTag);
    if (index >= 0) {
        user.value = userInfoArr.userInfo[index];
    } else {
        ElMessage.error("联系作者-18851977115");
    }
});

// 获取年月日
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

const iconUrl = ref<string>("https://tse4-mm.cn.bing.net/th/id/OIP-C.diG6CP0pFE8k8TmLwoaFoAHaET?rs=1&pid=ImgDetMain");
const userInfoDrawer = ref<boolean>(false);//用户信息抽屉
const router = useRouter(); //路由实例

// 退出登陆
function loginOut() {
    router.push("/login");
}

// 是否修改用戶的信息
let isChangeUserInfo = ref<boolean>(false);


// 用戶信息保存
function onBtnSave() {

}
</script>

<template>
  <div class="home_header">
    <!--左侧文字-->
    <div class="header_left">
      <el-avatar :src="iconUrl" shape="square" />
      <span style="margin-left: 5px">{{ props?.title || "黄沈浩" }}</span>
    </div>
    <!--右侧登陆信息-->
    <div class="header_right">
      <el-avatar :src="user.avatarUrl" size="large" />
      <div class="left_info">
        <el-dropdown>
          <!--登陆信息-->
          <span>
            <span style="color: white;font-size: 15px;display: block;margin-bottom: 5px">欢迎您：{{ user.name }}</span>
            <span style="color: white;font-size: 15px;display: block">{{ `${year}年${month}月${day}日` }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut">退出登陆</el-dropdown-item>
              <el-dropdown-item @click="userInfoDrawer=true">用户信息</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>
    <el-drawer v-model="userInfoDrawer" :show-close="false" :size="350">
      <template #header>
        <div class="user_info_head">
          <span class="title">用户中心</span>
        </div>
      </template>
      <div class="user_info_main">
        <div class="user_info_main_item">
          <span>
            <el-avatar :src="user.avatarUrl" />
          </span>
          <span style="margin-left: 10px">{{ user.name }}</span>
        </div>
        <el-divider />
        <div class="user_info_main_item">
          <span>

          </span>
          <span>{{ "人有相思寄明月，月有倦时落栖枝。" }}</span>
        </div>

      </div>
      <template #footer>
        <span style="margin-right: 20px">
          <el-button v-if="isChangeUserInfo" type="primary" @click="onBtnSave">保存</el-button>
          <el-button @click="userInfoDrawer=false">关闭</el-button>
        </span>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.home_header {
  width: 100%;
  height: 100px;
  background: linear-gradient(#090D73FF, #060A60FF);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header_left {
  height: 100%;
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;
}

.header_right {
  height: 100%;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left_info {
  height: 100%;
  width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

::v-deep(.el-drawer__footer) {
  border-top: 1px solid #e4e7ed;
  padding: 20px 0 0 0;
}

::v-deep(.el-drawer__header) {
  border-bottom: 1px solid #e4e7ed;
  padding: 20px 0 20px 0;
}

::v-deep(.el-drawer__body) {
  margin-top: -40px;
}

.user_info_head {
  width: 50px;
  text-align: left;
  line-height: 50px;

  .title {
    background-color: #1122B9FF;
    padding: 15px 30px 15px 50px;
    border-radius: 20px;
    margin-left: -20px;
    font-size: 20px;
    color: white;
  }
}

.user_info_main_item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  color: #7A7777FF;
  line-height: 10px;
}
</style>

