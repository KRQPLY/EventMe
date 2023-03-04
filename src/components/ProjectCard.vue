<template>
  <div class="project-card">
    <img class="img" :src="imageUrl" alt="event-photo" />
    <div class="info">
      <div class="author"><Icon clickable width="16px" img="../assets/user.png" />Ivan Grey</div>
      <div class="participants">1.5k</div>
    </div>
  </div>
</template>

<script setup>
import Icon from './Icon.vue'

const imageUrl = new URL(`../assets/find-background-sm.jpg`, import.meta.url).href
</script>

<style lang="scss" scoped>
.project-card {
  position: relative;
  cursor: pointer;
  .img {
    border-radius: 5px;
    width: 100%;
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
