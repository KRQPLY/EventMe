<template>
  <div class="menu" v-if="userStore.uid">
    <div
      class="option"
      :class="{ active: currentRouteName === 'findEvents' }"
      @click="router.push({ name: 'findEvents' })"
    >
      Find events
    </div>
    <div
      class="option"
      :class="{ active: currentRouteName === 'myEvents' }"
      @click="router.push({ name: 'myEvents' })"
    >
      My events
    </div>
    <div
      class="option"
      :class="{ active: currentRouteName === 'friends' }"
      @click="router.push({ name: 'friends' })"
    >
      Friends
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const currentRouteName = computed(() => {
  return router.currentRoute.value.name
})
</script>

<style lang="scss" scoped>
.menu {
  color: $color-contrast;
  .option {
    cursor: pointer;
    &.active {
      color: $color-accent;
    }
  }
}

@include media-xs {
  .menu {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-left: 30px;
  }
}
</style>
