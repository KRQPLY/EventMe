<template>
  <div class="header-container sticky">
    <div class="left">
      <div class="title" @click="router.push({ name: 'findEvents' })">evento</div>
      <Menu class="desktop" />
    </div>
    <div class="right">
      <MoonIcon class="theme-switch desktop" />
      <Button @click="$emit('toggleDrawer')" mobile>
        <IconBurger />
      </Button>
      <Button @click="router.push({ name: 'signin' })" desktop v-if="!userStore.token"
        >Sign in</Button
      >
      <Button @click="router.push({ name: 'signup' })" filled desktop v-if="!userStore.token"
        >Sign up</Button
      >
      <Button @click="handleSignout" desktop v-else>Sign out</Button>
    </div>
  </div>
  <div class="header-box"></div>
</template>

<script setup>
import IconBurger from './IconBurger.vue'
import Menu from './Menu.vue'
import Button from './Button.vue'
import MoonIcon from './MoonIcon.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

defineEmits(['toggleDrawer'])

const userStore = useUserStore()
const router = useRouter()

async function handleSignout() {
  userStore.signout()
  router.push({ name: 'signin' })
}
</script>

<style lang="scss" scoped>
.header-container {
  box-sizing: border-box;
  height: $height-header;
  position: relative;
  z-index: 1001;
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
