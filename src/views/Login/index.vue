<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user.ts";


type FormItem = {
  name: string, //用户名
  passWord: string,//密码
}
const form = ref<FormItem>({
    name: "",
    passWord: ""
});
// type zhInfo = {
//   name: string,
//   passWord: string
// }
//测试账号
// const ZH = ref<zhInfo[]>([
//     {
//         name: "huang",
//         passWord: "123456"
//     },
//     {
//         name: "admin",
//         passWord: "admin"
//     }
// ]);


const rules = {
    name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
    passWord: [{ required: true, message: "密码不能为空", trigger: "blur" }]
};

const formRef = ref();
const canInput = ref<boolean>(false);//输入密码错误超过3次 1分钟后重试
const count = ref<number>(0);
const router = useRouter(); //路由实例
const user = useUserStore();//获取账户信息
function onSubmit() {
    formRef.value.validate((valid: never) => {
        if (valid) {
            console.log("userInfo", user.userInfo);
            const userIndex = user.userInfo.findIndex(item => item.name === form.value.name);
            if (userIndex < 0) {
                ElMessage.error("用户名不存在！");
            } else {
                const pass = user.userInfo[userIndex].passWord === form.value.passWord;
                if (!pass) {
                    count.value++;
                    if (count.value === 3) {
                        canInput.value = true;
                        ElMessage.error("请10s后重试！");
                        setTimeout(() => {
                            canInput.value = false;
                        }, 10000);
                    } else {
                        ElMessage.error("请检查密码是否正确！");
                    }
                } else {
                    sessionStorage.setItem("countInfo", form.value.name);
                    router.push("/home");
                }
            }
        } else {
            ElMessage.error("错误！");
        }
    });
}


</script>

<template>
  <div class="container">
    <div class="login_left">
    </div>
    <div class="login_right">
      <el-form ref="formRef" :model="form" :rules="rules" style="width: 80%;">
        <el-form-item prop="name">
          <el-input v-model="form.name" :disabled="canInput" clearable placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="form.passWord" :disabled="canInput" placeholder="请输入密码" show-password type="password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <div style="width:100%;display: flex;justify-content: center;align-items: center">
            <el-button :disabled="canInput" style="width: 5vw;" type="primary" @click="onSubmit">
              登陆
            </el-button>
            <el-button style="width: 5vw" type="success" @click="router.push('/register')">注册</el-button>
          </div>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/login_2.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_left {
  width: 20vw;
  height: 50vh;
  background-image: url("@/assets/login_left_1.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin-left: 40vw;
}

.login_right {
  width: 20vw;
  height: 50vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

}


</style>

