<template>
  <div class="friends-container">
    <Hero type="friends" />
  </div>
</template>

<script setup>
import Hero from '@/components/Hero.vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

if (!userStore.uid) {
  router.push({ name: 'signin' })
}
</script>

<style lang="scss" scoped></style>
