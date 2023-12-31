<template>
  <div class="container">
    <div v-if="props.showLeft" style="width: 200px;height: 200px;">
      <img :src="url">
    </div>
    <div class="content">
      <span style="display: block;font-size: 20px;font-weight: bolder">{{ title }}</span>
      <span style="font-size: 18px;color: #63a35c">{{ content }}</span>
    </div>
    <div v-if="!props.showLeft" style="width: 200px;height: 200px;">
      <img :src="url">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const props = defineProps({
    info: {
        type: Object,
        required: true
    },
    showLeft: {
        type: Boolean,
        default: true
    }
});
let title = ref<string>("");
let content = ref<string>("");
let url = ref<string>("");
onMounted(() => {
    content.value = props.info?.content;
    url.value = props.info?.img;
    title.value = props.info?.title;
});


</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 1;
  //background: linear-gradient(180deg, #4A7EEDFF 0%, #234981FF 100%);
  .content {
    height: 200px;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
  }
}

img {
  width: 100%;
  height: 100%;

}
</style>

