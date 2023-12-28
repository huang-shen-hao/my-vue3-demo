<script lang="ts" setup>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const locale = zhCn;
</script>

<template>
  <el-config-provider :locale="locale">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </el-config-provider>
</template>

<style scoped>

</style>
