<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user.ts";
import info_image_1 from "@/assets/3.webp";
import info_image_2 from "@/assets/4.webp";
import info_image_3 from "@/assets/5.webp";
import scrollInfo from "@/components/scrollInfo.vue";

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


type Info = {
  img: string,
  content: string,
  title: string,
}
const infoArr: Info[] = [
    {
        img: info_image_1,
        content: "当燕双双归去，翠辇娥冠，一片春愁待水长。韶华不为少年留，恨悠悠。千载空悲切，青楼欲断魂。",
        title: "《渔家傲·秋思》（辛弃疾）"
    },
    {
        img: info_image_2,
        content: "野旷天低树，江清月近人。飞鸟相与还，怨杨不言频。 ",
        title: "《秋夕》（韦应物）"
    }, {
        img: info_image_3,
        content: "河山下舞夜,风月上龙城。五更到天明,不见月明星。",
        title: "《临江仙·夜泊牛渚怀古》（杨万里）"
    }
];

</script>

<template>
  <div class="container">
    <!--头部标题信息-->
    <div class="head_content">
      <div class="head_content_first">
        <div style="line-height: 66px;font-weight: bold;font-size: 20px">
          <span>GLASS</span>
        </div>
        <div class="head_content_item">
          <span>琉璃管理系统</span>
          <span style="font-size: 13px">Liuli Management System</span>
        </div>
      </div>

      <div class="head_content_last">
        <span>188-5197-7115</span>
      </div>
    </div>
    <!--登陆部分-->
    <div class="login_main">
      <div class="login_main_center">
        <!--左侧图片-->
        <div class="image_container"></div>

        <!--表单-->
        <div class="form_container">
          <el-form ref="formRef" :model="form" :rules="rules" style="width: 80%">
            <el-form-item prop="name">
              <el-input v-model="form.name" :disabled="canInput" clearable placeholder="请输入用户名">
              </el-input>
            </el-form-item>
            <el-form-item prop="passWord">
              <el-input v-model="form.passWord" :disabled="canInput" placeholder="请输入密码" show-password
                        type="password">
              </el-input>
            </el-form-item>
            <el-form-item>
              <div style="width:100%">
                <el-button :disabled="canInput" style="width: 100%;" type="primary" @click="onSubmit">
                  登陆
                </el-button>
                <!--                <el-button style="width: 100%" type="success" @click="router.push('/register')">注册</el-button>-->
              </div>
            </el-form-item>
          </el-form>
          <!--二维码区域-->
          <div class="qr">
            <div class="qr_item"></div>
          </div>
          <!--遮挡区域-->
          <div class="triangle"></div>
          <div
            style="display: flex;align-items: center;justify-content: start;flex-direction: column;position: absolute;top: 10%;left: 5%">
            <div style="color: #040523FF;font-weight: bolder">账号登陆</div>
            <div style="height: 0;width: 66px;border: #646cff solid 1px"></div>
          </div>
          <div class="jump_login" @click="router.push('/register')">没有账号？试试这里(=^･ω･^=)</div>
          <div class="footer">
            <a href="https://www.bilibili.com/video/BV1qz4y1G7AS/?vd_source=7a01fbcfe862c4eceb4b025290efb281">人有相似寄明月，月有倦时落栖枝。</a>
          </div>
        </div>
      </div>
    </div>

    <!--滚动区域-->
    <div v-for="(item,index) in infoArr" :key=index style="width: 100%;">
      <!--奇数在右边，偶数在左边-->
      <scrollInfo :info="item" :show-left="index%2===0?false:true" />
    </div>

    <div class="container_footer">
      <span>技术支持：xxx有限公司 | 客服热线：188-5197-7115 | 客服QQ：146-7788-588 |
        客服邮箱：1467788588@qq.com</span>
      <span><a href="https://juejin.cn/" target="_blank">前端自我学习</a>
        | <a href="https://www.baidu.com" target="_blank">如果有侵权图片资源，联系18851977115，立删。</a> |
        联系邮箱：1467788588@qq.com</span>
    </div>
  </div>


</template>

<style scoped>
.head_content {
  width: 100%;
  height: 66px;
  background-color: white;
  display: flex;
  flex-shrink: 1;
  justify-content: space-around;
  align-content: center;

  .head_content_first {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .head_content_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-left: 20px;
    font-size: 30px;
    font-weight: bolder;
  }

  .head_content_last {
    line-height: 66px;
    font-size: 18px;
    font-weight: bolder;
  }

}

.login_main {
  width: 100%;
  height: 800px;
  background: linear-gradient(180deg, #4A77ED 0%, #588FE5 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .login_main_center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1000px;
    height: 100%;
  }

  .image_container {
    width: 500px;
    height: 380px;
    background-color: #5761E0FF;
    background-image: url("@/assets/2.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
  }

  .form_container {
    width: 360px;
    height: 380px;
    margin-left: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .qr {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #DAE7ECFF;
    }

    .qr_item {
      background-size: cover;
      width: 50px;
      height: 50px;
      background-image: url("@/assets/qr.png");
      background-repeat: no-repeat;
    }

    .triangle {
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-bottom: 50px solid white; /* 底边为红色 */
      border-right: 50px solid transparent; /* 左边透明 */
    }

    .footer {
      position: absolute;
      bottom: 10%;
      left: 25%;
      font-size: 10px;
    }

    .jump_login {
      position: absolute;
      bottom: 25%;
      font-size: 10px;
      right: 5%;
    }

  }
}

.container_footer {
  width: 100%;
  height: 100px;
  background-color: #EEE7E7FF;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>

