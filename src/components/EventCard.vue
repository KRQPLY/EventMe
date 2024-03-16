<template>
  <div class="project-card" @click="router.push({ name: 'event', query: { id: props.id } })">
    <div class="info"></div>
    <img class="img" :src="getImageUrl(imageUrl)" alt="event-photo" />
    <div class="info" :class="{ 'info--sponsored': isSponsored }">
      <div class="name">{{ name }}</div>
      <div class="participants" v-if="!isSponsored">
        <IconUser />{{ nFormatter(participantsNumber) }}
      </div>
      <div class="participants" v-else>Sponsored</div>
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
  name: String,
  participantsNumber: Number,
  imageUrl: {
    type: String,
    default:
      'https://res.cloudinary.com/dqipqpwdf/image/upload/v1680613127/evento/default_g7tz6t.png'
  },
  isSponsored: {
    type: Boolean,
    default: false
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

    &.info--sponsored {
      color: $color-accent;
    }

    .name,
    .participants {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>
