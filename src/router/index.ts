import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Test from '@/views/test/index.vue'

console.log('import.meta.env.BASE_URL: ', import.meta.env.BASE_URL)
// 创建路由实例，vue2是通过new router创建路由实例的,现在vue3通过createRouter创建实例
const router = createRouter({
  /* 
    vue2：通过mode属性指定路由模式：
      1、history
      2、hash
    vue3：通过history：createWebHistory | createWebHashHistory 函数指定路由模式.
    hash有#号, history没有#号.
    hash兼容性比history更好，history是H5标准提出的.

 */
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  // 路由配置数组
  routes: [
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

// 导出路由实例
export default router
