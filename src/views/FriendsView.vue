<template>
  <div class="friends-container">
    <Hero type="friends" />
  </div>
</template>

<script setup>
import Hero from '@/components/Hero.vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

if (!userStore.uid) {
  userStore.redirect('signin', { redirect: 'friends' })
}
</script>

<style lang="scss" scoped></style>
