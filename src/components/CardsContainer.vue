<template>
  <div class="cards-container">
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.cards-container {
  position: relative;
  z-index: 99;
  padding: 40px 40px;
  background: $color-secondary;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  gap: 30px;
}
@include media-sm {
  .cards-container {
    // padding: 80px 80px;
    grid-template-columns: repeat(2, 1fr);
  }
}
@include media-md {
  .cards-container {
    // padding: 120px 80px;
    grid-template-columns: repeat(3, 1fr);
  }
}
@include media-xl {
  .cards-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
