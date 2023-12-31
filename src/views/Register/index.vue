<script lang="ts" setup>
import { ref } from "vue";
import { hasUserName } from "@/utils";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user.ts";
import router from "@/router";

const user = useUserStore();
type RegisterForm = {
  name: string,
  passWord: string,
  confirmPass: string,
  avatarUrl: string,
}
const form = ref<RegisterForm>({
    name: "",
    passWord: "",
    confirmPass: "",
    avatarUrl: ""
});

const registerFormRef = ref();


function onBtnSave() {
    registerFormRef?.value.validate((valid: never) => {
    // 先校验pinia仓库有没有这个用户名
        if (!hasUserName(form.value.name)) ElMessage.warning(`用户名已存在,请重新输入！【可以试试${form.value.name}@@**】`);
        const { name, passWord, avatarUrl } = form.value;
        user.addUser(name, passWord, avatarUrl);
        console.log(user.userInfo);
        ElMessage.success("注册成功，4s后自动跳转到登陆页面！");
        setTimeout(() => {
            router.push("/login");
        }, 4000);
    });
}


function onBtnReset() {
    registerFormRef.value && registerFormRef.value?.resetFields();
}

</script>

<template>
  <div class="register_container">
    <el-card class="card" shadow="hover">
      <div class="image_container">
        <img alt="" src="@/assets/register_6.png" style="object-fit: cover;width: 100%;height: 100%;">
      </div>
      <div style="width:100%;height: 100%;display: flex;justify-content: center;align-items: center">
        <el-form ref="registerFormRef" :model="form" style="width: 300px">
          <el-form-item>
            <el-input v-model="form.name" placeholder="请输入您的用户名" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.passWord" placeholder="请输入您的密码" type="password" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.confirmPass" placeholder="请确认您的密码" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onBtnSave">保存</el-button>
            <el-button @click="onBtnReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.register_container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //background: linear-gradient(#0753E0FF, #845EE8FF);
  background-image: url("@/assets/register_5.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  //opacity: 0.8;

}

.card {
  position: relative;
  width: 450px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  //opacity: 0.7;
  //margin-left: 200px;
}

.image_container {
  width: 180px;
  height: 180px;
  position: absolute;
  top: -50px;
  left: -50px;
  opacity: 0.6;
  background: #535bf2;
  border-radius: 50%;
  overflow: hidden;
}
</style>

