<template>
  <svg aria-hidden="true" class="cp-icon">
    <!-- #icon-文件夹名称-图片名称 -->
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<style lang="scss" scoped>
.cp-icon {
  // 通过设置em单位让svg图标和父元素的字体一样大
  width: 1em;
  height: 1em;
}
</style>
