<template>
  <div class="event-container"></div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'

const props = defineProps({
  id: String
})

const userStore = useUserStore()
const router = useRouter()

onBeforeMount(() => {
  if (!userStore.uid) {
    router.push({ name: 'signin' })
  }
})
</script>

<style lang="scss" scoped></style>
