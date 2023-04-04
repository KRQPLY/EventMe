<template>
  <div class="moon-container" @click="toggleDark()">
    <div class="circle"></div>
    <div class="moon-background"><div class="moon"></div></div>
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

defineProps({
  secondary: { type: Boolean, default: false }
})

const isDark = useDark({
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light'
})
const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped>
.moon-container {
  cursor: pointer;
  position: relative;
  .circle {
    position: absolute;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    transform: translate(-50%, -50%);
  }
  .moon-background {
    position: absolute;
    transform: translate(-75%, -75%);
    .moon {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      box-shadow: 3.5px 3px 0 0 $color-contrast;
      transition: box-shadow 0.4s ease;
    }
  }
}
</style>
