<template>
  <div class="project-card" @click="goTo">
    <img class="img" :src="imageUrl" alt="event-photo" />
    <div class="info">
      <div class="author"><Icon clickable width="16px" img="../assets/user.png" />{{ author }}</div>
      <div class="participants">{{ nFormatter(participantsNumber) }}</div>
    </div>
  </div>
</template>

<script setup>
import Icon from './Icon.vue'
import { useRouter } from 'vue-router'
import nFormatter from '@/utils/nFormatter'

const props = defineProps({
  id: Number,
  author: String,
  imageUrl: String,
  participantsNumber: Number
})

const router = useRouter()
const url = props.imageUrl ? props.imageUrl : '../assets/find-background-sm.jpg'
const imageUrl = new URL(url, import.meta.url).href

function goTo() {
  router.push({ name: 'event', query: { id: props.id } })
}
</script>

<style lang="scss" scoped>
.project-card {
  position: relative;
  cursor: pointer;
  .img {
    border-radius: 5px;
    width: 100%;
    object-fit: cover;
    aspect-ratio: 4 / 3;
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-weight: 300;
    font-size: 14px;
    color: $color-contrast;
    .author {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>
