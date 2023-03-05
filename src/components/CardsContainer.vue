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
  background: $color-main;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 1fr;
  justify-items: center;
  gap: 50px 20px;
  max-width: 100vw;
}
@include media-sm {
  .cards-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@include media-md {
  .cards-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@include media-xl {
  .cards-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
