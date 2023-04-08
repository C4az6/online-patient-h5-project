<template>
  <div>
    <h2>Test Page</h2>
    <p>用户数据: {{ store.user }}</p>

    <p>
      <button @click="changeState">登录</button>
    </p>

    <p>
      <button @click="store.delUser()">退出登录</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
const store = useUserStore()
const changeState = () => {
  store.setUser({
    token: 'abcdef',
    account: 'summer',
    mobile: '1380000000',
    avatar: 'https://youkewang.top/',
    id: '000001'
  })
}
</script>

<style scoped></style>
