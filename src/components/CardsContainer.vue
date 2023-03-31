<template>
  <div class="cards-container">
    <slot>
      <div class="no-results">No results</div>
    </slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.cards-container {
  position: relative;
  z-index: 99;
  padding: 40px 20px;
  background: $color-main;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 1fr;
  justify-items: center;
  gap: 50px 20px;
  max-width: 100vw;
  .no-results {
    grid-column-start: 1;
    grid-column-end: -1;
    color: $color-accent;
  }
}
@include media-xs {
  .cards-container {
    padding: 40px 40px;
  }
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
