<template>
  <cp-nav-bar middle="登录/注册" right="注册" @clickRight="handleClickRight"></cp-nav-bar>
  <!-- <div>LOGIN PAGE</div> -->
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClickRight = () => {
  if (history.state?.back) {
    // 存在回调地址就返回
    console.log(history)
  } else {
    // 否则返回首页
    router.push('/')
  }
}
</script>

<style scoped>
video {
  width: 300px;
  height: 300px;
}
</style>
