<template>
  <div>
    Login Page

    <p>
      <video :controls="true" @click="handleVideoClick"
        src="https://txmov2.a.yximgs.com/upic/2021/02/24/04/BMjAyMTAyMjQwNDIxMjJfMTQ3NTc4ODIwMV80NDkxNjA1MzE2NF8xXzM=_b_B06fcbbbb4d4a688aefd082def5176d6b.mp4"></video>
    </p>
  </div>
</template>

<script setup lang="ts">
const handleVideoClick = () => {
  console.log('666')
}
</script>

<style scoped>
video {
  width: 300px;
  height: 300px;
}
</style>
