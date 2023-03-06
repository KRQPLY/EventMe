<template>
  <div class="event-details">
    <div class="name">
      {{ name }}
    </div>
    <div class="img">
      <img :src="getImageUrl(imageUrl)" alt="image" />
    </div>
    <div class="description">
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import getImageUrl from '@/utils/getImageUrl'

const props = defineProps({
  description: String,
  name: String,
  imageUrl: {
    type: String,
    default: '../assets/find-background-sm.jpg'
  }
})
</script>

<style lang="scss" scoped>
.event-details {
  padding: 10px;
  background-color: $color-secondary;
  border-radius: 7px;
  color: $color-contrast;
  .name {
    font-size: 30px;
    font-weight: 400;
  }
  img {
    width: 100%;
  }
  .description {
    font-weight: 300;
    text-align: justify;
  }
}
</style>
