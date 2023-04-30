<template>
  <!-- 对vant的导航栏组件做二次封装 -->
  <van-nav-bar
    left-arrow
    @click-left="onClickLeft"
    fixed
    :title="middle"
    :right-text="right"
    @click-right="emit('click-right')"
  >
  </van-nav-bar>
</template>

<script setup lang="ts">
/* 
  接收父传子变量
*/
defineProps<{
  middle: string
  right: string
}>()
const onClickLeft = () => {
  console.log('left click')
}
// 子传父
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
</script>

<style scoped lang="scss"></style>
