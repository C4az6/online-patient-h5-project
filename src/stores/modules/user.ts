/* 
  用户相关全局数据
*/

import { defineStore } from 'pinia'
import { ref } from 'vue'
// 如果导入的是TS类型，需要加上type关键字
import type { User } from '@/types/user'
/* 
  注意：使用use作为变量的开头
*/
export const useUserStore = defineStore(
  'user',
  () => {
    /* 
    用户登录数据全局变量

    这里为什么要加as断言呢？
    因为user的数据是异步获取的，在定义变量的时候我们传入的是一个空对象，但定义的类型是User，此时会
    报错，因此需要使用as断言告诉TS未来具体的类型。

    空对象/空数组就不要通过泛型变量来指定类型了，直接通过断言指定类型即可。
  */
    const user = ref({} as User)
    const testData = ref<number[]>([1, 2, 3, 4, 5])

    /* 
    用户相关方法：
  */
    // 1、存储用户信息  登录成功使用
    const setUser = (data: User) => {
      user.value = data
    }

    // 2、删除用户信息  退出登录使用
    const delUser = () => {
      // 清空复杂类型数据的时候也需要增加as断言，否则TS编译器会报错
      user.value = {} as User
    }

    // 返回定义的全局变量和方法
    return {
      user,
      testData,
      setUser,
      delUser
    }
  },
  /* {
    // 开启当前模块的持久化,默认存储全部数据到 localStorage中，以store id 作为存储的key
    persist: true
  } */
  {
    // 自定义持久化
    persist: {
      key: 'youkewang.top',
      // 指定要存储的数据
      paths: ['testData']
    }
  }
)
