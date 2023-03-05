<template>
  <div class="moon-container" @click="changeTheme">
    <div class="circle"></div>
    <div class="moon-background"><div class="moon"></div></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isThemeDark = ref(true)

function changeTheme() {
  isThemeDark.value
    ? document.documentElement.setAttribute('data-theme', 'light')
    : document.documentElement.setAttribute('data-theme', 'dark')
  isThemeDark.value = !isThemeDark.value
}
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
    // transition: unset;
  }
  .moon-background {
    position: absolute;
    transform: translate(-75%, -75%);
    .moon {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      box-shadow: 3.5px 3px 0 0 $color-contrast;
      transition: box-shadow 0.5s ease;
    }
  }
  &:hover {
    .circle {
      background-color: $color-secondary;
    }
  }
}
</style>
