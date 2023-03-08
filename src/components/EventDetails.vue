<template>
  <div class="event-details">
    <div class="section">
      <div class="banner">
        <div class="name">
          {{ name }}
        </div>
        <Button filled>Join</Button>
      </div>
    </div>
    <div class="section">
      <div class="banner">
        <div class="date">{{ toDateTime(date) }}</div>
        <div class="date">{{ toDateTime(date, true) }}</div>
      </div>
    </div>
    <div class="img">
      <img :src="getImageUrl(imageUrl)" alt="image" />
    </div>
    <div class="section">
      <div class="description">
        {{ description }}
      </div>
      <div class="author">By: {{ author }}</div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
import getImageUrl from '@/utils/getImageUrl'
import toDateTime from '@/utils/toDateTime'

const props = defineProps({
  description: String,
  name: String,
  author: String,
  date: Number,
  imageUrl: {
    type: String,
    default: '../assets/find-background-sm.jpg'
  }
})
</script>

<style lang="scss" scoped>
.event-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  color: $color-contrast;
  .section {
    padding: 10px;
    background-color: $color-secondary;
    border-radius: 7px;
    .banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .name {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 400;
    }
    .author {
      margin-top: 20px;
      text-align: end;
      font-size: 8px;
    }
    .description {
      font-weight: 300;
      text-align: justify;
    }
  }
  img {
    border-radius: 7px;
    width: 100%;
  }
}
</style>
