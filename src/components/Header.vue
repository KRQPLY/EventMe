<template>
  <div class="header-container sticky">
    <div class="left">
      <div class="title" @click="router.push({ name: 'findEvents' })">​el evento</div>
    </div>
    <div class="right">
      <MoonIcon class="theme-switch" />
    </div>
  </div>
  <div class="header-box"></div>
</template>

<script setup>
import MoonIcon from './MoonIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped>
.header-container {
  box-sizing: border-box;
  height: $height-header;
  position: relative;
  z-index: 1100;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $color-main;
  .right,
  .left {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .theme-switch {
    margin-right: 25px;
  }
  .title {
    font-family: 'Vibur', sans-serif;
    cursor: pointer;
    color: $color-contrast;
    font-size: 30px;
    font-weight: 200;
  }
  &.sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }
}
.header-box {
  height: $height-header;
}
</style>
