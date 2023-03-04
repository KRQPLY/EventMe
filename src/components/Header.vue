<template>
  <div class="header">
    <div class="left">
      <div class="title" @click="goTo('findEvents')">EventMe</div>
      <Menu class="desktop" />
    </div>
    <div class="right">
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
      <Button @click="goTo('signin')" desktop v-if="!userStore.uid">Sign in</Button>
      <Button @click="goTo('signup')" filled desktop v-if="!userStore.uid">Sign up</Button>
      <Button @click="userStore.signout()" desktop v-else>Sign out</Button>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
import Menu from './Menu.vue'
import Button from './Button.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
// import { ref } from 'vue'

// const isThemeDark = ref(true)

// function changeTheme() {
//   isThemeDark.value
//     ? document.documentElement.setAttribute('data-theme', 'light')
//     : document.documentElement.setAttribute('data-theme', 'dark')
//   isThemeDark.value = !isThemeDark.value
// }
function goTo(name) {
  router.push({ name: name })
}
</script>

<style lang="scss" scoped>
.header {
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
  .title {
    cursor: pointer;
    color: $color-contrast;
    font-size: 30px;
    font-weight: 200;
  }
}
</style>
