/* 
  为项目全局组件声明TS类型，目的是为了让组件受类型约束，有代码提示
*/

import CpNavBar from '@/components/cp-nav-bar.vue'
import CpIcon from '@/components/cp-icon.vue'
declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
  }
}
