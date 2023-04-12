<template>
  <div class="test-container">
    <van-button type="primary" @click="getUserInfo">获取个人信息</van-button>
    <van-button type="primary" @click="login" style="margin-left: 20px">登录</van-button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import type { User } from '@/types/user'
import { request } from '@/utils/request'

/* 
  测试请求拦截器是否携带token，响应拦截器401拦截到登录地址
*/
const getUserInfo = async () => {
  const res = await request('/patient/myUser')
  console.log('>>>>>>>>>>> resposne: ', res)
}

/* 测试响应拦截器，出现非10000的情况和返回剥离后的数据 */
const login = async () => {
  const res = await request<User>('/login/password', 'POST', {
    mobile: '13211112222',
    // 密码: abc123456，用来测试出现非10000的情况
    password: 'abc12345'
  })
  store.setUser(res.data)
}

const store = useUserStore()
/* const changeState = () => {
  store.setUser({
    token: 'abcdef',
    account: 'summer',
    mobile: '1380000000',
    avatar: 'https://youkewang.top/',
    id: '000001'
  })
} */
</script>

<style scoped lang="scss"></style>
