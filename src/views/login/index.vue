<template>
  <cp-nav-bar middle="登录" right="注册" @clickRight="handleClickRight"></cp-nav-bar>

  <div class="login">
    <div class="login-header">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
  </div>

  <van-form autocomplete="off" @submit="login">
    <van-field
      name="mobile"
      :rules="mobileRules"
      v-model="mobile"
      placeholder="请输入手机号"
      type="tel"
    ></van-field>
    <van-field
      v-if="isPass"
      :rules="passwordRules"
      v-model="password"
      placeholder="请输入密码"
      :type="showPassword ? 'text' : 'password'"
    >
      <template #button>
        <cp-icon
          @click="showPassword = !showPassword"
          :name="`login-eye-${showPassword ? 'on' : 'off'}`"
        ></cp-icon>
      </template>
    </van-field>

    <van-field v-else v-model="code" placeholder="短信验证码" :rules="codeRules">
      <template #button>
        <span class="btn-send" @click="send" :class="{ active: time > 0 }">
          {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
        </span>
      </template>
    </van-field>
    <div class="cp-cell">
      <van-checkbox v-model="agree">
        <span>我已同意</span>
        <a href="javascript:;">用户协议</a>
        <span>及</span>
        <a href="javascript:;">隐私条款</a>
      </van-checkbox>
    </div>
    <div class="cp-cell">
      <van-button block round type="primary" native-type="submit">登 录</van-button>
    </div>
    <div class="cp-cell">
      <a href="javascript:;">忘记密码</a>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, onUnmounted } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showToast, showSuccessToast, type FormInstance } from 'vant'
import { loginByPassword, sendMobileCode, loginByMobile } from '@/api/user'
import { useUserStore } from '@/stores'

let timeId: number
const router = useRouter()
const route = useRoute()
const store = useUserStore()

const mobile = ref('13230000100')
const password = ref('abc12345')
const showPassword = ref(false)
const agree = ref(false)
const isPass = ref(true)
const time = ref(0)
const form = ref<FormInstance>()
const code = ref('')

// 发送验证码函数
const send = async () => {
  // 已经倒计时time的值大于0，此时不能发送验证码
  if (time.value > 0) return
  // 验证如果不通过则报错，阻止程序继续运行
  await form.value?.validate('mobile')
  await sendMobileCode(mobile.value, 'login')
  showToast('发送成功')
  time.value = 60
  // 倒计时
  clearInterval(timeId)
  timeId = window.setInterval(() => {
    time.value--
    if (time.value <= 0) window.clearInterval(timeId)
  }, 1000)
}

// 表单提交然后根据业务做二次校验
const login = async () => {
  console.log(agree.value)
  if (!agree.value) return showToast('请勾选用户协议')

  const response = isPass.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByMobile(mobile.value, code.value)

  // 验证完毕后进行登录操作
  store.setUser(response.data)
  // 如果有回调地址就进行回跳，没有就跳转到个人中心
  router.push((route.query.returnUrl as string) || '/user')
  showSuccessToast('登录成功')
}

const handleClickRight = () => {
  if (history.state?.back) {
    // 存在回调地址就返回
    console.log(history)
  } else {
    // 否则返回首页
    router.push('/')
  }
}

onUnmounted(() => {
  window.clearInterval(timeId)
})
</script>

<style lang="scss" scoped>
.login {
  padding-top: 46px;
  &-header {
    /* 相当于.login-header选择器 */
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
      color: #000;
    }
  }
}

.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
