<template>
  <div class="header-container sticky">
    <div class="left">
      <div class="title" @click="userStore.redirect('findEvents')">evento</div>
      <Menu class="desktop" />
    </div>
    <div class="right">
      <MoonIcon class="theme-switch desktop" />
      <Icon
        width="32px"
        img="../assets/burger-white.svg"
        @click="$emit('toggleDrawer')"
        clickable
        class="mobile dark"
      />
      <Icon
        width="32px"
        img="../assets/burger-black.svg"
        @click="$emit('toggleDrawer')"
        clickable
        class="mobile light"
      />
      <Button @click="userStore.redirect('signin')" desktop v-if="!userStore.uid">Sign in</Button>
      <Button @click="userStore.redirect('signup')" filled desktop v-if="!userStore.uid"
        >Sign up</Button
      >
      <Button @click="handleSignout" desktop v-else>Sign out</Button>
    </div>
  </div>
  <div class="header-box"></div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
import Menu from './Menu.vue'
import Button from './Button.vue'
import MoonIcon from './MoonIcon.vue'
import { useUserStore } from '@/stores/user'

defineEmits(['toggleDrawer'])

const userStore = useUserStore()

function handleSignout() {
  userStore.signout()
  userStore.redirect('signin')
}
</script>

<style lang="scss" scoped>
.header-container {
  box-sizing: border-box;
  height: $height-header;
  position: relative;
  z-index: 1000;
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
