<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    title: {
        type: String,
        required: true
    }
});

const user = ref<string>("");

onMounted(() => {
    user.value = sessionStorage.getItem("countInfo") as string;
});

// 获取年月日
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

const iconUrl = ref<string>("https://tse4-mm.cn.bing.net/th/id/OIP-C.diG6CP0pFE8k8TmLwoaFoAHaET?rs=1&pid=ImgDetMain");
const avatarUrl = ref<string>("https://ts1.cn.mm.bing.net/th/id/R-C.45c154943de369ac54124490fbd55936?rik=ZwaHe%2fhXHLb2yw&riu=http%3a%2f%2fm.keaiming.com%2fuploads%2fallimg%2f2020090112%2ffg5o2wnp32p.jpg&ehk=mt7iBzm%2fgrvUxsaIj%2fZqMC5r%2fmJhnrD82X6svC1gbd4%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1");
const avatarUrl_admin = ref<string>("https://tupian.qqw21.com/article/UploadPic/2020-1/20201817294852113.jpg");
const router = useRouter(); //路由实例
// 退出登陆
function loginOut() {
    router.push("/login");
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
      <el-avatar v-if="user=='admin'" :src="avatarUrl_admin" size="large" />
      <el-avatar v-else :src="avatarUrl" size="large" />
      <div class="left_info">
        <el-dropdown>
          <!--登陆信息-->
          <span>
            <span style="color: white;font-size: 15px;display: block;margin-bottom: 5px">欢迎您：{{ user }}</span>
            <span style="color: white;font-size: 15px;display: block">{{ `${year}年${month}月${day}日` }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut">退出登陆</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>修改头像</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>

    </div>
  </div>
</template>

<style scoped>
.home_header {
  width: 100%;
  height: 10vh;
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
  font-size: 28px;
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
</style>

