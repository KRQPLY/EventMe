<template>
  <button class="create-event-button" @click="router.push({ name: 'createEvent' })">
    event
    <IconAdd />
  </button>
</template>

<script setup>
import IconAdd from './IconAdd.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped>
.create-event-button {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  box-sizing: content-box;
  width: 80px;
  background: $color-accent;
  border: none;
  border-radius: 20%/50%;
  color: #fff;
  font-weight: 300;
  font-size: 16px;
}

@include media-xs {
  .create-event-button {
    border-radius: 10%/50%;
    width: 170px;
  }
}
</style>
