<template>
  <div class="menu">
    <div class="option active">Find Events</div>
    <div class="option"></div>
    <div class="option">Your Events</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.menu {
  color: $color-white;
}
.option {
  cursor: pointer;
  &.active {
    color: $color-java;
  }
}
@include media-xs {
  .menu {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
</style>
