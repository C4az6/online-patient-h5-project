/* 
  创建pinia实例
*/

import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 1 创建pinia实例
const pinia = createPinia()
// 注册pinia持久化插件
pinia.use(persist)
// 2 导出pinia实例
export default pinia

/* 在index.ts对modules中store仓库做统一导出 */
export * from './modules/user'
