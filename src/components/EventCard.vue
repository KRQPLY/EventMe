<template>
  <div class="project-card" @click="router.push({ name: 'event', query: { id: props.id } })">
    <img class="img" :src="getImageUrl(imageUrl)" alt="event-photo" />
    <div class="info">
      <div class="author"><IconUser />{{ author }}</div>
      <div class="participants">{{ nFormatter(participantsNumber) }}</div>
    </div>
  </div>
</template>

<script setup>
import IconUser from './IconUser.vue'
import nFormatter from '@/helpers/nFormatter'
import getImageUrl from '@/helpers/getImageUrl'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: Number,
  author: String,
  participantsNumber: Number,
  imageUrl: {
    type: String,
    default: '../assets/find-background-sm.jpg'
  }
})

const router = useRouter()
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
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>
