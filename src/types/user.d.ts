/* 
  用户相关接口类型
*/

// 1. 登录接口返回数据类型
export type User = {
  token: string
  account: string
  mobile: string
  avatar: string
  id: string
}

// 验证码登录接口返回数据类型
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'
